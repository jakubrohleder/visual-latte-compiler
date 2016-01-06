all: latc latc_x86_64 chmod

latc:
		@echo 'node "`echo "$$( cd "$$( dirname "$$0" )" && pwd )"`"/src/main.js $$1' > latc

latc_x86_64:
		@echo 'node "`echo "$$( cd "$$( dirname "$$0" )" && pwd )"`"/src/main.js $$1' > latc_x86_64

chmod:
		bash -c "chmod +x latc*"

clean:
		rm -f *.s latc latc_x86_64