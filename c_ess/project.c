#include <stdio.h>
#include <stdlib.h>

/* Generate multiple lines of output */
int main() {

  int rows;
  int a;

  /* Process input */
  printf("Enter a value between 0 and 18: ");
  scanf("%d", &rows);
  /* Avoid out of range values */
  if (rows > 18){
    rows = 18;
  }

  /* process rows */
  printf("The computer will process %i rows\n", rows);
  a = rows >> 1;
  printf("%d is half of %d\n", a, rows);
  a = rows << 1;
  printf("%d is double %d\n", a, rows);

  return 0;
}