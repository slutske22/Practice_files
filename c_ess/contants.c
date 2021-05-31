#include <stdio.h>
#include <stdlib.h>
#define GLOBAL_CONSTANT_AVAILABLE_EVERYWHERE 50


int main() {
  const int mini_constant_only_available_in_function = 8080;
  // mini_constant_only_available_in_function = 9; // <--- Error!

  printf("My global constant is %i\n", GLOBAL_CONSTANT_AVAILABLE_EVERYWHERE);
  printf("My local constants is %i\n", mini_constant_only_available_in_function);

  return 0;
}