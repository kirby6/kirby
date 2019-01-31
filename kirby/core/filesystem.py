import gridfs

from .db import _db

fs = gridfs.GridFS(_db)
fs.get_file_metadata = _db.get_collection('fs.files').find_one
