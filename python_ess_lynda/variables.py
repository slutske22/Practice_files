# %%


class Animal:
    # __init__ is like constructor()
    def __init__(self, type, name, sound):
        self._type = type
        self._name = name
        self._sound = sound

    def type(self, t=None):
        if t:
            self._type = t
        return self._type

    def name(self, n=None):
        if n:
            self._name = n
        return self._name

    def sound(self, s=None):
        if s:
            self._sound = s
        return self._sound

    def __str__(self):
        return f"The {self._type} is named {self._name} and says {self._sound}"

    # class variable
    x = [1, 2, 3]


# %%
leopard = Animal("Feline", "Leopard", "Roar")
husky = Animal("Kanine", "Husky", "Bark")

# Modifying the object's property
# The ._sound variable is 'encapsulated'
leopard._sound = "jjjrrrrrr"  # bad idea
leopard.sound("rrrawwwwrrr")  # good idea

# Modifying class variable, which is NOT encapsulated
print(leopard.x)
leopard.x[0] = 7

# Even though you changed it from the leopard instance, its changed everywhere on the class, so husky's .x value also changes
print(husky.x)

# %%
