import sqlite3
import os
#DBと接続する
db_path = 'real/REAL.db'
conn = sqlite3.connect(db_path)
cur = conn.cursor()



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