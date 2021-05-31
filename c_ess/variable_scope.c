#include <stdio.h>

void sum(void) {
  // All variables assumed to be auto
  auto int a, b;
  a = 6, b = 88;
  printf("The sum of a, %i, and b, %i, is %i\n", a, b, a + b);
}

char *myName(void){
  static char me[] = "Seth Lutske";
  return (me);
}

int main(){
  // auto keyword
  // puts("Calling the sum function");
  // sum();

  // static keyword
  printf("Calling the myName function, which returns: %s\n", myName()); 
  return 0;
}