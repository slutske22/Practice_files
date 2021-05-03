# %%


class Animal:
    # __init__ is like constructor()
    def __init__(self, **kwargs):
        if 'type' in kwargs:
            self._type = kwargs["type"]
        if 'name' in kwargs:
            self._name = kwargs["name"]
        if 'sound' in kwargs:
            self._sound = kwargs["sound"]

    def type(self, t=None):
        if t:
            self._type = t
        try:
            return self._type
        except AttributeError:
            return None

    def name(self, n=None):
        if n:
            self._name = n
        try:
            return self._name
        except AttributeError:
            return None

    def sound(self, s=None):
        if s:
            self._sound = s
        try:
            return self._sound
        except AttributeError:
            return None

    def __str__(self):
        return f"The {self._type} is named {self._name} and says {self._sound}"

# %%


class Duck(Animal):
    def __init__(self, **kwargs):
        self._type = "duck"
        if "type" in kwargs:
            del kwargs["type"]
        super().__init__(**kwargs)


class BigCat(Animal):
    def __init__(self, **kwargs):
        self._type = "Big cat"
        if "type" in kwargs:
            del kwargs["type"]
        super().__init__(**kwargs)

    def kill(self, s):
        print(f"{self.name()} will now kill all {s}!")


# donald = Duck(name="donald", sound="heyyy")
kitten = BigCat(name='cheeta', sound="roarrrr")
print(kitten.kill('humans'))
# %%
