#include <cstdio>
#include <new>

const long int count = 1024000000000000;

int main() {
  printf("Allocate space for %lu long nt at *ip with new\n", count);

  // allocate array
  long int *ip;
  // try {
  //   ip = new long int[count];
  // } catch (std::bad_alloc &ba) {
  //   fprintf(stderr, "Cannot allocate memory (%s)\n", ba.what());
  //   return 1;
  // }

  ip = new (std::nothrow) long int[count];
  if (!ip) {
    fprintf(stderr, "Cannot allocate memory (%s)\n");
    return 1;
  }

  // initialize array
  for (long int i = 0; i < count; i++) {
    ip[i] = i;
  }

  // deallocate array
  delete[] ip;
  puts("Space at *ip deleted");

  return 0;
}