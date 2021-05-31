#include <stdio.h>
#include <time.h>

// int main() {
//   time_t now; // custom type from time module / headerfile

//   time(&now);
//   printf("%s", ctime(&now));

//   return(0);
// }


typedef float radius;

int main(){
  radius a = 2.75;
  printf("A circle with a radius %.2f has an area of %.2f\n", a,  a*a*3.14);
}