from heapq import heappop

# %% Understanding zip: create tuples from zipped lists
dxs = [-1, -1,  0,  1, 1, 1, 0, -1]
dys = [ 0, -1, -1, -1, 0, 1, 1,  1]
zipped = zip(dxs, dys)

print(list(zipped))
# %% Typings?

g: int
g = 'j' #like wtf does this mean

# %%
from heapq import heappop

stuff = list(['a', 'b', 'c', 'd'])
print(heappop(stuff), stuff)
print(heappop(stuff), stuff)
print(heappop(stuff), stuff)

# %%
