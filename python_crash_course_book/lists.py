# %%
# Establish an array / list
pets = ["Blue", "Pom Pom", "Taz", "Garfield"]
print(pets)

# %%
# Get the first item of the list
print(pets[0])

# %%
# Deletes the fourth item of the array
del pets[3]
print(pets)

# %%
# Remove the nth item of array and stores it in variable
n = 0
firstPet = pets.pop(n)
print(firstPet)

# %%
# Add an item to the end of the array
pets.append("Chunky")
print(pets)

# %%
# Insert an item in the mth position in the array
m = 2
pets.insert(m, "Tootoo")
print(pets)
