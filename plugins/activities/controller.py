from bson import json_util, ObjectId

from kirby.core.db import bson_to_json
from .service import get_all_activities_from_db, add_files_to_filesystem, \
    get_metadata_by_id, insert_activity_to_db, delete_activity_from_db, \
    remove_files_from_filesystem, get_activity_by_id


def get_all_activities():
    return bson_to_json(get_all_activities_from_db())


def create_activity(name, files=None, _id=None):
    files = [{
        'data':
        file,
        'filename':
        '_'.join([
            'activity',
            name.replace(' ', '_'),
            file.filename.replace(' ', '_')
        ])
    } for file in files]
    file_ids = add_files_to_filesystem(files)
    files = [get_metadata_by_id(file_id) for file_id in file_ids]
    activity = {'name': name, 'files': files}
    if _id:
        activity['_id'] = _id
    return json_util.dumps(insert_activity_to_db(activity))


def delete_activity(activity_id):
    activity = get_activity_by_id(activity_id)
    remove_files_from_filesystem(activity.get('files', []))
    delete_activity_from_db(activity_id)


def update_activity(activity_id, activity, files=None):
    delete_activity(activity_id)
    activity = {
        k: v
        for k, v in activity.items() if k != 'files' and k != '_id'
    }
    create_activity(files=files, _id=ObjectId(activity_id), **activity)
