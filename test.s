.cstring

PRINT_INT_FORMAT:
  .ascii "%d\12\0"
READ_INT_FORMAT:
  .ascii "%d\0"
ERROR_STRING:
  .ascii "runtime error "


.text

.globl error
error:

.globl printInt
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
readInt:
  pushq %rbp
  movq %rsp, %rbp
  subq  $16, %rsp
  movq %rsp, %rsi
  xorq %rax, %rax
  leaq READ_INT_FORMAT(%rip), %rdi
  call _scanf
  movq (%rsp), %rax
  addq  $16, %rsp
  popq %rbp
  retq

.globl _main
_main:
  pushq %rbp
  movq %rsp, %rbp
  subq $48, %rsp
  movq $10, %rax
  movq %rax, %rdx
  movq $20, %rax
  imulq %rdx, %rax
  movq %rax, -8(%rbp)
  callq readInt
  movq %rax, -16(%rbp)
  movq -8(%rbp), %rax
  movq %rax, %rdx
  movq -16(%rbp), %rax
  addq %rdx, %rax
  movq %rax, 0(%rsp)
  callq printInt
  movq $1, %rax
  addq $48, %rsp
  popq %rbp
  retq

