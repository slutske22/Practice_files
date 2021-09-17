# %%
from PIL import Image

im = Image.open('sample.dem.png', 'r')
width, height = im.size
pixel_values = list(im.getdata())

# print(pixel_values)

x, y = 22, 55

r, g, b, a = pixel_values[width * y + x]

print(g)
# %%
