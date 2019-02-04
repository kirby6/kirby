from flask import jsonify
from flask_jwt_extended import JWTManager, create_access_token

from kirby.core import web_api
from kirby.core.db import collection as auth
from kirby.core.private.router import app

app.config['JWT_SECRET_KEY'] = auth.find_one()['secret']
jwt = JWTManager(app)


@jwt.user_claims_loader
def add_claims_to_access_token(user):
    print("xxxxxxxxxx", user)
    return {
        'id': user['_id']['$oid'] if '_id' in user else '',
        'roles': user.get('roles', [])
    }


def get_token(user=None):
    if(not user):
        return {"error": "Corrupted user data"}
    return create_access_token(identity=user)
