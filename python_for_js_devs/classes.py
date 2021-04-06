# %%
class Soup:
    def __init__(self, name):
        self.name = name
        self.veggies = ["broccolo", "asparagus", "zuchinni", "onions"]

    def print_veggies(self):
        print(f"{self.name} soup with:")
        for veggie in self.veggies:
            print(f"* {veggie}")


soup_instance = Soup("Split Pea")
soup_instance.print_veggies()

# %%
