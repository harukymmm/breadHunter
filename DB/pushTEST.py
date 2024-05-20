import sqlite3
import os
#DBと接続する
db_path = 'test/TEST.db'
conn = sqlite3.connect(db_path)
cur = conn.cursor()

cur.execute("DELETE FROM breads")
#追加するレコード
new_records = [
    (11,"あんドーナツ", 1, "images/チェルキオ/bread1.jpg", "あんこが入ったドーナツ"),
    (12,"プレーンフォカッチャ", 1, "images/チェルキオ/bread2.jpg", "シンプルなフォカッチャ"),
    (13, "お豆腐メロンパン", 1, "images/チェルキオ/bread3.jpg", "優しい味のメロンパン")
]

cur.execute("DELETE FROM shops")
# "breads"にレコードを追加

cur.executemany('INSERT INTO breads (name, shop, img, difficulty, explanation) VALUES (?, ?, ?, ?, ?)', new_records)


cur.execute('INSERT INTO shops(shop_name, latitude, longitude) VALUES("チェルキオ", 35.025298579003916, 135.78165380826943)')


cur.execute('INSERT INTO shops(shop_id, shop_name, latitude, longitude) VALUES(1, "チェルキオ", 35.025298579003916, 135.78165380826943)')
cur.execute('INSERT INTO rankS(bread_id) VALUES(11)')
cur.execute('INSERT INTO rankA(bread_id) VALUES(12)')
cur.execute('INSERT INTO rankB(bread_id) VALUES(13)')

# terminalで実行したSQL文と同じようにexecute()に書く
cur.execute('SELECT * FROM breads')
# 中身を全て取得するfetchall()を使って、printする。
print(cur.fetchall())
cur.execute('SELECT * FROM shops')
print(cur.fetchall())

cur.execute('SELECT * FROM rankS')
print(cur.fetchall())
cur.execute('SELECT * FROM rankA')
print(cur.fetchall())
cur.execute('SELECT * FROM rankB')
print(cur.fetchall())
conn.commit()

cur.close()
conn.close()

