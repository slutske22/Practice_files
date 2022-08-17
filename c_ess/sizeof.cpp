#include <cstdio>

int main() {
  int x = 500;
  size_t y = sizeof(x);

  struct X {
    int a;
    int b;
    char c;
    char d;
    long int e;
    long int f;
  };

  printf("size of x is %zd\n", y * 8);
  printf("size of X struct is %zd\n", sizeof(X) * 8);

  return 0;
}