# %%
import sys


def thing1():
    try:
        x = int('kk')
    except ValueError:
        print(f"Nope! {sys.exc_info()[1]}")


def thing2():
    raise TypeError(f'This is a custom error')


thing2()

# %%
