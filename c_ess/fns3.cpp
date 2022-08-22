#include <cstdio>
#include <string>

void func(const std::string &s) {
  printf("this is func, called with %s\n", s.c_str());
}

int main() {

  std::string s = "This is a string";

  func(s);
  return 0;
}