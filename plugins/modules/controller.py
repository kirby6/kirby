from bson import json_util, ObjectId

from kirby.core.db import bson_to_json, collection as modules


def get_all_modules():
    return bson_to_json(modules.find())


def get_module_by_name(name):
    return bson_to_json(modules.find_one({'name': name}))


def create_module(name, parent=None):
    module_to_add = {'name': name}
    if parent:
        if not isinstance(parent, ObjectId):
            parent = ObjectId(parent)
        module_to_add['parent'] = parent
    return json_util.dumps(modules.insert_one(module_to_add).inserted_id)


def add_activity(module_id, activity_id):
    if not isinstance(module_id, ObjectId):
        module_id = ObjectId(module_id)
    if not isinstance(activity_id, ObjectId):
        activity_id = ObjectId(activity_id)
    modules.update_one({'_id': module_id},
                       {'$addToSet': {
                           'activities': activity_id
                       }})
