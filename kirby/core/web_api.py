import inspect

from kirby.core.private.router import app


def get_calling_plugin_name(stack):
    # TODO: Refactor (this '2' is annoying me)
    return inspect.getmodule(stack[1][0]).__name__.split('.')[2]


def route(path, **options):
    def decorator(func):
        plugin_name = get_calling_plugin_name(inspect.stack())
        return app.route('/' + plugin_name + path, **options)(func)

    return decorator
