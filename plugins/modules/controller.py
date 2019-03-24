from bson import ObjectId

from kirby.core.db import bson_to_json, collection as modules
from kirby.builtins.notifications import notify


def get_all_modules():
    return bson_to_json(
        list(
            modules.aggregate([
                {
                    '$lookup': {
                        'from': 'activities',
                        'localField': 'activities',
                        'foreignField': '_id',
                        'as': 'activities'
                    }
                },
            ])))


def get_module_by_id(id):
    if not isinstance(id, ObjectId):
        id = ObjectId(id)
    return bson_to_json(
        list(
            modules.aggregate([
                {
                    '$match': {
                        '_id': id
                    }
                },
                {
                    '$lookup': {
                        'from': 'activities',
                        'localField': 'activities',
                        'foreignField': '_id',
                        'as': 'activities'
                    }
                },
            ])))[0]


def create_module(name, parent=None):
    module_to_add = {'name': name}
    if parent:
        if not isinstance(parent, ObjectId):
            parent = ObjectId(parent)
        module_to_add['parent'] = parent
    result = bson_to_json(modules.insert_one(module_to_add).inserted_id)
    notify({
        'msg': 'module created',
        'id': result,
    })
    return result


def add_activity(module_id, activity_id):
    if not isinstance(module_id, ObjectId):
        module_id = ObjectId(module_id)
    if not isinstance(activity_id, ObjectId):
        activity_id = ObjectId(activity_id)
    modules.update_one({'_id': module_id},
                       {'$addToSet': {
                           'activities': activity_id
                       }})
