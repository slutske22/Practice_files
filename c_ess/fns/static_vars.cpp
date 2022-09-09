#include <cstdio>

void func() {
  int i = 5;        // automatic storage, in call stack, temporary
  static int j = 5; // static storage, in main memory pool
  printf("i is %d\n", i++);
  printf("j is %d\n", j++);
}

int main() {

  puts("this is main");
  func();
  func();
  func();

  return 0;
}