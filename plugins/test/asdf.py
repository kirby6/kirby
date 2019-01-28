import core.db
from core import flask_app

print(core.db.THIS_CONFIG_VALUE)

a = 4


@flask_app.route('/<int:age>')
def bla(age):
    return 'hello %d' % age
