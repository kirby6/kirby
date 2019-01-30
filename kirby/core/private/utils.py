import inspect


def get_calling_plugin_name(stack):
    # TODO: Refactor (this '2' is annoying me)
    return inspect.getmodule(stack[1][0]).__name__.split('.')[2]
