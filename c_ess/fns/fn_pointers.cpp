#include <cstdio>

void func() { puts("This is func"); }

int main() {
  puts("this is main");
  void (*pfunc)() = func;

  (*pfunc)(); // recommended
  pfunc();    // not recommended

  return 0;
}