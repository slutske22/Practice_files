# %% Open a file print it line by line
f = open('sample_file.txt')  # file object is iterator
for line in f:
    print(line.rstrip())

# %% Other ways to open files

# read mode, default
# f = open('sample_file.txt', 'r')

# write mode, completely empties and overwrites
# f = open('sample_new_file.txt', 'w')

# append mode, adds to end of file
# f = open('sample_file.txt', 'a')

# %% Text
infile = open('sample_file.txt', 'rt')
outfile = open('sample_file_copy.txt', 'wt')

for line in infile:
    print(f'{line.rstrip()} yuppp', file=outfile)
    outfile.writelines(line)
    print('. ', end='', flush=True)
outfile.close()
print('\n\nDone.')

# %% Binary files

imagefile = open('blue.jpg', 'rb')  # rb = read binary
outfile = open('blue-copy.jpg', 'wb')  # wb = write binary
while True:
    buf = imagefile.read(10240)
    if buf:
        outfile.write(buf)
        print('.', end='', flush=True)
    else:
        break
outfile.close()
print('\n\nDone.')

# %%
