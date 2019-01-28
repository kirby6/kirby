from kirby.core import flask_app

a = 4


@flask_app.route('/<int:age>', methods=['POST'])
def bla(age):
    return 'hello %d' % age
