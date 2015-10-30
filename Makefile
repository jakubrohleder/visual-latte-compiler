all: jvm llvm chmod

jvm:
		@echo 'node dist/jvm.js $$1' > insc_jvm

llvm:
		@echo 'node dist/llvm.js $$1' > insc_llvm

chmod:
		bash -c "chmod +x insc_*"

clean:
		rm -f *.j *.ll *.class *.bc insc_jvm insc_llvm