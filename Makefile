all: jvm llvm chmod

jvm:
		@echo 'node `echo "$$( cd "$$( dirname "$$0" )" && pwd )"`/dist/jvm.js $$1' > insc_jvm

llvm:
		@echo 'node `echo "$$( cd "$$( dirname "$$0" )" && pwd )"`/dist/llvm.js $$1' > insc_llvm

chmod:
		bash -c "chmod +x insc_*"

clean:
		rm -f *.j *.ll *.class *.bc insc_jvm insc_llvm