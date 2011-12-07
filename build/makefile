NAME=DnD_1E_lib

DIR_SRC=../js/src
DIR_DIST=../js
DIR_UTIL=./util

RHINO_ENV ?= java -jar $(DIR_UTIL)/Rhino.jar
CLOSURE_COMPILER ?= java -jar $(DIR_UTIL)/google-compiler-20100917.jar

FILES=$(DIR_SRC)/_intro.js\
	$(DIR_SRC)/castes.js\
	$(DIR_SRC)/classes.js\
	$(DIR_SRC)/core.js\
	$(DIR_SRC)/player.js\
	$(DIR_SRC)/races.js\
	$(DIR_SRC)/stats.js\
	$(DIR_SRC)/ui.js\
	$(DIR_SRC)/_outro.js

SRC=$(DIR_DIST)/$(NAME).src.js
MIN=$(DIR_DIST)/$(NAME).js

all: $(SRC) lint min
	@@echo $(NAME) " build complete."

lint: $(SRC)
	@@echo "lint'ing " $(SRC)
	@@${RHINO_ENV} $(DIR_UTIL)/jslint-check.js

min: $(MIN)
$(MIN): $(SRC)
	@@echo "minify'ing " $(SRC)
	@@$(CLOSURE_COMPILER) --js $(SRC) --warning_level QUIET --js_output_file $(MIN)

$(SRC): $(FILES) $(DIR_DIST)
	@@echo "building " $(NAME)
	@@cat $(FILES) > $(SRC)

dbg: $(SRC)

clean:
	@@echo "deleting files: " $(SRC) ", " $(MIN)
	@@rm -f $(SRC)
	@@rm -f $(MIN)

# identify the targets as phony so if there ever is a file named the same it wont cause problems
.PHONY: all lint min $(NAME) clean