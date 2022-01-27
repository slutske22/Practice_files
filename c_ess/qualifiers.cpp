#include <cstdio>

class S {
public:
  int static_value() {
    static int x = 7;
    return ++x;
  }
};

int func() {
  static int x = 7;
  return ++x;
}

int main() {
  S s1;
  S s2;
  S s3;
  printf("The integer is %d\n", s1.static_value());
  printf("The integer is %d\n", s2.static_value());
  printf("The integer is %d\n", s3.static_value());
  printf("The integer is %d\n", func());
  printf("The integer is %d\n", func());

  return 0;
}