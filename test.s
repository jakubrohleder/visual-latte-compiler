	.section	__TEXT,__text,regular,pure_instructions
	.macosx_version_min 10, 11
	.globl	__Z2f3Piii
	.align	4, 0x90
__Z2f3Piii:                             ## @_Z2f3Piii
## BB#0:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	%ebx
	pushl	%edi
	pushl	%esi
	subl	$28, %esp
	calll	L0$pb
L0$pb:
	popl	%eax
	movl	12(%ebp), %esi
	movl	16(%ebp), %edi
	movl	8(%ebp), %ebx
	movl	32(%ebx), %ecx
	movl	%edi, 12(%esp)
	movl	%esi, 8(%esp)
	movl	%ecx, 4(%esp)
	leal	L_.str-L0$pb(%eax), %eax
	movl	%eax, (%esp)
	calll	_printf
	movl	(%ebx), %eax
	addl	%edi, %esi
	leal	1(%eax,%esi), %eax
	addl	$28, %esp
	popl	%esi
	popl	%edi
	popl	%ebx
	popl	%ebp
	retl

	.globl	__Z2f4iiii
	.align	4, 0x90
__Z2f4iiii:                             ## @_Z2f4iiii
## BB#0:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	%ebx
	pushl	%edi
	pushl	%esi
	subl	$28, %esp
	calll	L1$pb
L1$pb:
	popl	%eax
	movl	8(%ebp), %esi
	movl	16(%ebp), %edi
	movl	20(%ebp), %ebx
	movl	%ebx, 16(%esp)
	movl	%edi, 12(%esp)
	movl	12(%ebp), %ecx
	movl	%ecx, 8(%esp)
	movl	%esi, 4(%esp)
	leal	L_.str1-L1$pb(%eax), %eax
	movl	%eax, (%esp)
	calll	_printf
	addl	12(%ebp), %esi
	addl	%edi, %esi
	leal	1(%ebx,%esi), %eax
	addl	$28, %esp
	popl	%esi
	popl	%edi
	popl	%ebx
	popl	%ebp
	retl

	.globl	_main
	.align	4, 0x90
_main:                                  ## @main
## BB#0:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	%esi
	subl	$20, %esp
	calll	L2$pb
L2$pb:
	popl	%esi
	leal	L_.str-L2$pb(%esi), %eax
	movl	%eax, (%esp)
	movl	$3, 12(%esp)
	movl	$2, 8(%esp)
	movl	$8, 4(%esp)
	calll	_printf
	leal	L_.str1-L2$pb(%esi), %eax
	movl	%eax, (%esp)
	movl	$12, 16(%esp)
	movl	$7, 12(%esp)
	movl	$6, 8(%esp)
	movl	$5, 4(%esp)
	calll	_printf
	movl	$31, %eax
	addl	$20, %esp
	popl	%esi
	popl	%ebp
	retl

	.section	__TEXT,__cstring,cstring_literals
L_.str:                                 ## @.str
	.asciz	"%d %d %d"

L_.str1:                                ## @.str1
	.asciz	"%d %d %d %d"


.subsections_via_symbols
