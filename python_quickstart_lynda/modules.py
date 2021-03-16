# %%
import random
import math
import calendar
cal = calendar.month(2019, 7)
print(cal)

# %%
result = math.sqrt(50)
print(result)

# %%
myRandNumber = random.randint(1, 100)
print(myRandNumber)
# %%
movies = ["Lilo and Stitch", "Dumbo", "Alladin",
          "Alice in Wonderland", "Prince of Egypt"]
myMovie = random.choice(movies)
print(myMovie)
# %%
cards = ["Ace", "Queen", "King", "Jack", "Joker", "One", "Two",
         "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]
random.shuffle(cards)
print(cards)

# %%
print(cards)
# %%
