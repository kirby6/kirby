import json

from kirby.core import db, flask_app


@flask_app.route('/<int:group_id>')
def get_group_by_id(group_id):
    return json.dumps(db.get_user_by_id(group_id))
