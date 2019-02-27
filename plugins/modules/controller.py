from bson import json_util

from kirby.core.db import bson_to_json, collection as modules


def get_all_modules():
    return bson_to_json(modules.find())


def get_module_by_name(name):
    return bson_to_json(modules.find_one({'name': name}))


def create_module(name, parent=None, group=None):
    module_to_add = {'name': name}
    if parent:
        module_to_add['parent'] = parent
    if group:
        module_to_add['group'] = group
    return json_util.dumps(modules.insert_one(module_to_add).inserted_id)
