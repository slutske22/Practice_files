#include <cstdio>

int main(){
  int x = 55;
  int y = 42;

  const char * s = x > 7 ? "yes": "no";

  puts(s);

  return 0;
}