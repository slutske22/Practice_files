# %% RECURSION
def factorial(n):
    if n == 1:
        return n
    else:
        return n * factorial(n - 1)


# %%
result = factorial(9)
print(result)

# %% SUM DIGITS OF NUMBER


def sum_digits(n):
    if n < 10:
        return n
    else:
        all_but_last = n//10
        last = n % 10
        return sum_digits(all_but_last) + last


# %%
result = sum_digits(2121)
print(result)


# %% FIBONACCI
# Returns nth number in fibonacci sequence
def fibonacci(n):
    if n == 1:
        return 0
    elif n == 2:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)


# %%
result = fibonacci(10)
print(result)
# %% PALINDROME


def palindome(string):
    if len(string) <= 1:
        return True
    else:
        return string[0] == string[-1] and palindome(string[1:-1])


# %%
result = palindome("mom")
print(result)
# %%
result = palindome("thing")
print(result)
# %%
