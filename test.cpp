#include <stdio.h>

int f3 (int* a, int b, int bl){
  int c = 1;
  printf("%d %d %d", a[8], b ,bl);
  return a[0] + b + c + bl;
}

int f4 (int a, int b, int bl, int b4){
  int c = 1;
  printf("%d %d %d %d", a, b ,bl, b4);
  return a + b + c + bl + b4;
}

int main() {
  int a[10];
  a[0] = 6;
  a[8] = 8;
  int x = f3(a, 2, 3);
  return f4(5, 6, 7, x);
}