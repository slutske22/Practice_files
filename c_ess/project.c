#include <stdio.h>
#include <stdlib.h>

/* Generate multiple lines of output */
int main() {

  int rows;
  int a;
  int e;
  int c;

  /* Process input */
  printf("Enter a value between 0 and 18: ");
  scanf("%d", &rows);
  /* Avoid out of range values */
  if (rows > 18){
    rows = 18;
  }

  /* process rows */
  for (a = 0; a < rows; a++){
    if (a % 2){
      for (e = 0; e < 40; e ++){
        putchar('=');
      }
      putchar('\n');
    } else {
      for (c = 'A'; c <= 'J'; c++){
        printf(" %d%c ", a, c);
      }
      putchar('\n');
    }
  }

  return 0;
}