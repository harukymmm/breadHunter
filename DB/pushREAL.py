import sqlite3
import os
#DBと接続する
db_path = 'real/REAL.db'
conn = sqlite3.connect(db_path)
cur = conn.cursor()

cur.execute("DELETE FROM breads")
#追加するレコード
bread_records = [
    (11,"あんドーナツ", 1, "../../DB/image/チェルキオ/11.jpeg", "あんこが入ったドーナツ"),
    (12,"プレーンフォカッチャ",1, "../../DB/image/チェルキオ/12.jpeg", "シンプルなフォカッチャ"),
    (13,"お豆腐メロンパン",1, "../../DB/image/チェルキオ/13.jpeg", "やさしい味のメロンパン"),
    (14,"レーズンパン",1,"../../DB/image/チェルキオ/14.jpeg","レーズンたっぷり"),
    (15,"ベーコンエッグ",1,"../../DB/image/チェルキオ/15.jpeg","ベーコンでがっつり"),
    (16,"シナモンドーナツ",1,"../../DB/image/チェルキオ/16.jpeg","シナモンの香りあふれる"),
    (17,"ライ麦パンとハムチーズ",1,"../../DB/image/チェルキオ/17.jpeg","ハムとチーズのナイスタッグ"),
    (18,"カプレーゼ",1,"../../DB/image/チェルキオ/18.jpeg","トマトさっぱり"),
    (19,"クリームパン",1,"../../DB/image/チェルキオ/19.jpeg","クリームの量がやばい"),
    (110,"枝豆とウインナーのパン",1,"../../DB/image/チェルキオ/110.jpeg","意外な組み合わせがおいしい"),
    (111,"りんごとゴルゴンゾーラのフォカッチャ",1,"../../DB/image/チェルキオ/111.jpeg","チーズのパンチが癖になる"),
    (21,"ベーコンバーガー",2,"../../DB/image/シズヤ/21.jpeg","お腹一杯バーガー"),
    (22,"ホットドッグ",2,"../../DB/image/シズヤ/22.jpeg","パン屋の本気のホットドッグ"),
    (23,"ふわふわメロンパン",2,"../../DB/image/シズヤ/23.jpeg","柔らかいくちどけ"),
    (31,"キャベツサンド",3,"../../DB/image/ブリアン/31.jpeg","シャキシャキキャベツ"),
    (32,"たまごサンド",3,"../../DB/image/ブリアン/32.jpeg","たくさん卵"),
    (33,"プレッツェル",3,"../../DB/image/ブリアン/32.jpeg","たくさん卵"),
    (41,"あんパン",4,"../../DB/image/ルバカサブル/41.jpeg","和の甘味がお口に広がる"),
    (42,"レーズンフランスパン",4,"../../DB/image/ルバカサブル/42.jpeg","フランスパンにはレーズンだね"),
    (43,"固そうなパン",4,"../../DB/image/ルバカサブル/43.jpeg","カッチカチやで"),
    (51,"抹茶ブレッド",5,"../../DB/image/ボロニヤ/51.jpeg","大人の渋み"),
    (52,"チョコブレッド",5,"../../DB/image/ボロニヤ/52.jpeg","子供の甘み"),
]

cur.execute("DELETE FROM shops")
# "breads"にレコードを追加
cur.executemany('INSERT INTO breads (name, shop, img, difficulty, explanation) VALUES (?, ?, ?, ?, ?)', bread_records)
cur.execute('INSERT INTO shops(shop_id, shop_name, latitude, longitude) VALUES(1, "チェルキオ", 35.025298579003916, 135.78165380826943)')
cur.execute('INSERT INTO shops(shop_id, shop_name, latitude, longitude) VALUES(2, "シズヤ", 35.0095652007604, 135.768796773014)')
cur.execute('INSERT INTO shops(shop_id, shop_name, latitude, longitude) VALUES(3, "ブリアン", 35.0536527859984, 135.764298829584)')
cur.execute('INSERT INTO shops(shop_id, shop_name, latitude, longitude) VALUES(4, "ルバカサブル", 35.0095771486264, 135.778423994768)')
cur.execute('INSERT INTO shops(shop_id, shop_name, latitude, longitude) VALUES(5, "ボロニヤ", 35.007563916491, 135.777572754558)')

cur.execute('INSERT INTO rankS(bread_id) VALUES(11)')
cur.execute('INSERT INTO rankS(bread_id) VALUES(12)')
cur.execute('INSERT INTO rankS(bread_id) VALUES(19)')
cur.execute('INSERT INTO rankS(bread_id) VALUES(22)')
cur.execute('INSERT INTO rankS(bread_id) VALUES(31)')
cur.execute('INSERT INTO rankS(bread_id) VALUES(32)')
cur.execute('INSERT INTO rankS(bread_id) VALUES(43)')
cur.execute('INSERT INTO rankA(bread_id) VALUES(14)')
cur.execute('INSERT INTO rankA(bread_id) VALUES(16)')
cur.execute('INSERT INTO rankA(bread_id) VALUES(23)')
cur.execute('INSERT INTO rankA(bread_id) VALUES(34)')
cur.execute('INSERT INTO rankA(bread_id) VALUES(41)')
cur.execute('INSERT INTO rankA(bread_id) VALUES(52)')
cur.execute('INSERT INTO rankB(bread_id) VALUES(13)')
cur.execute('INSERT INTO rankB(bread_id) VALUES(15)')
cur.execute('INSERT INTO rankB(bread_id) VALUES(17)')
cur.execute('INSERT INTO rankB(bread_id) VALUES(18)')
cur.execute('INSERT INTO rankB(bread_id) VALUES(110)')
cur.execute('INSERT INTO rankB(bread_id) VALUES(111)')
cur.execute('INSERT INTO rankB(bread_id) VALUES(21)')
cur.execute('INSERT INTO rankB(bread_id) VALUES(33)')
cur.execute('INSERT INTO rankB(bread_id) VALUES(42)')
cur.execute('INSERT INTO rankB(bread_id) VALUES(51)')


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