import os

JWT_ACCESS_TOKEN_EXPIRES = 30 * 24 * 60 * 60

DB_CONNECTION = {
    'host': 'localhost',
    'port': 27017
}

DB_NAME = 'kirby'

PLUGIN_DIRECTORIES = [
    os.path.join(".", "kirby", "builtins"),
    os.path.join(".", "plugins")
]

SERVER_ADDRESS = {'host': '0.0.0.0', 'port': 5000}
