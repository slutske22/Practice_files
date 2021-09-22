# %% Decorator function

def decorator_function(original_function):
  def wrapper_function(*args, **kwargs):
    print("Decorator functon ran")
    original_function(*args, **kwargs)
  return wrapper_function

@decorator_function
def display(message):
  print(f"{message} Display function ran")

display("message")






# %% Decorator class

class DecoratorClass(object):
  def __init__(self, original_function):
    self.original_function = original_function

  def __call__(self, *args, **kwargs):
    print("Decorator class function ran")
    self.original_function(*args, **kwargs)

@DecoratorClass
def display_info(name, age):
  print(f"{name} is {age} years old")

display_info("Booboo", 2)





# %% Decorator example - logger

def my_logger(original_function):
  import logging
  logging.basicConfig(
    filename=f'{original_function.__name__}.log', level=logging.INFO
  )

  def wrapper(*args, **kwargs):
    logging.info(
      f"Ran with args {args} and kwargs {kwargs}"
    )
    return original_function(*args, **kwargs)

  return wrapper

@my_logger
def say_something(something, another_thing):
  print(something, another_thing)

say_something("Hello", "Nice to meet you")






# %% Decorator example - timer function
def timer(original_funtion):
  import time

  def wrapper(*args, **kwargs):
    t1 = time.time()
    results = original_funtion(*args, **kwargs)
    t2 = time.time() - t1

    print(f"{original_funtion.__name__} ran in {t2}")
    return results

  return wrapper

@timer
def long_runner():
  for i in range(10000):
    l = i**i

long_runner()

@timer
def say_something(something, another_thing):
  print(something, another_thing)

# say_something("Hello", "Nice to meet you")
# %%
