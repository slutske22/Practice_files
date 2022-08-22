#include <cstdio>

void func(int *i) {
  *i = 73;
  printf("this is func, called with %d\n", *i);
}

int main() {
  int i = 42;
  func(&i);
  printf("Value after func is %d\n", i);
  return 0;
}