import sqlite3
import os
#DBと接続する
db_path = 'test/TEST.db'
conn = sqlite3.connect(db_path)
cur = conn.cursor()

cur.execute("DELETE FROM breads")
#追加するレコード
new_records = [
    ("あんドーナツ", "チェルキオ", "images/チェルキオ/bread1.jpg", "A", "ドーナツ"),
    ("プレーンフォカッチャ", "チェルキオ", "images/チェルキオ/bread2.jpg", "B", "フォカッチャ"),
    ("お豆腐メロンパン", "チェルキオ", "images/チェルキオ/bread3.jpg", "C", "メロンパン")
]

cur.execute("DELETE FROM shops")
# "breads"にレコードを追加
cur.executemany('INSERT INTO breads (name, shop, img, difficulty, explanation) VALUES (?, ?, ?, ?, ?)', new_records)


cur.execute('INSERT INTO shops(shop_name, latitude, longitude) VALUES("チェルキオ", 35.025298579003916, 135.78165380826943)')


# terminalで実行したSQL文と同じようにexecute()に書く
cur.execute('SELECT * FROM breads')
# 中身を全て取得するfetchall()を使って、printする。
print(cur.fetchall())
cur.execute('SELECT * FROM shops')
print(cur.fetchall())

conn.commit()

cur.close()
conn.close()

