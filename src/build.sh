#!/usr/bin/env sh

# Handle Exit Codes
set -e
set -o pipefail

# Define Global Variables
LEAD="============>"
SLEAD="-------------"
BUNDLE_FLAG=''

# The cwd should be the root of the application, e.g. the parent of scripts
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/.."

# Define Build Functions
function build() {
  local task=$1
  local name=$2
  local leadType=$3

  if [[ $leadType == '' || $leadType == 'head' ]]; then echo "$LEAD BEGIN $name"; fi

  echo "$SLEAD $task"
  eval "$task 2>&1"

  if [[ $leadType == '' || $leadType == 'foot' ]]; then echo "$LEAD DONE $name\n\n"; fi
}

function buildSet() {
  local tasks=("${!1}")
  local name=$2
  local index=0
  local arrLen=${#tasks[@]}

  cd $DIR

  for task in "${tasks[@]}"; do
    local leadType='none'

    if [ $index == 0 ]; then
      leadType='head'
    elif [ $index == $(($arrLen-1)) ]; then
      leadType='foot'
    fi

    build "$task" "$name" "$leadType"

    ((index++))
  done
}

clearPublic=(
  "cd $DIR"
  "rm -rf css js"
  "mkdir css js js/lib"
)
buildSet clearPublic[@] "Clearing old styles and scripts"

build "git submodule update --init --recursive" "Initiailizing / updating Git submodules"

compileJquery=(
  "cd $DIR/git_modules/jquery"
  "npm install"
  "git submodule update --init --recursive"
  "grunt"
  # "grunt submodules selector build min -v"
)
buildSet compileJquery[@] "Compiling jQuery"

compileHandlbars=(
  "cd $DIR/git_modules/handlebars"
  "bundle install"
  "rake release"
)
buildSet compileHandlbars[@] "Compiling Handlebars"

copyScripts=(
  "cp $DIR/git_modules/handlebars/dist/handlebars.js $DIR/js/lib/handlebars.js"
  "cp $DIR/git_modules/jquery/dist/jquery.min.js $DIR/js/lib/jquery.js"
  "cp $DIR/git_modules/require-text/text.js $DIR/js/lib/text.js"
  "cp $DIR/git_modules/require/require.js $DIR/js/lib/require.js"
)
buildSet copyScripts[@] "Copying JavaScript libraries to public"

# build ". $DIR/cohort.js" "Compiling JavaScript"

# Complete Build
echo "$LEAD DONE with build script"
