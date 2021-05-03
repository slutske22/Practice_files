# %% Lists and Tuples

# Lists
list_1 = [1, 2, 3, 4, 5]
tuple_1 = ('f', 'g', 'h', 'j', 'k', 'l')


def print_list(list):
    for i, thing in enumerate(list):
        if i == len(list) - 1:
            print(thing)
        else:
            print(thing, end=", ")


def print_with_join(list):
    print(", ".join(list))


print(tuple_1)
print(tuple_1[3:])
print(tuple_1[:3])
print(tuple_1[2:3])

print_with_join(tuple_1)


# %% Dictionary

animals = {
    'cat': 'meow',
    'dog': 'bark',
    'lion': 'rawr',
    'bird': 'chirp',
}


def print_dict(d):
    for thing in d:
        print(f"{thing}: {d[thing]}")


# print_dict(animals)

for k, v in animals.items():
    print(f"{k} says {v}")
print()

for k in animals.keys():
    print(k)
print()

for v in animals.values():
    print(v)

# %% Set

a = set(["a", "b", "c", "d", "e", "d", "d", "g"])
b = set(["a", "b", "q", "d"])
print(b-a)

# %%

# %%
