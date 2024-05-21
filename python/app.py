from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS

#from flask_sqlalchemy import SQLAlchemy #これがflaskのSQLiteらしい？分からん
import sqlite3
import os
import random
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
def generate_random_number(n):
    return random.randrange(1, n+1)
ranknum=[]
breadid=[]
bread_info=[]
id=[]
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
    
    numS=generate_random_number(rankS_count)
    numA=generate_random_number(rankA_count)
    numB=generate_random_number(rankB_count)
    num=[numS,numA,numB]
    cursor.execute("SELECT bread_id FROM rankS WHERE id = ?", (numS,))
    row = cursor.fetchone()
    print("bread_id_S:", row[0])
    bread_id_S = row[0]
    cursor.execute("SELECT bread_id FROM rankA WHERE id = ?", (numA,))
    row = cursor.fetchone()
    print("bread_id_A:", row[0]) 
    bread_id_A = row[0]
    cursor.execute("SELECT bread_id FROM rankB WHERE id = ?", (numB,))
    row = cursor.fetchone()
    print("bread_id_B:", row[0])  
    bread_id_B = row[0]
    breadid=[bread_id_S, bread_id_A, bread_id_B]
    id={'bread_id_S': bread_id_S,
        'bread_id_A': bread_id_A,
        'bread_id_B': bread_id_B}


    cursor.execute("SELECT shop_id, img, explanation FROM breads WHERE id = ?", (bread_id_S,))
    row = cursor.fetchone()
    bread_info_S = {'shop_id': row[0],
        'img': row[1],
        'explanation': row[2]}
    shop_id_S=row[0]
        
    
    cursor.execute("SELECT shop_id, img, explanation FROM breads WHERE id = ?", (bread_id_A,))
    row = cursor.fetchone()
    bread_info_A = {'shop_id': row[0],
        'img': row[1],
        'explanation': row[2]}
    shop_id_A=row[0]
    cursor.execute("SELECT shop_id, img, explanation FROM breads WHERE id = ?", (bread_id_B,))
    row = cursor.fetchone()
    bread_info_B = {'shop_id': row[0],'img': row[1],'explanation': row[2]}
    info={'bread_info_S': bread_info_S,
        'bread_info_A': bread_info_A,
        'bread_info_B': bread_info_B}
    shop_id_B=row[0]
        
        
    cursor.execute("SELECT latitude, longitude FROM shops WHERE shop_id = ?", (shop_id_S,))
    row = cursor.fetchone()
    shop_S = {'latitude': row[0], 'longitude': row[1]}
    cursor.execute("SELECT latitude, longitude FROM shops WHERE shop_id = ?", (shop_id_A,))
    row = cursor.fetchone()
    shop_A = {'latitude': row[0], 'longitude': row[1]}
    cursor.execute("SELECT latitude, longitude FROM shops WHERE shop_id = ?", (shop_id_B,))
    row = cursor.fetchone()
    shop_B = {'latitude': row[0], 'longitude': row[1]}
    shop={
         'shop_S':shop_S,
         'shop_A':shop_A,
         'shop_B':shop_B
         }
    
        
    
    print(info)
    conn.close()
    
    return jsonify({'id': id, 'info': info, 'shop':shop})
# @app.route("/")
# def index():
    
#     try:
#         conn = sqlite3.connect(db_path)
#         conn.cursor().execute("SELECT*FROM rankS")  # 簡単なクエリを実行
#         conn.close()
#         return "DB OK"
#     except sqlite3.Error as e:
#         return f"DB Error: {e}"

from Forward import ClassifyBreadImg

# app = Flask(__name__)
# CORS(app)
# app.run(debug=True)

#トップページへのリクエストが来た時に関数を返す
@app.route("/")
def Classify_toFront():
    result=ClassifyBreadImg()
    result=str(result)
    return result

