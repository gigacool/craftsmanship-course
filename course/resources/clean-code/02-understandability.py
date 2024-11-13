# Negative conditionals

def is_user_not_authorized(user):
    return not (user.is_active and user.has_permission("access_resource"))

# vs

def is_user_authorized(user):
    return user.is_active and user.has_permission("access_resource")
