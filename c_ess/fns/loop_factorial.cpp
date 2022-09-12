#include <cstdio>

unsigned long int factorial(unsigned long int n) {
  int i = n;
  int result = 1;

  for (i = n; i > 1; i--) {
    result = result * i;
  }

  return result;
}

int main() {

  unsigned long int n = 5;

  printf("The factorial of %ld if %ld", n, factorial(n));
  return 0;
}