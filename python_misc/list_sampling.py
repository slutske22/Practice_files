# %%
from array import ArrayType
from random import randint
from pprint import pprint

random_order = sorted([randint(0, 1000) for n in range(24)])
snapshots = [{"time": n, "details": "some details"} for n in random_order]

pprint(snapshots)
print("\n\n")


def resample(array: ArrayType, sampling_interval: int) -> ArrayType:
  """Resamples a list of objects"""
  # make a copy of the array so as not to mutate the original
  original = array[:]

  # get max and min values of the original data
  min_value = min([snapshot["time"] for snapshot in snapshots])
  max_value = max([snapshot["time"] for snapshot in snapshots])

  #keep track of the current index
  index = min_value

  # create empty array to push sampled items into
  sampled = []

  def pop_and_compare(index):
    #pop the first item off the array and push into sampled
    currently_popped = original.pop(0)

    if (currently_popped["time"] < index):
      sampled.append(currently_popped)
      
    index = index + sampling_interval

    if index < max_value:
      pop_and_compare(index)

  pop_and_compare(index)

  return sampled

# Resampled objects
sampled_snapshots = resample(snapshots, 100)

pprint(sampled_snapshots)


# %%
