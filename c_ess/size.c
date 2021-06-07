#include <stdio.h>

int main() {
  char a;
  int b;
  float c;
  double d;
  char string[] = "Hello";
  int buffer[10];

  printf("char variable 'a' uses %lu bytes\n", sizeof(a));
  printf("char variable 'b' uses %lu bytes\n", sizeof(b));
  printf("char variable 'c' uses %lu bytes\n", sizeof(c));
  printf("char variable 'd' uses %lu bytes\n", sizeof(d));
  printf("char variable 'string' uses %lu bytes\n", sizeof(string));
  printf("char variable 'buffer' uses %lu bytes\n", sizeof(buffer));

}