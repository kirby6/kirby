from bson import json_util

import plugins.exercises.statuses as statuses
from kirby.core.db import bson_to_json
from .service import add_files_to_filesystem, get_all_exercises_from_db, get_metadata_by_id, insert_exercise_to_db


def get_all_exercises():
    return bson_to_json(get_all_exercises_from_db())


def create_exercise(name, groups, module, status=statuses.NOT_OPENED, files=None):
    files = [{'data': file, 'filename': '_'.join(['exercise', module, name, file.filename])} for file in files]
    file_ids = add_files_to_filesystem(files)
    files = [get_metadata_by_id(file_id) for file_id in file_ids]
    exercise = {
        'name': name,
        'groups': groups,
        'module': module,
        'status': status,
        'files': files
    }
    return json_util.dumps(insert_exercise_to_db(exercise))
