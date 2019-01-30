import inspect

from kirby.core.private.router import app
from kirby.core.private.utils import get_calling_plugin_name


def route(path, **options):
    def decorator(func):
        plugin_name = get_calling_plugin_name(inspect.stack())
        return app.route('/' + plugin_name + path, **options)(func)

    return decorator
