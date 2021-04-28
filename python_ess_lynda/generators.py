# %%
def main(*args):
    for i in inclusive_range(*args):
        print(i, end=" ")
    print()


def inclusive_range(*args):
    n = len(args)
    start = 0
    step = 1

    # init params
    if n < 1:
        raise TypeError(f'Expected at least 1 argument, got {n}')
    elif n == 1:
        stop = args[0]
    elif n == 2:
        (start, stop) = args
    elif n == 3:
        (start, stop, step) = args
    else:
        raise TypeError(f"expected at most 3 arguments, got {n}")

    # generator
    i = start
    while i <= stop:
        yield i
        i += step


if __name__ == "__main__":
    main(25)
    main(25, 50)
    main(25, 50, 5)

# %%
