from flask import Flask, request
from WalmartItem import WalmartItem
from WalmartOrder import WalmartOrder
from pdfquery import PDFQuery
import bs4 as bs
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/upload_order", methods=["POST"])
@cross_origin(supports_credentials=True)
def upload_folder():
    if 'order' not in request.files:
        return 'Didnt receive order document'

    # save uploaded file
    file = request.files['order']
    file.save('./order.pdf')

    # create xml file
    pdf = PDFQuery('order.pdf')
    pdf.load()
    pdf.tree.write('order.xml', pretty_print = True)

    with open('order.xml', 'r') as xmlFile:
        contents = xmlFile.read()
        file = bs.BeautifulSoup(contents, 'xml')
        
        root = file.find('LTPage')
        root = root.find('LTRect')
        root = root.find_all('LTRect')[1]
        rows = root.find_all('LTTextBoxHorizontal')
        
        orderName = rows[0].text
        obj = WalmartOrder(orderName)

        itemKeys = []
        itemValues = []

        idx = 0

        i = 1
        while i < len(rows):
            if '-$' in rows[i].text.lower():
                i += 1
                continue

            if 'payment method' in rows[i].text.lower() or 'ending in' in rows[i].text.lower():
                i += 1
                continue

            for key in ['Subtotal', 'Savings', 'Delivery from store', 'Tax', 'Driver tip', 'Total']:
                if key.lower() in rows[i].text.lower():
                    itemKeys.append(rows[i].text)
                    i += 1
                    break
            else:
                if 'qty' in rows[i].text.lower():
                    status, qty = 'Delivered', 0
                    if(len(rows[i].text.rstrip(" ").split(" ")) == 2):
                        _, qty = rows[i].text.rstrip(" ").split(" ")
                    else:
                        status, _, qty = rows[i].text.rstrip(" ").split(" ")

                    qty = float(qty)
                    price = float(rows[i+1].text.strip(' $'))
                    
                    itemValues.append((status, qty, price))
                    i += 2
                
                else:
                    if '$' in rows[i].text.strip(" ").split(" ")[-1].strip(" "):
                        try:
                            value = float(rows[i].text.strip(" ").split(" ")[-1][1:].strip(" "))
                            itemValues.append(value)
                        except Exception as e:
                            itemKeys.append(rows[i].text.strip(" "))
                    else:
                        itemKeys.append(rows[i].text.strip(" "))
                    i += 1
            
        idx = 0
        for i in range(len(itemValues)):
            key = itemKeys[i]
            if '-$' in key.lower():
                continue

            if 'subtotal' in key.lower():
                obj.subTotal = itemValues[idx]
            elif 'savings' in key.lower():
                obj.subTotal = itemValues[idx]
            elif 'delivery from store' in key.lower():
                obj.deliveryFee = itemValues[idx]
            elif 'tax' in key.lower():
                obj.tax = itemValues[idx]
            elif 'driver tip' in key.lower():
                obj.tip = itemValues[idx]
            elif 'total' in key.lower():
                obj.total = itemValues[idx]
            else:
                item = WalmartItem(itemKeys[idx])
                item.status = itemValues[idx][0]
                item.quantity = itemValues[idx][1]
                item.price = itemValues[idx][2]
                obj.ordersArr.append(item)
            idx += 1
        
        return obj.toJSON()