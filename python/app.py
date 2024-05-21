from flask import Flask

app = Flask(__name__)

#トップページへのリクエストが来た時に関数を返す
@app.route("/")
def index():
    return "index page"