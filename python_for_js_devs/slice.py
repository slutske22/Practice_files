# %%
from decimal import Decimal
ages = [20, 23, 27, 32, 47]

print(ages[:2])
print(ages[2:])
print(ages[2:4])
print(ages[-2:-1])
print(ages[2:-2])
print(sum(ages))
print(sum(ages)/len(ages))  # mean


# %%
# Challenge


USERNAME = "Jake"
CREDITS = Decimal("2.2")
ITEMS_IN_CART = ["Jeans", "Shoes", "socks"]


def get_first_item(user, credits, items):
    return f"First item: {items[0]}, User: {user}, Credits remaining: {credits}"


print(get_first_item(USERNAME, CREDITS, ITEMS_IN_CART))
# %%
