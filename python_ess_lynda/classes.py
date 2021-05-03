# %%
class Duck:
    sound = "Quack"
    movement = "Bobble"

    def quack(self):
        print(self.sound)

    def walk(self):
        print(self.movement)


donald = Duck()
donald.quack()
donald.walk()

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


leopard = Animal("Feline", "Leopard", "Roar")
husky = Animal("Kanine", "Husky", "Bark")


# def print_animal(animal):
# print(f"The {animal.name()} is a {animal.type()} and says {animal.sound()}")

leopard.sound("rrrawwwwrrr")
print(leopard)


# print_animal(husky)
# %%
