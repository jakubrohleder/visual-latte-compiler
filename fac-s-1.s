.cstring

PRINT_INT_FORMAT:
  .ascii "%d\12\0"
READ_INT_FORMAT:
  .ascii "%d\0"
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
  callq fac
  movq %rax, 0(%rsp)
  callq printInt
  movq $0, %rax
  addq $32, %rsp
  popq %rbp
  retq

.globl fac
fac:
  pushq %rbp
  movq %rsp, %rbp
  subq $16, %rsp
  movq $1, %rax
  movq %rax, -8(%rbp)
  movq 16(%rbp), %rax
  movq %rax, -16(%rbp)
.L0:
  movq $0, %rax
  movq %rax, %rdx
  movq -16(%rbp), %rax
  cmpq %rdx, %rax
  jg .L2
  movq $0, %rax
  jmp .L3
.L2:
  movq $1, %rax
.L3:
  cmpq  $0, %rax
  je .L1
  movq -16(%rbp), %rax
  movq %rax, %rdx
  movq -8(%rbp), %rax
  imulq %rdx, %rax
  movq %rax, -8(%rbp)
  movq $1, %rax
  movq %rax, %rdx
  movq -16(%rbp), %rax
  subq %rdx, %rax
  movq %rax, -16(%rbp)
  jmp .L0
.L1:
  movq -8(%rbp), %rax
  addq $16, %rsp
  popq %rbp
  retq

