#include <cstdio>
#include <string>

int func(int i) {
  puts("This is func");

  return i * 2;
}

const std::string &func() {
  const std::string myString = "This is from func";
  return myString;
}

int main() {
  // puts("This is main");
  // int x = func(4);

  // printf("x is %d\n", x);

  const std::string stringFromFunc = func();
  printf("s is %s\n", stringFromFunc.c_str());

  return 0;
}