# %%
def main():
    kitten(5)


def kitten(a):
    print("Meow.")
    print(a)


if __name__ == "__main__":
    main()
# %%


def main():
    x = ('meow', 'grrr', 'prrrr')
    kitten(*x)


def kitten(*args):
    if len(args):
        for s in args:
            print(s)
    else:
        print("Meow.")


if __name__ == "__main__":
    main()
# %%


def main():
    kitten(Buffy="meow", Zilla="grrrrr", Angel="prrrr")


def kitten(**kwargs):
    if len(kwargs):
        for s in kwargs:
            print(f"Kitten {s} says {kwargs[s]}")
    else:
        print("Meow.")


if __name__ == "__main__":
    main()

# %%
