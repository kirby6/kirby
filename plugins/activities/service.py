from kirby.core import filesystem
from kirby.core.db import collection as activities
from bson import ObjectId

aggregation = [{
    '$lookup': {
        'from': 'modules',
        'localField': '_id',
        'foreignField': 'activities',
        'as': 'modules'
    }
},
               {
                   '$graphLookup': {
                       'from': 'modules',
                       'startWith': '$modules._id',
                       'connectFromField': 'parent',
                       'connectToField': '_id',
                       'as': 'modules'
                   }
               }]


def add_files_to_filesystem(files):
    file_ids = []
    for file in files:
        file_ids.append(filesystem.put(**file))
    return file_ids


def remove_files_from_filesystem(files):
    for file in files:
        filesystem.delete(file['_id'])


def get_activity_by_id(activity_id):
    if not isinstance(activity_id, ObjectId):
        activity_id = ObjectId(activity_id)
    return activities.aggregate([{
        '$match': {
            '_id': activity_id
        }
    }] + aggregation)


def get_all_activities_from_db():
    return activities.aggregate(aggregation)


def get_file_by_id(file_id):
    if not isinstance(file_id, ObjectId):
        file_id = ObjectId(file_id)
    return filesystem.get(file_id)


def get_metadata_by_id(file_id):
    return filesystem.get_file_metadata(file_id)


def insert_activity_to_db(activity):
    return activities.insert_one(activity).inserted_id


def delete_activity_from_db(activity_id):
    if not isinstance(activity_id, ObjectId):
        activity_id = ObjectId(activity_id)
    activities.delete_one({'_id': activity_id})
