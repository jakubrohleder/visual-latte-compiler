.cstring

#---Format strings start
PRINT_INT_FORMAT:
  .ascii "%ld\12\0"
READ_INT_FORMAT:
  .ascii "%ld\0"
ERROR_STRING:
  .ascii "runtime error\0"
#---Format strings end


.text

.globl error
error:
#---Error function body start
#---Error function body end

.globl printInt
printInt:
#---PrintInt function body start
  pushq %rbp
  movq %rsp, %rbp
  movq  16(%rbp), %rsi
  xorq %rax, %rax
  leaq PRINT_INT_FORMAT(%rip), %rdi
  call _printf
  xorq %rax, %rax
  popq %rbp
  retq
#---PrintInt function body end

.globl printString
printString:
#---PrintString function body start
  pushq %rbp
  movq %rsp, %rbp
  movq  16(%rbp), %rdi
  xorq %rax, %rax
  call _puts
  popq %rbp
  retq
#---PrintString function body end

.globl readInt
readInt:
#---ReadInt function body start
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
#---ReadInt function body end

.globl strlen
strlen:
#---Strlen function body start
  pushq %rbp
  movq %rsp, %rbp
  movq  16(%rbp), %rdi
  call _strlen
  popq %rbp
  retq
#---Strlen function body end

.globl _main
_main:
#---_main function body start
   #Stack size: 48
   #Local: 24
   #Shift: 16
   #Spill: 0
   #Registers: 8
   #Calls: 16
   #Args: 0
  pushq %rbp
  movq %rsp, %rbp
  subq $64, %rsp
#---Registers to local memory start
  movq %r12, -32(%rbp)
#---Registers to local memory end
#---Args to local memory start
#---Args to local memory end
   #printInt calling with fac(10)
   #fac calling with 10
  movq $10, %rax
  movq %rax, 0(%rsp)
  callq fac
   #fac call end
  movq %rax, 0(%rsp)
  callq printInt
   #printInt call end
   #printInt calling with rfac(10)
   #rfac calling with 10
  movq $10, %rax
  movq %rax, 0(%rsp)
  callq rfac
   #rfac call end
  movq %rax, 0(%rsp)
  callq printInt
   #printInt call end
   #printInt calling with mfac(10)
   #mfac calling with 10
  movq $10, %rax
  movq %rax, 0(%rsp)
  callq mfac
   #mfac call end
  movq %rax, 0(%rsp)
  callq printInt
   #printInt call end
   #printInt calling with ifac(10)
   #ifac calling with 10
  movq $10, %rax
  movq %rax, 0(%rsp)
  callq ifac
   #ifac call end
  movq %rax, 0(%rsp)
  callq printInt
   #printInt call end
   #Declaring variable r on -8(%rbp)
#---StatementBlock start
   #Declaring variable n on -16(%rbp)
  movq $10, %rax
  movq %rax, -16(%rbp) #save 10 on n
   #Declaring variable r on -24(%rbp)
  movq $1, %rax
  movq %rax, -24(%rbp) #save 1 on r
.L1: #start label
  movq $0, %rax
  movq %rax, %r12
  movq -16(%rbp), %rax
#---Comparison start
  cmpq %r12, %rax
  jg .L3
  movq $0, %rax
  jmp .L4
.L3: #right label
  movq $1, %rax
.L4: #end label
#---Comparison end
  cmpq  $0, %rax
  je .L2
#---StatementBlock start
  movq -16(%rbp), %rax
  movq %rax, %r12
  movq -24(%rbp), %rax
  imulq %r12, %rax
  movq %rax, -24(%rbp) #save r * n on r
  movq -16(%rbp), %rax
  decq %rax
  movq %rax, -16(%rbp)
#---StatementBlock end
  jmp .L1
.L2: #end label
   #printInt calling with r
  movq -24(%rbp), %rax
  movq %rax, 0(%rsp)
  callq printInt
   #printInt call end
#---StatementBlock end
   #printString calling with repStr("=", 60)
   #repStr calling with "=", 60
#---Allocating string start
  movq $2, %rdi
  call _malloc
  movb $61, 0(%rax)
  movb $0, 1(%rax)
#---Allocating string end
  movq %rax, 0(%rsp)
  movq $60, %rax
  movq %rax, 8(%rsp)
  callq repStr
   #repStr call end
  movq %rax, 0(%rsp)
  callq printString
   #printString call end
  movq $0, %rax
  jmp .L0
   #return 0
  .L0:
