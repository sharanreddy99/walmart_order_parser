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
        
        i = 1
        while i < len(rows) and 'subtotal' not in rows[i].text.lower():
            obj.ordersArr.append(WalmartItem(rows[i].text))
            i += 1

        while i < len(rows) and 'total' != rows[i].text.rstrip(' ').lower():
            i += 1
        
        i += 3


        total = 0
        idx = 0
        while i < len(rows) and 'qty' in rows[i].text.lower():
            status, _, qty = rows[i].text.rstrip(" ").split(" ")
            obj.ordersArr[idx].status = status
            obj.ordersArr[idx].quantity = int(qty)
            obj.ordersArr[idx].price = float(rows[i+1].text.strip(' $'))

            i += 2
            idx += 1

        obj.subTotal = float(rows[i+1].text.strip('$ '))
        obj.deliveryFee = float(rows[i+2].text.rstrip(' ').split(" ")[-1].strip('$'))
        obj.tax = float(rows[i+3].text.strip('$'))
        obj.tip = float(rows[i+4].text.strip('$'))
        obj.total = float(rows[i+5].text.strip('$ '))

        i += 6
        
        return obj.toJSON()