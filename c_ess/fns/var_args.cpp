#include <cstdarg>
#include <cstdio>

// first ar
double average(const int count, ...) {
  va_list ap;
  int i;
  double total = 0.0;

  va_start(ap, count);
  for (i = 0; i < count; ++i) {
    total += va_arg(ap, double);
  }

  va_end(ap);
  return total / count;
}

int message(const char *fmt, ...) {
  va_list ap;
  va_start(ap, fmt);
  int rc = vfprintf(stdout, fmt, ap);
  puts("");
  va_end(ap);
  return rc;
}

int main() {
  message("This is a message");
  message("Avarege: %lf", average(5, 5.0, 7.0, 9.0, 12.0, 34.0));
  return 0;
}