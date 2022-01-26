#include <cstdio>

int main() {
  //   char cstring[] = "string"; // copy string into array
  const char *cstring = "string"
                        " another string";

  // concat two string - 'first string' ' second string';

  puts(cstring);

  for (int i = 0; cstring[i]; i++) {
    printf("%d: %c\n", i, cstring[i]);
  }
  return 0;
};