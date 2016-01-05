.cstring

PRINT_INT_FORMAT:
  .ascii "%d
 "
READ_INT_FORMAT:
  .ascii "%d\0"
ERROR_STRING:
  .ascii "runtime error\n\12\0"


.text

.globl error
error:

.globl printInt
.align 4
printInt:
  pushq %rbp
  movq %rsp, %rbp
  movq  16(%rbp), %rsi
  xorq %rax, %rax
  leaq PRINT_INT_FORMAT(%rip), %rdi
  call _printf
  xorq %rax, %rax
  popq %rbp
  retq

.globl readInt
.align 4, 0x90
readInt:

.globl _main
.align 4, 0x90
_main:
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
  movq $10, %rax
  movq %rax, 0(%rsp)
  callq printInt
  movq $1, %rax
  addq $32, %rsp
  popq %rbp
  retq

