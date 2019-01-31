import gridfs

from .db import _db

fs = gridfs.GridFS(_db)
