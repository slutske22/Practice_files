# %%
import time


class VeggieMixin:
    veggies = ["tomatoes", "onion", "lentils"]


class SoupMixin:
    temperature = "199.4 F"
    water_percentage = 50
    cooking_time = 5


class SaladMixin:
    temperature = "41.4 F"
    water_percentage = 0
    cooking_time = 0


class FoodMixin:
    def make_food(self):
        time.sleep(self.cooking_time)
        print("Lunch's ready!")
        print(self.water_percentage, " percent water")
        print(self.temperature)


class VeggieSoup(VeggieMixin, SoupMixin, FoodMixin):
    pass


class VeggieSalad(VeggieMixin, SaladMixin, FoodMixin):
    pass


VeggieSalad().make_food()


VeggieSoup().make_food()


# %%
