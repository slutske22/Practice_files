#include <cstdint>
#include <cstdio>

void regularInts() {
  char c = 0;
  short int si = 0;
  int i = 0;
  long int li = 0;
  long long int lli = 0;

  printf("sizeof char is %zd bits\n", sizeof(c) * 8);
  printf("sizeof short int is %zd bits\n", sizeof(si) * 8);
  printf("sizeof int is %zd bits\n", sizeof(i) * 8);
  printf("sizeof long int is %zd bits\n", sizeof(li) * 8);
  printf("sizeof long long int is %zd bits\n", sizeof(lli) * 8);
};

void fixedSizeInts() {
  printf("sizeof int8_t is %zd bits\n", sizeof(int8_t) * 8);
  printf("sizeof int16_t is %zd bits\n", sizeof(int16_t) * 8);
  printf("sizeof int32_t is %zd bits\n", sizeof(int32_t) * 8);
  printf("sizeof int64_t is %zd bits\n", sizeof(int64_t) * 8);

  printf("sizeof uint8_t is %zd bits\n", sizeof(uint8_t) * 8);
  printf("sizeof uint16_t is %zd bits\n", sizeof(uint16_t) * 8);
  printf("sizeof uint32_t is %zd bits\n", sizeof(uint32_t) * 8);
  printf("sizeof uint64_t is %zd bits\n", sizeof(uint64_t) * 8);
};

int main() {
  fixedSizeInts();
  //   regularInts();
};