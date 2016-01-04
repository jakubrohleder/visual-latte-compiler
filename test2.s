	.section	__TEXT,__text,regular,pure_instructions
	.macosx_version_min 10, 11
	.globl	_main
	.align	4, 0x90
_main:                                  ## @main
## BB#0:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	%esi
	subl	$20, %esp
	calll	L0$pb
L0$pb:
	popl	%eax
	leal	-8(%ebp), %ecx
	movl	%ecx, 4(%esp)
	leal	L_.str-L0$pb(%eax), %esi
	movl	%esi, (%esp)
	calll	_scanf
	movl	-8(%ebp), %eax
	incl	%eax
	movl	%eax, -8(%ebp)
	movl	%eax, 4(%esp)
	movl	%esi, (%esp)
	calll	_printf
	xorl	%eax, %eax
	addl	$20, %esp
	popl	%esi
	popl	%ebp
	retl

	.section	__TEXT,__cstring,cstring_literals
L_.str:                                 ## @.str
	.asciz	"%d"


.subsections_via_symbols
