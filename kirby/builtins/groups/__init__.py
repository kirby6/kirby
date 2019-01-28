from kirby.core import flask_app
from kirby.core import db
import json


@flask_app.route('/<int:group_id>')
def get_group_by_id(group_id):
    return json.dumps(db.get_user_by_id(group_id))
