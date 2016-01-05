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
  movq -8(%rbp), %rax
  movq %rax, %rdx
  movq $0, %rax
  cmpq %rdx, %rax
  jl .L2
  movq $1, %rax
  jmp .L3
.L2:
  movq $0, %rax
.L3:
  cmpq  $0, %rax
  jne .L1
  movq -8(%rbp), %rax
  movq %rax, %rdx
  movq -16(%rbp), %rax
  imulq %rdx, %rax
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
  addq $48, %rsp
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
.L4:
  movq -16(%rbp), %rax
  movq %rax, %rdx
  movq $0, %rax
  cmpq %rdx, %rax
  jl .L6
  movq $1, %rax
  jmp .L7
.L6:
  movq $0, %rax
.L7:
  cmpq  $0, %rax
  jne .L5
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
  jmp .L4
.L5:
  movq -8(%rbp), %rax
  addq $16, %rsp
  popq %rbp
  retq

.globl rfac
rfac:
  pushq %rbp
  movq %rsp, %rbp
  subq $16, %rsp
  movq 16(%rbp), %rax
  movq %rax, %rdx
  movq $0, %rax
  cmpq %rdx, %rax
  je .L10
  movq $1, %rax
  jmp .L11
.L10:
  movq $0, %rax
.L11:
  cmpq  $0, %rax
  jne .L8
  movq $1, %rax
  movq %rax, %rdx
  movq 16(%rbp), %rax
  subq %rdx, %rax
  movq %rax, 0(%rsp)
  callq rfac
  movq %rax, %rdx
  movq 16(%rbp), %rax
  imulq %rdx, %rax
  jmp .L9
.L8:
  movq $1, %rax
.L9:
  addq $16, %rsp
  popq %rbp
  retq

.globl mfac
mfac:
  pushq %rbp
  movq %rsp, %rbp
  subq $16, %rsp
  movq 16(%rbp), %rax
  movq %rax, %rdx
  movq $0, %rax
  cmpq %rdx, %rax
  je .L14
  movq $1, %rax
  jmp .L15
.L14:
  movq $0, %rax
.L15:
  cmpq  $0, %rax
  jne .L12
  movq $1, %rax
  movq %rax, %rdx
  movq 16(%rbp), %rax
  subq %rdx, %rax
  movq %rax, 0(%rsp)
  callq nfac
  movq %rax, %rdx
  movq 16(%rbp), %rax
  imulq %rdx, %rax
  jmp .L13
.L12:
  movq $1, %rax
.L13:
  addq $16, %rsp
  popq %rbp
  retq

.globl nfac
nfac:
  pushq %rbp
  movq %rsp, %rbp
  subq $16, %rsp
  movq 16(%rbp), %rax
  movq %rax, %rdx
  movq $0, %rax
  cmpq %rdx, %rax
  jne .L18
  movq $1, %rax
  jmp .L19
.L18:
  movq $0, %rax
.L19:
  cmpq  $0, %rax
  jne .L16
  movq $1, %rax
  jmp .L17
.L16:
  movq 16(%rbp), %rax
  movq %rax, %rdx
  movq $1, %rax
  movq %rax, %rdx
  movq 16(%rbp), %rax
  subq %rdx, %rax
  movq %rax, 0(%rsp)
  callq mfac
  imulq %rdx, %rax
.L17:
  addq $16, %rsp
  popq %rbp
  retq

.globl ifac
ifac:
  pushq %rbp
  movq %rsp, %rbp
  subq $16, %rsp
  movq $1, %rax
  movq %rax, 0(%rsp)
  movq 16(%rbp), %rax
  movq %rax, 8(%rsp)
  callq ifac2f
  addq $16, %rsp
  popq %rbp
  retq

.globl ifac2f
ifac2f:
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
  movq 16(%rbp), %rax
  movq %rax, %rdx
  movq 24(%rbp), %rax
  cmpq %rdx, %rax
  je .L22
  movq $1, %rax
  jmp .L23
.L22:
  movq $0, %rax
.L23:
  cmpq  $0, %rax
  jne .L20
  jmp .L21
.L20:
  movq 16(%rbp), %rax
.L21:
  movq 16(%rbp), %rax
  movq %rax, %rdx
  movq 24(%rbp), %rax
  cmpq %rdx, %rax
  jl .L26
  movq $1, %rax
  jmp .L27
.L26:
  movq $0, %rax
.L27:
  cmpq  $0, %rax
  jne .L24
  jmp .L25
.L24:
  movq $1, %rax
.L25:
  movq $2, %rax
  movq %rax, %rdx
  movq 24(%rbp), %rax
  movq %rax, %rdx
  movq 16(%rbp), %rax
  addq %rdx, %rax
  idivq %rdx
  movq %rax, -8(%rbp)
  movq $1, %rax
  movq %rax, %rdx
  movq -8(%rbp), %rax
  addq %rdx, %rax
  movq %rax, 0(%rsp)
  movq 24(%rbp), %rax
  movq %rax, 8(%rsp)
  callq ifac2f
  movq %rax, %rdx
  movq 16(%rbp), %rax
  movq %rax, 0(%rsp)
  movq -8(%rbp), %rax
  movq %rax, 8(%rsp)
  callq ifac2f
  imulq %rdx, %rax
  addq $32, %rsp
  popq %rbp
  retq

