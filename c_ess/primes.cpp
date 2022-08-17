#include <cstdio>

int main() {

  for (int i = 2; i < 100; i++) {

    bool isPrime = true;

    for (int j = 2; j <= i - 1; j++) {

      if (i % j == 0) {
        isPrime = false;
      }
    }

    if (isPrime) {
      printf("%d, ", i);
    }
  }

  return 0;
}