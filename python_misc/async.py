# %%
from time import sleep

async def thing():
  print("Starting wait")
  await sleep(1000)
  print("Finishing wait")

thing()
# %%
