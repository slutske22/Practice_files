#include <stdio.h>
#include <stdlib.h>

/* Generate multiple lines of output */
int main() {

  int radius;

  printf("Enter a circle radius: ");
  scanf("%d", &radius);
  /* Avoid out of range values */

  float area = radius * radius * 3.14;

  if (area > 100){
    printf("Area is greater than 100.  it is %f\n", area); 
  } else {
    printf("Area is less than 100.  it is %f\n", area); 
  }

  return 0;
}