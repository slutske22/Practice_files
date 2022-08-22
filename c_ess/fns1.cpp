#include <cstdio>

// Source variable stays the same even after changing in callback:

// void func(int i) {
//   i = 73;
//   printf("this is func, called with %d\n", i);
// }

// int main() {
//   int i = 42;
//   func(i);
//   printf("Value after func is %d\n", i);
//   return 0;
// }

// Source variable reference passed to callback, so initial i is changed

void func(int &i) {
  i = 73;
  printf("this is func, called with %d\n", i);
}

// void func2(const int &i) {
//   i = 73; //  use of `const` disallows updating value
//   printf("this is func, called with %d\n", i);
// }

int main() {
  int i = 42;
  func(i);
  printf("Value after func is %d\n", i);
  return 0;
}