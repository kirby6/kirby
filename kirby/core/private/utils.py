import inspect


def get_calling_plugin_name():
    # TODO: Refactor (this '2' is annoying me)
    return inspect.getmodule(inspect.stack()[2][0]).__name__.split('.')[2]
