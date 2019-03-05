import traceback
from sys import stderr
from flask import Flask, jsonify
from werkzeug.exceptions import HTTPException
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app, supports_credentials=True)

socketio = SocketIO(app)


@app.errorhandler(Exception)
def handle_error(e):
    code = 500
    if isinstance(e, HTTPException):
        code = e.code
    print(traceback.format_exc(), file=stderr)
    return jsonify(error=str(e)), code
