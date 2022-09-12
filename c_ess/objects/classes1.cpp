#include <cstdio>

class C1 {
  int i = 0;

public:
  void setValue(int value) { i = value; }
  int getValue() { return i; }
};

// Alternatively:
// Separating implementation from the declaration
void C1::setValue(int value) { i = value; }
int C1::getValue() { return i; }

int main() {
  int i = 47;
  C1 o1;

  o1.setValue(i);
  printf("Value is %d\n", o1.getValue());
  return 0;
}