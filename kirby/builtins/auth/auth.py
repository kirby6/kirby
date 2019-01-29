from flask import jsonify
from flask_jwt_extended import get_jwt_claims, jwt_required
from functools import wraps


def required_roles(*roles):
    def decorator(func):
        @wraps(func)
        @jwt_required
        def check_roles(*args, **kwargs):
            current_roles = get_jwt_claims().get('roles', [])
            for role in roles:
                if role not in current_roles:
                    return jsonify({"error": "Unauthorized"}), 403
            return func(*args, **kwargs)

        return check_roles

    return decorator
