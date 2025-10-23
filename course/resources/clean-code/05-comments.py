# ============================================
# COMMENTS: When and How to Use Them
# ============================================
# Good code should be self-explanatory. Comments should explain WHY,
# not WHAT. Use comments sparingly and prefer clear code over comments.

# ❌ BAD: Redundant comments that just repeat the code
# Problems:
# - Comments don't add any value
# - They explain WHAT the code does (which is obvious)
# - Comments can become outdated if code changes
# - Clutters the code
def calculate_total(price, tax_rate):
    # This function calculates the total amount
    # It adds tax to the price
    total = price + (price * tax_rate)  # Calculate total including tax
    return total  # Return the total

# These comments tell us nothing we couldn't figure out from reading the code!


# ✅ BETTER: Minimal documentation with self-explanatory code
# Benefits:
# - Function name explains what it does
# - Simple docstring for API documentation
# - Code is clean and speaks for itself
def calculate_total(price, tax_rate):
    """Calculates the total amount including tax."""
    return price + (price * tax_rate)


# ✅ BEST: Comprehensive documentation for public APIs
# Benefits:
# - Clear parameter types and purposes
# - Documents expected inputs and outputs
# - Useful for IDEs and documentation generators
# - Helps other developers use your code correctly
def calculate_total(price, tax_rate):
    """
    Calculate the total amount including tax.

    Args:
        price (float): The base price of the item in dollars.
        tax_rate (float): The tax rate as a decimal (e.g., 0.15 for 15%).

    Returns:
        float: Total amount with tax applied.

    Raises:
        ValueError: If price is negative or tax_rate is outside [0, 1].

    Example:
        >>> calculate_total(100.0, 0.15)
        115.0
    """
    if price < 0:
        raise ValueError("Price cannot be negative")
    if not 0 <= tax_rate <= 1:
        raise ValueError("Tax rate must be between 0 and 1")

    return price + (price * tax_rate)


# ============================================
# When Comments Are VALUABLE:
# ============================================

# ✅ GOOD: Explaining complex business logic or WHY decisions were made
def calculate_shipping_cost(weight, distance, is_express):
    """Calculate shipping cost with special handling for edge cases."""

    # Standard shipping is $5 + $0.10 per pound
    base_cost = 5.0 + (weight * 0.10)

    # Express shipping uses a 2.5x multiplier instead of flat rate
    # because our carrier changed pricing model in Q2 2024
    if is_express:
        return base_cost * 2.5

    # Free shipping for orders over 50 pounds within 100 miles
    # Marketing decision from stakeholder meeting on 2024-01-15
    if weight > 50 and distance < 100:
        return 0.0

    return base_cost + (distance * 0.05)


# ✅ GOOD: Warning about non-obvious behavior
def delete_user_account(user_id):
    """
    Permanently delete a user account and all associated data.

    WARNING: This operation cannot be undone. All user data including
    purchase history, saved preferences, and uploaded content will be
    permanently deleted. Consider using deactivate_user_account() instead
    for temporary account suspension.
    """
    # Implementation...
    pass


# ✅ GOOD: TODO comments for tracking future work
def process_payment(order):
    """Process payment for an order."""
    # TODO: Add support for cryptocurrency payments (ticket #1234)
    # TODO: Implement retry logic for failed transactions (ticket #1235)
    # FIXME: Race condition when processing concurrent orders (ticket #1236)
    pass


# ❌ BAD: Comments that apologize for bad code
def get_data(x):
    # This is a hack but it works
    # TODO: Clean this up later
    return [y for y in x if y > 0]  # Don't ask me why

# Instead, just write clean code:
def get_positive_numbers(numbers):
    """Return only the positive numbers from the input list."""
    return [num for num in numbers if num > 0]


# ============================================
# GOLDEN RULES FOR COMMENTS:
# ============================================
# 1. Code should be self-explanatory - prefer clear code over comments
# 2. Comments explain WHY, not WHAT
# 3. Don't comment bad code - rewrite it
# 4. Update comments when you update code (or remove them)
# 5. Use docstrings for public APIs and complex functions
# 6. Avoid commented-out code (use version control instead)
#
# Remember: "A comment is a failure to express yourself in code." - Robert C. Martin
# Use comments as a last resort when the code alone cannot express your intent.
