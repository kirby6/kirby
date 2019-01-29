import json

from kirby.core import db, web_api


@web_api.route('/<int:group_id>')
def get_group_by_id(group_id):
    return json.dumps(db.get_user_by_id(group_id))