#---Registers from local memory start
  movq -32(%rbp), %r12
#---Registers from local memory end
  addq $64, %rsp
  popq %rbp
  retq
#---_main function body end

.globl fac
fac:
#---fac function body start
   #Stack size: 32
   #Local: 16
   #Shift: 0
   #Spill: 0
   #Registers: 8
   #Calls: 0
   #Args: 8
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
#---Registers to local memory start
  movq %r12, -32(%rbp)
#---Registers to local memory end
#---Args to local memory start
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
#---Args to local memory end
   #Declaring variable r on -16(%rbp)
   #Declaring variable n on -24(%rbp)
  movq $1, %rax
  movq %rax, -16(%rbp) #save 1 on r
  movq -8(%rbp), %rax
  movq %rax, -24(%rbp) #save a on n
.L6: #start label
  movq $0, %rax
  movq %rax, %r12
  movq -24(%rbp), %rax
#---Comparison start
  cmpq %r12, %rax
  jg .L8
  movq $0, %rax
  jmp .L9
.L8: #right label
  movq $1, %rax
.L9: #end label
#---Comparison end
  cmpq  $0, %rax
  je .L7
#---StatementBlock start
  movq -24(%rbp), %rax
  movq %rax, %r12
  movq -16(%rbp), %rax
  imulq %r12, %rax
  movq %rax, -16(%rbp) #save r * n on r
  movq $1, %rax
  movq %rax, %r12
  movq -24(%rbp), %rax
  subq %r12, %rax
  movq %rax, -24(%rbp) #save n - 1 on n
#---StatementBlock end
  jmp .L6
.L7: #end label
  movq -16(%rbp), %rax
  jmp .L5
   #return r
  .L5:
#---Registers from local memory start
  movq -32(%rbp), %r12
#---Registers from local memory end
  addq $32, %rsp
  popq %rbp
  retq
#---fac function body end

.globl rfac
rfac:
#---rfac function body start
   #Stack size: 24
   #Local: 0
   #Shift: 0
   #Spill: 0
   #Registers: 8
   #Calls: 8
   #Args: 8
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
#---Registers to local memory start
  movq %r12, -16(%rbp)
#---Registers to local memory end
#---Args to local memory start
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
#---Args to local memory end
  movq $0, %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
#---Comparison start
  cmpq %r12, %rax
  je .L13
  movq $0, %rax
  jmp .L14
.L13: #right label
  movq $1, %rax
.L14: #end label
#---Comparison end
  cmpq  $0, %rax
  jne .L11
#---StatementBlock start
   #rfac calling with n - 1
  movq $1, %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
  subq %r12, %rax
  movq %rax, 0(%rsp)
  callq rfac
   #rfac call end
  movq %rax, %r12
  movq -8(%rbp), %rax
  imulq %r12, %rax
  jmp .L10
   #return n * rfac(n - 1)
#---StatementBlock end
  jmp .L12
.L11: #right label
#---StatementBlock start
  movq $1, %rax
  jmp .L10
   #return 1
#---StatementBlock end
.L12: #end label
  .L10:
#---Registers from local memory start
  movq -16(%rbp), %r12
#---Registers from local memory end
  addq $32, %rsp
  popq %rbp
  retq
#---rfac function body end

.globl mfac
mfac:
#---mfac function body start
   #Stack size: 24
   #Local: 0
   #Shift: 0
   #Spill: 0
   #Registers: 8
   #Calls: 8
   #Args: 8
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
#---Registers to local memory start
  movq %r12, -16(%rbp)
#---Registers to local memory end
#---Args to local memory start
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
#---Args to local memory end
  movq $0, %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
#---Comparison start
  cmpq %r12, %rax
  je .L18
  movq $0, %rax
  jmp .L19
.L18: #right label
  movq $1, %rax
.L19: #end label
#---Comparison end
  cmpq  $0, %rax
  jne .L16
#---StatementBlock start
   #nfac calling with n - 1
  movq $1, %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
  subq %r12, %rax
  movq %rax, 0(%rsp)
  callq nfac
   #nfac call end
  movq %rax, %r12
  movq -8(%rbp), %rax
  imulq %r12, %rax
  jmp .L15
   #return n * nfac(n - 1)
#---StatementBlock end
  jmp .L17
.L16: #right label
#---StatementBlock start
  movq $1, %rax
  jmp .L15
   #return 1
