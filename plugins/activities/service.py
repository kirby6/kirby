from kirby.core import filesystem
from kirby.core.db import collection as activities
from bson import ObjectId


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
    return activities.find_one({'_id': activity_id})


def get_all_activities_from_db():
    return activities.find()


def get_file_by_id(file_id):
    return filesystem.get(file_id)


def get_metadata_by_id(file_id):
    return filesystem.get_file_metadata(file_id)


def insert_activity_to_db(activity):
    return activities.insert_one(activity).inserted_id


def delete_activity_from_db(activity_id):
    if not isinstance(activity_id, ObjectId):
        activity_id = ObjectId(activity_id)
    activities.delete_one({'_id': activity_id})
