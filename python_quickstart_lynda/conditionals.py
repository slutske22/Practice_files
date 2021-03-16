# %%
raining = input("Is it raining outside? (yes/no)")
if raining == 'yes':
    print("You need an umbrella")

# %%
userInput = input("Choose and integer between -10 and 10")
n = int(userInput)
if n >= -10 & n <= 10:
    print("Good Job")

# %%


def minimum(x, y):
    if x < y:
        return x
    else:
        return y


# %%
minimum(2, 5)
# %%
minimum(4, 2)
# %%
minimum(4, 4)
# %%
minimum(3, 3.1)
# %%
# if-elif statements

raining = input("Is it raining? (yes/no)")
umbrella = input("Do you have an umbrella? (yes/no)")

if raining == 'yes' and umbrella == 'yes':
    print("Don't forget your umbrella")
elif raining == 'yes' and umbrella == 'no':
    print("Wear a waterproof jacket with a hood")
else:
    print("Netflix and chill")

# %%
x = input("Enter a number here: ")
x = float(x)
if x < 2:
    print("The number is less than 2")
elif x > 100:
    print("The number is greater than 100")
elif x > 6:
    print("The number is greater than 6")
else:
    print("The number is between 2 and 6 inclusive")

# %%


def abs_val(num):
    if num < 0:
        return -num
    elif num == 0:
        return 0
    else:
        return num


# %%
result = abs_val(-4)
print(result)
# %%
