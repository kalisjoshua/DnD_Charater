
dev:
	./src/.cohort

all: clean submodules npm libs dev

clean:
	rm -rf css js;\
	mkdir css js js/lib

libs: submodules
	cd git_modules/jquery;\
	npm install;\
	git submodule update --init --recursive;\
	grunt

	cd git_modules/handlebars;\
	bundle install;\
	rake release

	cp git_modules/handlebars/dist/handlebars.js js/lib/handlebars.js
	cp git_modules/jquery/dist/jquery.min.js js/lib/jquery.js
	cp git_modules/require/require.js js/lib/require.js
	cp git_modules/require-text/text.js js/lib/text.js

npm:
	npm install

r:
	node node_modules/.bin/r.js -o src/rjs.js

reset:
	rm -rf css js git_modules node_modules
	make all

submodules:
	git submodule update --init --recursive

tdd: tests
	./test/.sherpa

tests:
	node node_modules/.bin/r.js -o test/js/rjs.js

watch:
	./src/.sherpa

.PHONY: all clean dev libs npm reset submodules watch