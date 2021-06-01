#include <stdio.h>
#include <stdlib.h>

/* Generate multiple lines of output */
int main() {

  int rows;

  /* Process input */
  printf("Enter a value between 0 and 18: ");
  scanf("%d", &rows);
  /* Avoid out of range values */

  /* process rows */
  printf("The computer will process %i rows\n", rows);

  return 0;
}