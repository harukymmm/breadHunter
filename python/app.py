# 簡単なindexページの作成を行っています。
from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
#from flask_sqlalchemy import SQLAlchemy #これがflaskのSQLiteらしい？分からん
import sqlite3
import os


app = Flask(__name__)
CORS(app) #Cross Origin Resource Sharing
db_path = "./DB/real/REAL.db"
if not os.path.exists(db_path):
        print("No DB exist")
else:
        print("DB exist")


def get_db_connection():
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/data", methods=["GET"])
def get_rank_count():

    count = {}
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as count FROM rankS")  
    row = cursor.fetchone()
    print("COUNT:", row[0])
    rankS_count = row['count']
   

    cursor.execute("SELECT COUNT(*) as count FROM rankA") 
    row = cursor.fetchone()
    print("COUNT:", row[0])
    rankA_count = row['count']
    

    cursor.execute("SELECT COUNT(*) as count FROM rankB")
    row = cursor.fetchone()
    print("COUNT:", row[0])
    rankB_count = row['count']
    conn.close()

    count = {
            'rankS_count': rankS_count,
            'rankA_count': rankA_count,
            'rankB_count': rankB_count
        }

    print(count)
    return jsonify(count), 200

@app.route("/")

def index():
    
    try:
        conn = sqlite3.connect(db_path)
        conn.cursor().execute("SELECT*FROM rankS")  # 簡単なクエリを実行
        conn.close()
        return "DB OK"
    except sqlite3.Error as e:
        return f"DB Error: {e}"
