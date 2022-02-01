#include <cstdio>

int main() {
  int i = 5;   // set initial var
  int &ir = i; // set ir as reference to i
  ir = 10;     // change value from reference
  printf("i is %d\n", i);
  // i will now be 10, as ir and i both point to same value

  return 0;
};