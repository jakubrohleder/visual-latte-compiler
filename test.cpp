#include <cstdlib>
#include <cstdio>
#include <cstring>

int main() {
  char *a = (char *) std::malloc(6 * sizeof(char));
    a[0] = 'a';
    a[1] = 'b';
    a[2] = 'c';
    a[3] = 'c';
    a[4] = 'c';
    a[5] = '1';
  char *b = (char *) std::malloc(7 * sizeof(char));
    b[0] = 'a';
    b[1] = 'b';
    b[2] = 'c';
    b[3] = 'c';
    b[4] = 'c';
    b[5] = 'c';
    b[6] = '2';

  char *c = (char *) std::malloc(13 * sizeof(char));
  memcpy(c, a, 6);
  memcpy(c + 6, b, 7);


  printf("%s\n", c);
  free(a);
  return 0;
}
