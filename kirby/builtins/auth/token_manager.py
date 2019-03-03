from flask_jwt_extended import JWTManager, create_access_token

from kirby.core.db import collection as auth
from kirby.core.private.router import app
import kirby.core.config as config

app.config['JWT_SECRET_KEY'] = auth.find_one()['secret']
app.config[
    'JWT_ACCESS_TOKEN_EXPIRES'] = config.JWT_ACCESS_TOKEN_EXPIRES or 1 * 60 * 60  # 1 hour as default
jwt = JWTManager(app)


@jwt.user_claims_loader
def add_claims_to_access_token(user):
    return {
        'id': user['id'] if 'id' in user else '',
        'roles': user.get('roles', [])
    }


def get_token(user=None):
    if (not user):
        return {"error": "Corrupted user data"}
    return create_access_token(identity=user)
