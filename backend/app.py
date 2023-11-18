from flask import Flask, request
from WalmartItem import WalmartItem
from WalmartOrder import WalmartOrder
import bs4 as bs
from flask_cors import CORS, cross_origin
import re
from PyPDF2 import PdfReader
import sys

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/", methods=["GET","POST"])
@cross_origin(supports_credentials=True)
def healthcheck():
    return 'The server is alive'

@app.route("/upload_order", methods=["POST"])
@cross_origin(supports_credentials=True)
def upload_folder():
    if 'order' not in request.files:
        return 'Didnt receive order document'

    # save uploaded file
    file = request.files['order']
    file.save('./order.pdf')


    # creating a pdf reader object
    reader = PdfReader('./order.pdf')

    # printing number of pages in pdf file
    for page in reader.pages:
        # extracting text from page
        text = page.extract_text().split("\n")
        objectArr = []
        object = {}

        for input_string in text:
            result = re.search(r"^(.*?)[ ]*(unavailable|shopped|weight-adjusted|substitutions|)[ ]*Qty[ ]*([0-9]+)[ ]*\$([0-9\.]+)", input_string, re.IGNORECASE)
            if result != None:
                resultGroup = result.groups()
                obj = WalmartItem(resultGroup[0])
                obj.status = resultGroup[1]
                obj.quantity = float(resultGroup[2])
                obj.price = float(resultGroup[3])
                obj.perItemCost = obj.price/obj.quantity
                objectArr.append(obj)
                
            result = re.search(r"order# ([\d-]+)", input_string, re.IGNORECASE)
            if result != None:
                object['orderName'] = result.groups()[0]

            
            result = re.search(r"subtotal[ ]*\$([\d\.]+)", input_string, re.IGNORECASE)
            if result != None:
                object['subTotal'] = result.groups()[0]
            
            result = re.search(r"savings[ ]*[-]*\$([\d\.]+)", input_string, re.IGNORECASE)
            if result != None:
                object['savings'] = result.groups()[0]

            
            result = re.search(r"tax[ ]*[-]*\$([\d\.]+)", input_string, re.IGNORECASE)
            if result != None:
                object['tax'] = result.groups()[0]
            
            result = re.search(r"total[ ]*[-]*\$([\d\.]+)", input_string, re.IGNORECASE)
            if result != None:
                object['total'] = result.groups()[0]

            result = re.search(r"driver tip[ ]*[-]*\$([\d\.]+)", input_string, re.IGNORECASE)
            if result != None:
                object['driverTip'] = result.groups()[0]
            
            result = re.search('free delivery.*?(\$[0-9\.]+)(\$[0-9\.]+)', input_string, re.IGNORECASE)
            if result is not None:
                val1 = result.groups()[0]
                val2 = result.groups()[1]

                if val2 != '':
                    object['deliveryFee'] = val2.lstrip('$')
                else:
                    object['deliveryFee'] = val1.lstrip('$')
    
        obj = WalmartOrder(object['orderName'])
        obj.subTotal = object['subTotal']
        obj.savings = object.get('savings', 0)
        obj.deliveryFee = object.get('deliveryFee', 0)
        obj.tax = object.get('tax', 0)
        obj.total = object.get('total', 0)
        obj.tip = object.get('driverTip', 0)
        obj.ordersArr = objectArr
        
    return obj.toJSON()