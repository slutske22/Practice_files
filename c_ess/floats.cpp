#include <cstdio>

const size_t byte = 8;

int main() {
  float f;
  double df;
  long double ldf;

  printf("sizeof int8_t is %zd bits\n", sizeof(f) * byte);
  printf("sizeof int8_t is %zd bits\n", sizeof(df) * byte);
  printf("sizeof int8_t is %zd bits\n", sizeof(ldf) * byte);
};