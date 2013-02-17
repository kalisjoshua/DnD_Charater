
dev:
	./src/.cohort

all: clean npm submodules handlebars jquery libs dev

clean:
	rm -rf css js;\
	mkdir css js js/lib

handlebars: submodules
	cd git_modules/handlebars;\
	bundle install;\
	rake release

jquery: submodules
	cd git_modules/jquery;\
	npm install;\
	git submodule update --init --recursive;\
	grunt

libs: submodules handlebars jquery
	cp git_modules/handlebars/dist/handlebars.js js/lib/handlebars.js
	cp git_modules/jquery/dist/jquery.min.js js/lib/jquery.js
	cp git_modules/require/require.js js/lib/require.js
	cp git_modules/require-text/text.js js/lib/text.js

npm:
	npm install

submodules:
	git submodule update --init --recursive

.PHONY: all clean dev handlebars jquery libs npm submodules