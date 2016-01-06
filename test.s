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

.globl printString
printString:
  pushq %rbp
  movq %rsp, %rbp
  movq  16(%rbp), %rdi
  xorq %rax, %rax
  call _puts
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

.globl strlen
strlen:
  pushq %rbp
  movq %rsp, %rbp
  movq  16(%rbp), %rdi
  call _strlen
  popq %rbp
  retq

.globl _main
_main:
  pushq %rbp
  movq %rsp, %rbp
  subq $80, %rsp
  movq %r12, -32(%rbp)
  movq %r13, -40(%rbp)
  movq %r14, -48(%rbp)
  movq %r15, -56(%rbp)
  movq $1, %rdi
  call _malloc
  movb $97, 0(%rax)
  movq %rax, -8(%rbp)
  movq $1, %rdi
  call _malloc
  movb $98, 0(%rax)
  movq %rax, %r12
  movq -8(%rbp), %rax
  movq %r12, %r13
  movq %rax, %r12
  movq %r12, %rdi
  call _strlen
  movq %rax, %r15
  movq %r13, %rdi
  call _strlen
  movq %rax, -24(%rbp)
  addq %r15, %rax
  movq %rax, %rdi
  call _malloc
  movq %rax, %r14
  movq %r12, %rsi
  movq %r14, %rdi
  movq %r15, %rdx
  call _memcpy
  movq %r13, %rsi
  movq %r14, %rax
  addq %r15, %rax
  movq %rax, %rdi
  movq -24(%rbp), %rdx
  call _memcpy
  movq %r14, %rax
  movq %rax, -16(%rbp)
  movq -16(%rbp), %rax
  movq %rax, 0(%rsp)
  callq printString
  movq $1, %rax
  jmp .L0
  .L0:
  movq -32(%rbp), %r12
  movq -40(%rbp), %r13
  movq -48(%rbp), %r14
  movq -56(%rbp), %r15
  addq $80, %rsp
  popq %rbp
  retq

