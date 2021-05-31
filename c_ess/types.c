#include <stdio.h>
#include <stdlib.h>

char c = 'C';
int myInt = 8;
float myFloat = 9.01;
double myDouble = 909090.002;

int main() {
  printf("The vaue of c is %c\n", c);
  printf("The vaue of myInt is %d\n", myInt);
  printf("The vaue of myFloat is %f\n", myFloat);
  printf("The vaue of myDouble is %.2f\n", myDouble);

  return 0;
}