# %%
my_dict = {
    "title": "Python is charming"
}

print(my_dict["title"])
try:
    print(my_dict["author"])
except KeyError:
    print("Anonymous Author")

# %%
