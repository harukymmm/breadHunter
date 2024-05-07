import sqlite3
import os
#DBと接続する
db_path = 'test/TEST.db'
conn = sqlite3.connect(db_path)
cur = conn.cursor()

#追加するレコード
new_records = [
    ("あんドーナツ", "チェルキオ", "../images/チェルキオ/bread1.jpg", "A"),
    ("プレーンフォカッチャ", "チェルキオ", "../images/チェルキオ/bread2.jpg", "B"),
    ("お豆腐メロンパン", "チェルキオ", "../images/チェルキオ/bread3.jpg", "C")
]

# "breads"にレコードを追加
cur.executemany("""
    INSERT INTO breads (name, shop, img, difficulty)
    VALUES (?, ?, ?, ?)
""", new_records)

conn.commit()

cur.close()
conn.close()

