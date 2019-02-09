from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app, supports_credentials=True)

@app.errorhandler(Exception)
def handle_error(e):
    code = 500
    if isinstance(e, HTTPException):
        code = e.code
    return jsonify(error=str(e)), code