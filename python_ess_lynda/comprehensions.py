# %%

# Generate initial list
from math import pi
seq = list(range(11))

# Map like arr.map(x => x * 2)
sequence2 = [x * 2 for x in seq]

# Filter like arr.filter(x => x % 3 === 0)
sequence3 = [x for x in seq if x % 3 == 0]

# Map like arr.map(x => [x, x^2])
sequence4 = [(x, x**2) for x in seq]

# Map like arr.map(x => parseFloat(Math.PI.toFixed(x)))
sequence5 = [round(pi, i) for i in seq]

# Transform like arr.forEach(x => {}[x] = x^2)
sequence6 = {x: x**2 for x in seq}

# Transform like new Set('superduper'.split(""))
sequence7 = {x for x in 'superduper'}


print(sequence7)

# %%
