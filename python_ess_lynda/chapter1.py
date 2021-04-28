# %%
import platform

print(f"This is python version {platform.python_version()}")

# %%


def main():
    message()


def message():
    print(f"This is python version {platform.python_version()}")


if __name__ == "__main__":
    main()

# %% Scope
# x = 10


def check_scope():
    x = 5
    print(x)


check_scope()
print(x)

# %%  Fibonacci series
a, b = 0, 1

while b < 1000:
    print(b, end=' ', flush=True)
    a, b = b, a + b
# %% Functions always return something, even if its none


def do_me_something(n=1):
    print(n)


return_value = do_me_something(5)
print(return_value)
# %%  Ternaries
money = 10_000

action = "Party like its 1999" if money > 1000 else "Get a j-o-b foo"

print(action)

# %%  Bitwise operators

a = 0x0a
b = 0x02
bb = 0x0f
c = a & b  # result is bits that exist in both a and b
d = a | b  # result is bits that exist in both a or b
e = a ^ bb  # only if one OR the other have a bit
f = a << b
g = a >> b


def print_the_result(arg1, name1, arg2, name2, result, resultname):
    print(
        f'hex: {name1} is {arg1:02x}, {name2} is {arg2:02x}, {resultname} is {result:02x}')
    print(
        f'bin: {name1} is {arg1:08b}, \n     {name2} is {arg2:08b}, \n     {resultname} is {result:08b}')


print_the_result(a, 'a', b, 'b', c, 'c')
print()
print_the_result(a, 'a', b, 'b', d, 'd')
print()
print_the_result(a, 'a', bb, 'bb', e, 'e')
print()
print_the_result(a, 'a', b, 'b', f, 'f')
print()
print_the_result(a, 'a', b, 'b', g, 'g')
# %%
print(__name__)
# %%
