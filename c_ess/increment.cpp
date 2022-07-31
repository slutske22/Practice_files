#include <cstdio>
#include <cstdint>

void printp(uint16_t *p) {
  printf("Pointer is %p, value is %d\n", p, *p);
}

int main() {
  uint16_t arr[5] = { 1, 2, 3, 4, 5 };
  uint16_t *p = arr;
  printp(p++);
  printp(p++);
  printp(p++);

  return 0;
}