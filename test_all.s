	.text
	.globl __Z2asv
__Z2asv:
LFB9:
	subq	$8, %rsp
LCFI0:
	movl	$24, %edi
	call	_malloc
	movl	$0, (%rax)
	movl	$1, 4(%rax)
	movl	$2, 8(%rax)
	movl	$3, 12(%rax)
	movl	$4, 16(%rax)
	movl	$5, 20(%rax)
	addq	$8, %rsp
LCFI1:
	ret
LFE9:
	.cstring
LC0:
	.ascii "%d\12\0"
	.section __TEXT,__text_startup,regular,pure_instructions
	.globl _main
_main:
LFB10:
	pushq	%rbx
LCFI2:
	call	__Z2asv
	movq	%rax, %rbx
	movl	20(%rax), %esi
	leaq	LC0(%rip), %rdi
	movl	$0, %eax
	call	_printf
	movq	%rbx, %rdi
	call	_free
	movl	$0, %eax
	popq	%rbx
LCFI3:
	ret
LFE10:
	.section __TEXT,__eh_frame,coalesced,no_toc+strip_static_syms+live_support
EH_frame1:
	.set L$set$0,LECIE1-LSCIE1
	.long L$set$0
LSCIE1:
	.long	0
	.byte	0x1
	.ascii "zR\0"
	.byte	0x1
	.byte	0x78
	.byte	0x10
	.byte	0x1
	.byte	0x10
	.byte	0xc
	.byte	0x7
	.byte	0x8
	.byte	0x90
	.byte	0x1
	.align 3
LECIE1:
LSFDE1:
	.set L$set$1,LEFDE1-LASFDE1
	.long L$set$1
LASFDE1:
	.long	LASFDE1-EH_frame1
	.quad	LFB9-.
	.set L$set$2,LFE9-LFB9
	.quad L$set$2
	.byte	0
	.byte	0x4
	.set L$set$3,LCFI0-LFB9
	.long L$set$3
	.byte	0xe
	.byte	0x10
	.byte	0x4
	.set L$set$4,LCFI1-LCFI0
	.long L$set$4
	.byte	0xe
	.byte	0x8
	.align 3
LEFDE1:
LSFDE3:
	.set L$set$5,LEFDE3-LASFDE3
	.long L$set$5
LASFDE3:
	.long	LASFDE3-EH_frame1
	.quad	LFB10-.
	.set L$set$6,LFE10-LFB10
	.quad L$set$6
	.byte	0
	.byte	0x4
	.set L$set$7,LCFI2-LFB10
	.long L$set$7
	.byte	0xe
	.byte	0x10
	.byte	0x83
	.byte	0x2
	.byte	0x4
	.set L$set$8,LCFI3-LCFI2
	.long L$set$8
	.byte	0xe
	.byte	0x8
	.align 3
LEFDE3:
	.constructor
	.destructor
	.align 1
	.subsections_via_symbols
