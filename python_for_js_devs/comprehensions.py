# %%
ZERO_TO_FOUR = [0, 1, 2, 3, 4]

NEW_LIST = [number + 1 for number in ZERO_TO_FOUR]
print("NEW_LIST", NEW_LIST)

FILTER_NEW_LIST = [number for number in NEW_LIST if number > 2]
print("FILTER_NEW_LIST", FILTER_NEW_LIST)


# %%
FRIENDS = [
    {"name": "John"},
    {"name": "Jane"},
    {"name": "Simon"},
    {"name": "Ramon"}
]

NAME_STRINGS = [friend["name"] for friend in FRIENDS]

NAMES_WITH_M = [string for string in NAME_STRINGS if "m" in string]

print("\n\n         =========== NAME_STRINGS ===============")
print(NAME_STRINGS)

print("\n\n         =========== NAMES_WITH_M ===============")
print(NAMES_WITH_M)
# %%
