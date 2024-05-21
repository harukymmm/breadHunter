from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
from Forward import ClassifyBreadImg

app = Flask(__name__)
CORS(app)
#app.run(debug=True)



#トップページへのリクエストが来た時に関数を返す
@app.route("/classify", methods=["GET"])
def Classify_toFront():
    result=ClassifyBreadImg()
    result=str(result)
    return jsonify({'result':result})

if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host="10.0.2.2")