  .cstring
LC0:
  .ascii "%d\12\0"

.text
  .align 4
  .globl _main
_main:
LFB1:
  subq  $8, %rsp
LCFI0:
  movq  $4, %rsi
  xorq  %rax, %rax
  leaq  LC0(%rip), %rdi
  call  _printf
  xorq  %rax, %rax
  addq  $8, %rsp
  ret