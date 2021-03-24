# %%
MY_NAME = "Blue Ohana"

greet = f"Hey, {MY_NAME}!"
formal_greet = greet.replace("Hey", "Greetings")

string_contains_name = MY_NAME in greet  # true

starts_with_hi = greet.startswith("Hi")
ends_with_hi = greet.endswith("Hi")

print("greet:                ", greet)
print("formal_greet:         ", formal_greet)
print("string_contains_name: ", string_contains_name)
print("starts_with_hi:       ", starts_with_hi)
print("ends_with_hi:         ", ends_with_hi)


# %%
