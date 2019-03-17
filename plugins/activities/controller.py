import os
import sys
import importlib
from bson import ObjectId

from kirby.core.db import bson_to_json
from .service import get_all_activities_from_db, add_files_to_filesystem, \
    get_metadata_by_id, insert_activity_to_db, delete_activity_from_db, \
    remove_files_from_filesystem, get_activity_by_id, get_file_by_id

CURRENT_PATH = os.path.abspath(os.path.dirname(__file__))


def get_all_activities():
    return bson_to_json(list(get_all_activities_from_db()))


def create_activity(name, submissions=None, files=None, id=None):
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
    if submissions:
        activity['submissions'] = submissions
    if id:
        activity['_id'] = id
    return bson_to_json(insert_activity_to_db(activity))


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
    create_activity(files=files, id=ObjectId(activity_id), **activity)


def get_activity_file_by_id(activity_id, file_id):
    activity = get_activity_by_id(activity_id)
    if not isinstance(file_id, ObjectId):
        file_id = ObjectId(file_id)
    if not filter(lambda f: f['_id'] == file_id, activity['files']):
        return None
    return get_file_by_id(file_id)


def get_submissions():
    submissions = []
    for filename in os.listdir(os.path.join(CURRENT_PATH, 'submissions')):
        submission, file_extension = os.path.splitext(filename)
        if file_extension == '.py':
            submissions.append(submission)
    return submissions


def prepare_submissions(activity_id, user_id):
    activity = get_activity_by_id(activity_id)
    result = {}
    sys.path.append(CURRENT_PATH)
    for submission in get_submissions():
        module_path = '.' + submission
        module = importlib.import_module(module_path, 'submissions')
        result[submission] = module.prepare(
            activity['submissions'][submission], user_id)
    sys.path.remove(CURRENT_PATH)
    return result
