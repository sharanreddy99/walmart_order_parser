from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os
from .WalmartOrder.WalmartOrder import WalmartOrder
from .WalmartItem.WalmartItem import WalmartItem

import logging
from logging.handlers import RotatingFileHandler
from datetime import datetime
import json


app = Flask(__name__)
CORS(app, support_credentials=True)

# Set up logging to a file
logging.basicConfig(level=logging.INFO)
handler = RotatingFileHandler("logs/app.log", maxBytes=10000, backupCount=3)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(handler)


@app.before_request
def log_request_info():
    if request.method in ["POST", "PUT", "PATCH"]:
        # Assuming the body is JSON. You might want to handle different data formats (or errors) depending on your use case.
        data = request.get_json(force=True) if request.is_json else "Not a JSON request"
        data_str = json.dumps(data)
    else:
        data_str = "No body for GET request"

    log_message = f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} - Method: {request.method}, URL: {request.url}, Body: {data_str}"
    logger.info(log_message)


# DB_SETUP AND CONFIG
db_host = os.getenv("WALMART_PARSER_DB_HOST")
db_user = os.getenv("WALMART_PARSER_DB_USERNAME")
db_password = os.getenv("WALMART_PARSER_DB_PASSWORD")
db_name = os.getenv("WALMART_PARSER_DB_NAME")

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://{0}:{1}@{2}/{3}".format(
    db_user, db_password, db_host, db_name
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)
