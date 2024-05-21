from flask import Flask
# from flask import request, make_response, jsonify
# from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy #これがflaskのSQLiteらしい？分からん
# import sqlite3
# import os


app = Flask(__name__)
# CORS(app) #Cross Origin Resource Sharing
# DATABASE = os.path.join(os.path.dirname(__file__), '..', 'DB', 'real','REAL.db')

@app.route("/")
def index():
    return "OK"
