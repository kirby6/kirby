from bson import json_util, ObjectId

import plugins.exercises.statuses as statuses
from kirby.core.db import bson_to_json
from .service import get_all_exercises_from_db, add_files_to_filesystem, \
    get_metadata_by_id, insert_exercise_to_db, delete_exercise_from_db, \
    remove_files_from_filesystem, get_exercise_by_id


def get_all_exercises():
    return bson_to_json(get_all_exercises_from_db())


def create_exercise(name,
                    groups,
                    module,
                    status=statuses.NOT_OPENED,
                    files=None,
                    _id=None):
    files = [{
        'data':
        file,
        'filename':
        '_'.join([
            'exercise',
            module.replace(' ', '_'),
            name.replace(' ', '_'),
            file.filename.replace(' ', '_')
        ])
    } for file in files]
    file_ids = add_files_to_filesystem(files)
    files = [get_metadata_by_id(file_id) for file_id in file_ids]
    exercise = {
        'name': name,
        'groups': groups,
        'module': module,
        'status': status,
        'files': files
    }
    if _id:
        exercise['_id'] = _id
    return json_util.dumps(insert_exercise_to_db(exercise))


def delete_exercise(exercise_id):
    exercise = get_exercise_by_id(exercise_id)
    remove_files_from_filesystem(exercise.get('files', []))
    delete_exercise_from_db(exercise_id)


def update_exercise(exercise_id, exercise, files=None):
    delete_exercise(exercise_id)
    exercise = {
        k: v
        for k, v in exercise.items() if k != 'files' and k != '_id'
    }
    create_exercise(files=files, _id=ObjectId(exercise_id), **exercise)
