from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
from Forward import ClassifyBreadImg

app = Flask(__name__)
CORS(app)
app.run(debug=True)

#トップページへのリクエストが来た時に関数を返す
@app.route("/")
def Classify_toFront():
    result=ClassifyBreadImg()
    result=str(result)
    return result