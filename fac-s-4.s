.cstring

PRINT_INT_FORMAT:
  .ascii "%ld\12\0"
READ_INT_FORMAT:
  .ascii "%ld\0"
ERROR_STRING:
  .ascii "runtime error\0"


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
  subq $32, %rsp
  movq $10, %rax
  movq %rax, 0(%rsp)
  callq ifac2f
  movq $0, %rax
  jmp .L0
  .L0:
  addq $32, %rsp
  popq %rbp
  retq

.globl ifac2f
ifac2f:
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
  movq $1, %rax
  movq %rax, 0(%rsp)
  callq ifac2f
  movq %rax, -16(%rbp)
  movq -16(%rbp), %rax
  jmp .L1
  .L1:
  addq $32, %rsp
  popq %rbp
  retq

