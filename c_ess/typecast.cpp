#include <cstdio>

int main() {
  int x;
  long long int y;

  x = 34737;
  y = 3498342876233534223;

  x = y;

  const char *s = "string";
  // x = s; // errors

  printf("X is %d\n", x);
  printf("y is %llu\n", y);

  return 0;
}