#---StatementBlock end
.L17: #end label
  .L15:
#---Registers from local memory start
  movq -16(%rbp), %r12
#---Registers from local memory end
  addq $32, %rsp
  popq %rbp
  retq
#---mfac function body end

.globl nfac
nfac:
#---nfac function body start
   #Stack size: 32
   #Local: 0
   #Shift: 0
   #Spill: 0
   #Registers: 16
   #Calls: 8
   #Args: 8
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
#---Registers to local memory start
  movq %r12, -16(%rbp)
  movq %r13, -24(%rbp)
#---Registers to local memory end
#---Args to local memory start
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
#---Args to local memory end
  movq $0, %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
#---Comparison start
  cmpq %r12, %rax
  jne .L23
  movq $0, %rax
  jmp .L24
.L23: #right label
  movq $1, %rax
.L24: #end label
#---Comparison end
  cmpq  $0, %rax
  jne .L21
#---StatementBlock start
  movq $1, %rax
  jmp .L20
   #return 1
#---StatementBlock end
  jmp .L22
.L21: #right label
#---StatementBlock start
  movq -8(%rbp), %rax
  movq %rax, %r12
   #mfac calling with n - 1
  movq $1, %rax
  movq %rax, %r13
  movq -8(%rbp), %rax
  subq %r13, %rax
  movq %rax, 0(%rsp)
  callq mfac
   #mfac call end
  imulq %r12, %rax
  jmp .L20
   #return mfac(n - 1) * n
#---StatementBlock end
.L22: #end label
  .L20:
#---Registers from local memory start
  movq -16(%rbp), %r12
  movq -24(%rbp), %r13
#---Registers from local memory end
  addq $32, %rsp
  popq %rbp
  retq
#---nfac function body end

.globl ifac
ifac:
#---ifac function body start
   #Stack size: 24
   #Local: 0
   #Shift: 0
   #Spill: 0
   #Registers: 0
   #Calls: 16
   #Args: 8
  pushq %rbp
  movq %rsp, %rbp
  subq $32, %rsp
#---Registers to local memory start
#---Registers to local memory end
#---Args to local memory start
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
#---Args to local memory end
   #ifac2f calling with 1, n
  movq $1, %rax
  movq %rax, 0(%rsp)
  movq -8(%rbp), %rax
  movq %rax, 8(%rsp)
  callq ifac2f
   #ifac2f call end
  jmp .L25
   #return ifac2f(1, n)
  .L25:
#---Registers from local memory start
#---Registers from local memory end
  addq $32, %rsp
  popq %rbp
  retq
#---ifac function body end

.globl ifac2f
ifac2f:
#---ifac2f function body start
   #Stack size: 56
   #Local: 8
   #Shift: 0
   #Spill: 0
   #Registers: 16
   #Calls: 16
   #Args: 16
  pushq %rbp
  movq %rsp, %rbp
  subq $64, %rsp
#---Registers to local memory start
  movq %r12, -32(%rbp)
  movq %r13, -40(%rbp)
#---Registers to local memory end
#---Args to local memory start
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
  movq 24(%rbp), %rax
  movq %rax, -16(%rbp)
#---Args to local memory end
  movq -16(%rbp), %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
#---Comparison start
  cmpq %r12, %rax
  je .L29
  movq $0, %rax
  jmp .L30
.L29: #right label
  movq $1, %rax
.L30: #end label
#---Comparison end
  cmpq  $0, %rax
  jne .L27
#---StatementBlock start
#---StatementBlock end
  jmp .L28
.L27: #right label
#---StatementBlock start
  movq -8(%rbp), %rax
  jmp .L26
   #return l
#---StatementBlock end
.L28: #end label
  movq -16(%rbp), %rax
  movq %rax, %r12
  movq -8(%rbp), %rax
#---Comparison start
  cmpq %r12, %rax
  jg .L33
  movq $0, %rax
  jmp .L34
.L33: #right label
  movq $1, %rax
.L34: #end label
#---Comparison end
  cmpq  $0, %rax
  jne .L31
#---StatementBlock start
#---StatementBlock end
  jmp .L32
.L31: #right label
#---StatementBlock start
  movq $1, %rax
  jmp .L26
   #return 1
