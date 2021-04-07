# %%
from sys import getsizeof
fruits = ["Banana", "Apple", "Grape", "Pear", "Canteloup"]

i = 0

while i < len(fruits):
    print(fruits[i])
    i += 1

# %%
for fruit in fruits:
    print(fruit)
# %%
long_range = range(100000)
long_list = list(long_range)
getsizeof(long_range)
# %%
