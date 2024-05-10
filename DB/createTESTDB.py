import os
import sqlite3

# データベースファイルのパス
db_path = "test/practice.db"

# データベースファイルが存在しない場合に作成する
if not os.path.exists(db_path):
    # データベースへのコネクションを作成
    conn = sqlite3.connect(db_path)
    
    # データベースへのコネクションを閉じる
    conn.close()


