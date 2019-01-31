from bson import json_util

import kirby.plugins.exercises.statuses as statuses
from kirby.core.db import bson_to_json, collection as exercises


def get_all_exercises():
    return bson_to_json(exercises.find())


def create_exercise(name, group, module, status=statuses.NOT_OPENED):
    return json_util.dumps(exercises.insert_one({
        'name': name,
        'group': group,
        'module': module,
        'status': status
    }).inserted_id)
