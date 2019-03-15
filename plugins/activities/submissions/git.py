def prepare(submission_data, user_id):
    return {'url': submission_data['base_url'] + '/' + str(user_id)}
