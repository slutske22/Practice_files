#include <stdio.h>
#include <stdlib.h>

void line(void){
  int n;
  for (n = 0; n < 40; n++){
    putchar('-');
  }
  putchar('\n');
}

char randchar(){
  char c;

  c = rand() % 26;
  c += 'A';
  return c;
}


int main() {
  line();
  printf("I am the main function\n");
  line();
  printf("The result of the randchar function is %c\n", randchar());
  return 0;
}