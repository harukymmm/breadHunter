import os
import sqlite3

# データベースファイルのパス
db_path = "test/TEST.db"
# データベースファイルに接続
conn = sqlite3.connect(db_path)

# sqliteを操作するカーソルオブジェクトを作成
cur = conn.cursor()

# breadsというテーブル名
# 主キーがid name,shop,img, difficultyの要素を持つ
# 大文字部はSQL文。小文字でも問題ない。
cur.execute(
    """CREATE TABLE rankS(id INTEGER PRIMARY KEY AUTOINCREMENT, bread_id INTEGER)"""
)
cur.execute(
    """CREATE TABLE rankA(id INTEGER PRIMARY KEY AUTOINCREMENT, bread_id INTEGER)"""
)
cur.execute(
    """CREATE TABLE rankB(id INTEGER PRIMARY KEY AUTOINCREMENT, bread_id INTEGER)"""
)
cur.execute(
    """CREATE TABLE breads(id INTEGER PRIMARY KEY, name TEXT, shop_id INTEGER, img TEXT, explanation TEXT)"""
)
cur.execute(
    """CREATE TABLE shops(shop_id INTEGER PRIMARY KEY , shop_name TEXT,latitude TEXT, longitude TEXT)"""
)
# データベースへコミット。これで変更が反映される。
conn.commit()
conn.close()

