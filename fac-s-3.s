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
  callq nfac
  movq %rax, 0(%rsp)
  callq printInt
  movq $0, %rax
  addq $32, %rsp
  popq %rbp
  retq

.globl nfac
nfac:
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
  movq %r12, -16(%rbp)
  movq %r13, -24(%rbp)
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
  movq $0, %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
  cmpq %r12, %rax
  jne .L2
  movq $0, %rax
  jmp .L3
.L2:
  movq $1, %rax
.L3:
  cmpq  $0, %rax
  jne .L0
  movq $1, %rax
  jmp .L1
.L0:
  movq -8(%rbp), %rax
  movq %rax, %r12
  movq $1, %rax
  movq %rax, %r13
  movq -8(%rbp), %rax
  subq %r13, %rax
  movq %rax, 0(%rsp)
  callq nfac
  imulq %r12, %rax
.L1:
  movq -16(%rbp), %r12
  movq -24(%rbp), %r13
  addq $32, %rsp
  popq %rbp
  retq

