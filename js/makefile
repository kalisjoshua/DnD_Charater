NAME=DnD_1E_lib

REL=./
DIR_SRC=$(REL)src
DIR_DIST=.
DIR_UTIL=$(REL)util

RHINO_ENV ?= java -jar $(DIR_UTIL)/Rhino.jar
CLOSURE_COMPILER ?= java -jar $(DIR_UTIL)/google-compiler-20100917.jar

FILES=$(DIR_SRC)/_intro.js\
	$(DIR_SRC)/createObject.js\
	$(DIR_SRC)/core.js\
	$(DIR_SRC)/abilities.js\
	$(DIR_SRC)/data_abilityModifiers.js\
	$(DIR_SRC)/data_races.js\
	$(DIR_SRC)/data_reference.js\
	$(DIR_SRC)/data_saves.js\
	$(DIR_SRC)/data_designations.js\
	$(DIR_SRC)/classes.js\
	$(DIR_SRC)/player.js\
	$(DIR_SRC)/ui.js\
	$(DIR_SRC)/_outro.js

SRC_DBG=$(DIR_DIST)/$(NAME).js
SRC_MIN=$(DIR_DIST)/$(NAME).min.js

all: $(SRC_DBG) lint min
	@@echo $(NAME) " build complete."

lint: $(SRC_DBG)
	@@echo "lint'ing " $(SRC_DBG)
	@@${RHINO_ENV} $(DIR_UTIL)/jslint-check.js

min: $(SRC_MIN)
$(SRC_MIN): $(SRC_DBG)
	@@echo "minify'ing " $(SRC_DBG)
	@@$(CLOSURE_COMPILER) --js $(SRC_DBG) --warning_level QUIET --js_output_file $(SRC_MIN)

$(SRC_DBG): $(FILES) $(DIR_DIST)
	@@echo "building " $(NAME)
	@@cat $(FILES) > $(SRC_DBG)

dbg: $(SRC_DBG)

clean:
	@@echo "deleting files: " $(SRC_DBG) ", " $(SRC_MIN)
	@@rm -f $(SRC_DBG)
	@@rm -f $(SRC_MIN)

# identify the targets as phony so if there ever is a file named the same it wont cause problems
.PHONY: all lint min $(NAME) clean