#---StatementBlock end
.L32: #end label
   #Declaring variable m on -24(%rbp)
  movq $2, %rax
  movq %rax, %r12
  movq -16(%rbp), %rax
  movq %rax, %r13
  movq -8(%rbp), %rax
  addq %r13, %rax
  cqto
  idivq %r12
  movq %rax, -24(%rbp) #save (l + h) / 2 on m
   #ifac2f calling with m + 1, h
  movq $1, %rax
  movq %rax, %r12
  movq -24(%rbp), %rax
  addq %r12, %rax
  movq %rax, 0(%rsp)
  movq -16(%rbp), %rax
  movq %rax, 8(%rsp)
  callq ifac2f
   #ifac2f call end
  movq %rax, %r12
   #ifac2f calling with l, m
  movq -8(%rbp), %rax
  movq %rax, 0(%rsp)
  movq -24(%rbp), %rax
  movq %rax, 8(%rsp)
  callq ifac2f
   #ifac2f call end
  imulq %r12, %rax
  jmp .L26
   #return ifac2f(l, m) * ifac2f(m + 1, h)
  .L26:
#---Registers from local memory start
  movq -32(%rbp), %r12
  movq -40(%rbp), %r13
#---Registers from local memory end
  addq $64, %rsp
  popq %rbp
  retq
#---ifac2f function body end

.globl repStr
repStr:
#---repStr function body start
   #Stack size: 72
   #Local: 16
   #Shift: 0
   #Spill: 8
   #Registers: 32
   #Calls: 0
   #Args: 16
  pushq %rbp
  movq %rsp, %rbp
  subq $80, %rsp
#---Registers to local memory start
  movq %r12, -48(%rbp)
  movq %r13, -56(%rbp)
  movq %r14, -64(%rbp)
  movq %r15, -72(%rbp)
#---Registers to local memory end
#---Args to local memory start
  movq 16(%rbp), %rax
  movq %rax, -8(%rbp)
  movq 24(%rbp), %rax
  movq %rax, -16(%rbp)
#---Args to local memory end
   #Declaring variable r on -24(%rbp)
#---Allocating string start
  movq $1, %rdi
  call _malloc
  movb $0, 0(%rax)
#---Allocating string end
  movq %rax, -24(%rbp) #save "" on r
   #Declaring variable i on -32(%rbp)
  movq $0, %rax
  movq %rax, -32(%rbp) #save 0 on i
.L36: #start label
  movq -16(%rbp), %rax
  movq %rax, %r12
  movq -32(%rbp), %rax
#---Comparison start
  cmpq %r12, %rax
  jl .L38
  movq $0, %rax
  jmp .L39
.L38: #right label
  movq $1, %rax
.L39: #end label
#---Comparison end
  cmpq  $0, %rax
  je .L37
#---StatementBlock start
  movq -8(%rbp), %rax
  movq %rax, %r12
  movq -24(%rbp), %rax
#---Save pointers start
  movq %r12, %r13 #right
  movq %rax, %r12 #left
#---Save pointers end
  movq %r12, %rdi
  call _strlen
  movq %rax, %r15 #Save left string len
  movq %r13, %rdi
  call _strlen
  movq %rax, -40(%rbp) #Save right string len
  addq %r15, %rax
  leaq 1(%rax), %rdi
  call _malloc #Alloc result string
  movq %rax, %r14
#---Memcpy left string start
  movq %r12, %rsi #Left string to src arg
  movq %r14, %rdi #Result string to dest arg
  movq %r15, %rdx #Left string length
  call _memcpy
#---Memcpy left string end
#---Memcpy right string start
  movq %r13, %rsi #Right string to src arg
  movq %r14, %rax
  addq %r15, %rax
  movq %rax, %rdi #Result + left string length to dest arg
  movq -40(%rbp), %rdx #Right string length to rdx
  call _memcpy
#---Memcpy right string end
  movq %r14, %rax
  addq -40(%rbp), %rax
  addq %r15, %rax
  movq $0, (%rax)
  movq %r14, %rax
  movq %rax, -24(%rbp) #save r + s on r
  movq -32(%rbp), %rax
  incq %rax
  movq %rax, -32(%rbp)
#---StatementBlock end
  jmp .L36
.L37: #end label
  movq -24(%rbp), %rax
  jmp .L35
   #return r
  .L35:
#---Registers from local memory start
  movq -48(%rbp), %r12
  movq -56(%rbp), %r13
  movq -64(%rbp), %r14
  movq -72(%rbp), %r15
#---Registers from local memory end
  addq $80, %rsp
  popq %rbp
  retq
#---repStr function body end

