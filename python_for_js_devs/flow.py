# %%
number = int(input("Pick a number:"))

if number < 0:
    print("Dont be so negative")
elif number > 0 and number < 10:
    print("Fair enough")
elif number > 10 and number < 1_000_000:
    print("Good attitude")
else:
    print("Dont be greedy")

# %%
