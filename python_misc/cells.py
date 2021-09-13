#!/usr/bin/env python3


# from https://scicomp.stackexchange.com/questions/40042/simulate-circular-mold-spread-using-cellular-automata-square-emerges-instead/40043#40043

import time
from heapq import heappop, heappush
from typing import Iterator, List, Tuple

import numpy as np
from numpy.random import exponential


def neighbours(x: int, y: int, grid: np.ndarray) -> Iterator[Tuple[int, int, float]]:
  """Generate a list of neighbour coordinates for `x,y`"""
  dxs = [-1, -1,  0,  1, 1, 1, 0, -1]
  dys = [ 0, -1, -1, -1, 0, 1, 1,  1]
  for dx, dy in zip(dxs, dys):
    nx, ny = x + dx, y + dy
    dist = 1 if (dx==0 or dy==0) else np.sqrt(2)
    if nx<0 or ny<0 or ny==grid.shape[0] or nx==grid.shape[1]:
      continue
    yield nx, ny, dist


grid = np.zeros((20, 20))
pq: List[Tuple[float, int, int]] = [] # Time, x, y
heappush(pq, (0.0, 9, 9))
print(pq)

while pq:
  t, x, y = heappop(pq)
  if grid[y,x]==1: # Already moldy
    continue
  grid[y,x] = 1 # Make it moldy
  for nx, ny, dist in neighbours(x, y, grid):
    heappush(pq, (t + dist, nx, ny))  # Circular growth
    # Enable these lines and disable above for random growth
    # Draw from exponential distribution to convert rate to interval
    # rint = exponential(dist)
    # heappush(pq, (t + rint, nx, ny))
  time.sleep(0.05)
  print("\033[2J") # Clear the screen
  print(grid)