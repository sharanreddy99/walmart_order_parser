from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os
from .WalmartOrder.WalmartOrder import WalmartOrder
from .WalmartItem.WalmartItem import WalmartItem

app = Flask(__name__)
CORS(app, support_credentials=True)

# DB_SETUP AND CONFIG
db_host = os.getenv('WALMART_PARSER_DB_HOST')
db_user = os.getenv('WALMART_PARSER_DB_USERNAME')
db_password = os.getenv('WALMART_PARSER_DB_PASSWORD')
db_name = os.getenv('WALMART_PARSER_DB_NAME')

app.config['SQLALCHEMY_DATABASE_URI'] ="mysql://{0}:{1}@{2}/{3}".format(db_user, db_password, db_host, db_name)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)
