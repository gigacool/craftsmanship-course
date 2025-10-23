# ============================================
# UNDERSTANDABILITY: Positive vs Negative Conditionals
# ============================================
# Code should be easy to read and understand. Positive conditionals
# are generally easier to reason about than negative ones.

# ❌ BAD: Using negative conditionals
# Problems:
# - Double negatives are hard to understand: "if not is_user_not_authorized"
# - Forces mental gymnastics when reading
# - More prone to logic errors
def is_user_not_authorized(user):
    return not (user.is_active and user.has_permission("access_resource"))

# Example usage showing the confusion:
# if not is_user_not_authorized(user):  # Hard to parse mentally!
#     grant_access()
# else:
#     deny_access()


# ✅ GOOD: Using positive conditionals
# Benefits:
# - Easy to read: "if is_user_authorized"
# - Natural language flow
# - Less likely to introduce bugs
def is_user_authorized(user):
    return user.is_active and user.has_permission("access_resource")

# Example usage showing the clarity:
# if is_user_authorized(user):  # Clear and straightforward!
#     grant_access()
# else:
#     deny_access()


# ============================================
# More Examples: The Impact of Naming
# ============================================

# ❌ BAD: Negative naming makes code confusing
def is_not_valid_email(email):
    return '@' not in email or '.' not in email

# Usage becomes confusing:
# if not is_not_valid_email(email):  # What does this even mean?
#     send_email(email)


# ✅ GOOD: Positive naming is clear
def is_valid_email(email):
    return '@' in email and '.' in email

# Usage is clear:
# if is_valid_email(email):  # Easy to understand!
#     send_email(email)


# ============================================
# RULE OF THUMB:
# ============================================
# Write your conditionals in the positive form.
# If you find yourself using "not" in a function name (is_not_X, has_no_X),
# consider inverting the logic and using a positive name instead.
#
# When you DO need to check a negative condition:
#   Prefer: if not is_valid(x)
#   Over:   if is_invalid(x)
# This keeps function names positive while still allowing negative checks.
