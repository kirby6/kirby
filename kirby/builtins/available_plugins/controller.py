from kirby.core.private.loader import _loaded_plugins as loaded_plugins


def get_all_available_plugins():
    return list(filter(lambda plugin: plugin != '__pycache__', loaded_plugins))
