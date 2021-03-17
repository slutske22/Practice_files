# %%
class Dog():
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        print("Woof Woof")


# %%
fido = Dog("Fido", 2)

# %%
fido.bark()
# %%
print(fido.name)
# %%
