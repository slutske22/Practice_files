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
# %%
