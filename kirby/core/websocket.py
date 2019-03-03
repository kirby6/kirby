from .private.router import socketio
from kirby.builtins.auth import get_current_user_id


@socketio.on('connect')
def connect_handler():
    current_user = get_current_user_id()
    if current_user:
        print({'message': f'{current_user} has joined'})
        socketio.send({'message': f'{current_user} has joined'},
                      broadcast=True)
    else:
        return False
