import os

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
