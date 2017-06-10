import os

from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, instance_relative_config=True)
app.secret_key = '\xaf\xa6Q~\xd3\x88\xaa?k\xb5\xdd\xd0\x0c\x05\x93\x04\x16~\t\x8b\x90\xa9\x1dD'
api = Api(app)

#app.config.from_pyfile('config.py')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)

from app import views
from app import walletView
from app import itemView
