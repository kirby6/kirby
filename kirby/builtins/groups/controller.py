from bson import json_util

from kirby.core.db import bson_to_json, collection as groups


def get_all_groups():
    return bson_to_json(groups.find())


def get_group_by_name(name):
    return bson_to_json(groups.find_one({'name': name}))


def get_group_children(child_name):
    return bson_to_json(groups.find({'parent': child_name}))


def create_group(name, parent=None):
    group_to_add = {
        'name': name
    }
    if parent:
        group_to_add['parent'] = parent
    return json_util.dumps(groups.insert_one(group_to_add).inserted_id)
