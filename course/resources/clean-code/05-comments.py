#  proper use of comments

def calculate_total(price, tax_rate):
    # This function calculates the total amount
    # It adds tax to the price
    total = price + (price * tax_rate)  # Calculate total including tax
    return total

# vs

def calculate_total(price, tax_rate):
    """Calculates the total amount including tax."""
    return price + (price * tax_rate)

# vs

def calculate_total(price, tax_rate):
    """
    Calculate the total amount including tax.

    Parameters:
    price (float): The base price of the item.
    tax_rate (float): The applicable tax rate.

    Returns:
    float: Total amount with tax applied.
    """
    return price + (price * tax_rate)
