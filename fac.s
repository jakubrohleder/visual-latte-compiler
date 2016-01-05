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
  subq $48, %rsp
  movq %r12, -24(%rbp)
  movq $10, %rax
  movq %rax, 0(%rsp)
  callq fac
  movq %rax, 0(%rsp)
  callq printInt
  movq $10, %rax
  movq %rax, 0(%rsp)
  callq rfac
  movq %rax, 0(%rsp)
  callq printInt
  movq $10, %rax
  movq %rax, 0(%rsp)
  callq mfac
  movq %rax, 0(%rsp)
  callq printInt
  movq $10, %rax
  movq %rax, 0(%rsp)
  callq ifac
  movq %rax, 0(%rsp)
  callq printInt
  movq $10, %rax
  movq %rax, -8(%rbp)
  movq $1, %rax
  movq %rax, -16(%rbp)
.L0:
  movq $0, %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
  cmpq %r12, %rax
  jg .L2
  movq $0, %rax
  jmp .L3
.L2:
  movq $1, %rax
.L3:
  cmpq  $0, %rax
  je .L1
  movq -8(%rbp), %rax
  movq %rax, %r12
  movq -16(%rbp), %rax
  imulq %r12, %rax
  movq %rax, -16(%rbp)
  movq -8(%rbp), %rax
  decq %rax
  movq %rax, -8(%rbp)
  jmp .L0
.L1:
  movq -16(%rbp), %rax
  movq %rax, 0(%rsp)
  callq printInt
  movq $0, %rax
  movq -24(%rbp), %r12
  addq $48, %rsp
  popq %rbp
  retq

.globl fac
fac:
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
  movq %r12, -32(%rbp)
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
  movq $1, %rax
  movq %rax, -16(%rbp)
  movq -8(%rbp), %rax
  movq %rax, -24(%rbp)
.L4:
  movq $0, %rax
  movq %rax, %r12
  movq -24(%rbp), %rax
  cmpq %r12, %rax
  jg .L6
  movq $0, %rax
  jmp .L7
.L6:
  movq $1, %rax
.L7:
  cmpq  $0, %rax
  je .L5
  movq -24(%rbp), %rax
  movq %rax, %r12
  movq -16(%rbp), %rax
  imulq %r12, %rax
  movq %rax, -16(%rbp)
  movq $1, %rax
  movq %rax, %r12
  movq -24(%rbp), %rax
  subq %r12, %rax
  movq %rax, -24(%rbp)
  jmp .L4
.L5:
  movq -16(%rbp), %rax
  movq -32(%rbp), %r12
  addq $32, %rsp
  popq %rbp
  retq

.globl rfac
rfac:
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
  movq %r12, -16(%rbp)
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
  movq $0, %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
  cmpq %r12, %rax
  je .L10
  movq $0, %rax
  jmp .L11
.L10:
  movq $1, %rax
.L11:
  cmpq  $0, %rax
  jne .L8
  movq $1, %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
  subq %r12, %rax
  movq %rax, 0(%rsp)
  callq rfac
  movq %rax, %r12
  movq -8(%rbp), %rax
  imulq %r12, %rax
  jmp .L9
.L8:
  movq $1, %rax
.L9:
  movq -16(%rbp), %r12
  addq $32, %rsp
  popq %rbp
  retq

.globl mfac
mfac:
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
  movq %r12, -16(%rbp)
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
  movq $0, %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
  cmpq %r12, %rax
  je .L14
  movq $0, %rax
  jmp .L15
.L14:
  movq $1, %rax
.L15:
  cmpq  $0, %rax
  jne .L12
  movq $1, %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
  subq %r12, %rax
  movq %rax, 0(%rsp)
  callq nfac
  movq %rax, %r12
  movq -8(%rbp), %rax
  imulq %r12, %rax
  jmp .L13
.L12:
  movq $1, %rax
.L13:
  movq -16(%rbp), %r12
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
  jne .L18
  movq $0, %rax
  jmp .L19
.L18:
  movq $1, %rax
.L19:
  cmpq  $0, %rax
  jne .L16
  movq $1, %rax
  jmp .L17
.L16:
  movq -8(%rbp), %rax
  movq %rax, %r12
  movq $1, %rax
  movq %rax, %r13
  movq -8(%rbp), %rax
  subq %r13, %rax
  movq %rax, 0(%rsp)
  callq mfac
  imulq %r12, %rax
.L17:
  movq -16(%rbp), %r12
  movq -24(%rbp), %r13
  addq $32, %rsp
  popq %rbp
  retq

.globl ifac
ifac:
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
  movq $1, %rax
  movq %rax, 0(%rsp)
  movq -8(%rbp), %rax
  movq %rax, 8(%rsp)
  callq ifac2f
  addq $32, %rsp
  popq %rbp
  retq

.globl ifac2f
ifac2f:
  pushq %rbp
  movq %rsp, %rbp
  subq $64, %rsp
  movq %r12, -32(%rbp)
  movq %r13, -40(%rbp)
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
  movq 24(%rbp), %rax
  movq %rax, -16(%rbp)
  movq -16(%rbp), %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
  cmpq %r12, %rax
  je .L22
  movq $0, %rax
  jmp .L23
.L22:
  movq $1, %rax
.L23:
  cmpq  $0, %rax
  jne .L20
  jmp .L21
.L20:
  movq -8(%rbp), %rax
.L21:
  movq -16(%rbp), %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
  cmpq %r12, %rax
  jg .L26
  movq $0, %rax
  jmp .L27
.L26:
  movq $1, %rax
.L27:
  cmpq  $0, %rax
  jne .L24
  jmp .L25
.L24:
  movq $1, %rax
.L25:
  movq $2, %rax
  movq %rax, %r12
  movq -16(%rbp), %rax
  movq %rax, %r13
  movq -8(%rbp), %rax
  addq %r13, %rax
  idivq %r12
  movq %rax, -24(%rbp)
  movq $1, %rax
  movq %rax, %r12
  movq -24(%rbp), %rax
  addq %r12, %rax
  movq %rax, 0(%rsp)
  movq -16(%rbp), %rax
  movq %rax, 8(%rsp)
  callq ifac2f
  movq %rax, %r12
  movq -8(%rbp), %rax
  movq %rax, 0(%rsp)
  movq -24(%rbp), %rax
  movq %rax, 8(%rsp)
  callq ifac2f
  imulq %r12, %rax
  movq -32(%rbp), %r12
  movq -40(%rbp), %r13
  addq $64, %rsp
  popq %rbp
  retq

