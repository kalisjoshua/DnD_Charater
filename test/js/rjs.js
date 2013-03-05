({
  baseUrl: "../../src/js",
  name: "../../test/js/main-tests",
  optimize: "none",
  out: "../../js/main-tests.js",
  paths: {
    // "Abilities.test"  : "../../test/js/Abilities.test",
    // "Classes.test"    : "../../test/js/Classes.test",
    // "Races.test"      : "../../test/js/Races.test",
    "ranks.test"      : "../../test/js/ranks.test",

    "Collection.test" : "../../test/js/Collection.test",
    "misc.test"       : "../../test/js/misc.test",

    // handlebars  : "empty:",
    jquery      : "empty:"
  }
})