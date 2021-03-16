# Tuples are read only

# %%
child1_birth = (
    'Julia',
    'SDMC',
    'San Diego',
    'California',
    'USA',
    '07/23/1990',
    '09:42'
)

# %%
child2_birth = (
    'Hector',
    'Scripps Chula Vista',
    'Chula Vista',
    'California',
    'USA',
    '04/23/1996',
    '011:02'
)

# %%
print(child1_birth)
# %%
print(child1_birth[0])
# %%
type(child1_birth)

# %%
# Will throw error bc tuples are read only
child1_birth[0] = 'Barbara'
# %%
