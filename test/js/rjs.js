({
  baseUrl: "../../src/js",
  name: "../../test/js/main-tests",
  optimize: "none",
  out: "../../js/main-tests.js",
  paths: {
    "Abilities.test"  : "../../test/js/Abilities.test",
    "Castes.test"     : "../../test/js/Castes.test",
    "Classes.test"    : "../../test/js/Classes.test",
    "Races.test"      : "../../test/js/Races.test",

    "Collection.test" : "../../test/js/Collection.test",
    "misc.test"       : "../../test/js/misc.test",

    handlebars  : "empty:",
    jquery      : "empty:"
  }
})