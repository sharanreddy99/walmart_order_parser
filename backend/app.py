import os
import sys
from flask import request

from backend.helpers.helpers import (
    add_or_update_users,
    add_or_update_walmart_groups,
    add_or_update_walmart_order,
    add_or_update_walmart_order_processed_items,
    add_or_update_walmart_order_raw_items,
    clear_walmart_order_processed_items,
    fetch_processed_order_details,
)
from .WalmartItem.WalmartItem import WalmartItem
from .WalmartOrder.WalmartOrder import WalmartOrder
import bs4 as bs
from flask_cors import cross_origin
import re
from PyPDF2 import PdfReader

from . import app, db


class InvalidExtractionException(Exception):
    """Base class for other custom exceptions"""

    pass


# Routes
@app.route("/", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def healthcheck():
    return "The server is alive"


@app.route("/upload_order", methods=["POST"])
@cross_origin(supports_credentials=True)
def upload_order():
    try:
        if "order" not in request.files:
            return "Didnt receive order document"

        # save uploaded file
        file = request.files["order"]
        file.save("./order.pdf")

        # creating a pdf reader object
        reader = PdfReader("./order.pdf")

        objectArr = []
        object = {}
        orderDate = None
        # printing number of pages in pdf file
        for page in reader.pages:
            # extracting text from page
            text = page.extract_text().split("\n")

            for input_string in text:
                result = re.search(
                    r"^(.+?)[ ]*(unavailable|shopped|weight-adjusted|substitutions)[ ]*(?:Qty[ ]*([0-9]+))?[ ]*\$([0-9\.]+)",
                    input_string,
                    re.IGNORECASE,
                )
                if result != None:
                    resultGroup = result.groups()

                    obj = WalmartItem(resultGroup[0])
                    obj.status = resultGroup[1]
                    if obj.status == None:
                        continue

                    obj.quantity = resultGroup[2]
                    if obj.quantity is None:
                        obj.quantity = float(1)
                    else:
                        obj.quantity = float(obj.quantity)

                    obj.price = float(resultGroup[3])
                    obj.perItemCost = obj.price / obj.quantity
                    if obj.status == "Unavailable":
                        obj.price = 0
                        obj.perItemCost = 0

                    objectArr.append(obj)

                result = re.search(r"order# ([\d-]+)", input_string, re.IGNORECASE)
                if result != None:
                    object["orderName"] = result.groups()[0]

                result = re.search(
                    r".*?((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[ ]{1}([\d]{2}), ([\d]{4})) o\s*r\s*d\s*e\s*r",
                    input_string,
                    re.IGNORECASE,
                )
                if result != None:
                    monthMap = {
                        "Jan": "01",
                        "Feb": "02",
                        "Mar": "03",
                        "Apr": "04",
                        "May": "05",
                        "Jun": "06",
                        "Jul": "07",
                        "Aug": "08",
                        "Sep": "09",
                        "Oct": "10",
                        "Nov": "11",
                        "Dec": "12",
                    }
                    month, day, year = result.groups()[1:4]
                    month = monthMap[month]
                    orderDate = "{0}-{1}-{2}".format(year, month, day)

                result = re.search(
                    r"subtotal[ ]*[-]*\$([\d\s]*\.?[\s*\d]+)",
                    input_string,
                    re.IGNORECASE,
                )
                if result != None:
                    object["subTotal"] = result.groups()[0].replace(" ", "")
                else:
                    result = re.search(
                        r"total[ ]*[-]*\$([\d\s]*\.?[\s*\d]+)",
                        input_string,
                        re.IGNORECASE,
                    )
                    if result != None:
                        object["total"] = result.groups()[0].replace(" ", "")

                result = re.search(
                    r"savings[ ]*[-]*\$([\d\.]+)", input_string, re.IGNORECASE
                )
                if result != None:
                    object["savings"] = result.groups()[0].replace(" ", "")

                result = re.search(
                    r"tax[ ]*[-]*\$([\d\s]*\.?[\s*\d]+)", input_string, re.IGNORECASE
                )
                if result != None:
                    object["tax"] = result.groups()[0].replace(" ", "")

                result = re.search(
                    r"driver tip[ ]*[-]*\$([\d\s]*\.?[\s*\d]+)",
                    input_string,
                    re.IGNORECASE,
                )
                if result != None:
                    object["driverTip"] = result.groups()[0].replace(" ", "")

                result = re.search(
                    "free delivery.*?(\$[0-9\.]+)(\$[0-9\.]+)",
                    input_string,
                    re.IGNORECASE,
                )
                if result is not None:
                    val1 = result.groups()[0]
                    val2 = result.groups()[1]

                    if val2 != "":
                        object["deliveryFee"] = val2.lstrip("$")
                    else:
                        object["deliveryFee"] = val1.lstrip("$")

        obj = WalmartOrder(object["orderName"])
        obj.date = orderDate
        obj.subTotal = object["subTotal"]
        obj.savings = object.get("savings", 0)
        obj.deliveryFee = object.get("deliveryFee", 0)
        obj.tax = object.get("tax", 0)
        obj.total = object.get("total", 0)
        obj.tip = object.get("driverTip", 0)
        obj.ordersArr = objectArr

        add_or_update_walmart_order(
            orderID=obj.orderName,
            date=orderDate,
            subTotal=obj.subTotal,
            savings=obj.savings,
            total=obj.total,
            deliveryFee=obj.deliveryFee,
            tax=obj.tax,
            tip=obj.tip,
        )
        add_or_update_walmart_order_raw_items(obj.orderName, obj.ordersArr)

        resp = obj.toJSON(includeTax=True)

        return resp

    except InvalidExtractionException as e:
        return (
            "Could not parse the PDF completely. Please inform the developer regarding the issue.",
            500,
        )
    except Exception as e:
        return "API Failed. Please verify the data.", 500


@app.route("/upload_processed_order", methods=["POST"])
@cross_origin(supports_credentials=True)
def upload_processed_order():
    try:
        reqdata = request.get_json()
        if "orderID" not in reqdata:
            return {"message": "Invalid Order"}

        orderID = reqdata["orderID"]
        orderDate = reqdata["orderDate"]
        groupUserIds = reqdata["groupToIds"]
        del reqdata["orderID"]
        del reqdata["orderDate"]

        clear_walmart_order_processed_items(orderID)
        for groupName in reqdata.keys():
            if groupName == "groupToIds":
                continue

            groupID = add_or_update_walmart_groups(
                orderID, groupName, groupUserIds[groupName]
            )
            add_or_update_walmart_order_processed_items(
                orderID, groupID, reqdata[groupName]
            )

        return {"message": "successfully processed items"}

    except Exception as e:
        return "API Failed. Please verify the data.", 500


@app.route("/fetch_processed_order", methods=["GET"])
@cross_origin(supports_credentials=True)
def fetch_processed_order():
    try:
        orderID = request.args.get("orderID")
        orderDate = request.args.get("orderDate")

        processedOrders = fetch_processed_order_details(orderID, orderDate)
        return processedOrders
    except Exception as e:
        return "API Failed. Please verify the data.", 500


@app.route("/user_auth", methods=["POST"])
@cross_origin(supports_credentials=True)
def user_auth():
    try:
        reqdata = request.get_json()
        name = reqdata["name"]
        email = reqdata["email"]

        userID = add_or_update_users(name, email)
        return {"userID": userID, "name": name, "email": email}

    except Exception as e:
        return "API Failed. Please verify the data.", 500
