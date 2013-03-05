({
  baseUrl: "../../src/js",
  name: "../../test/js/main-tests",
  optimize: "none",
  out: "../../js/main-tests.js",
  paths: {
    // "Abilities.test"  : "../../test/js/Abilities.test",
    // "Classes.test"    : "../../test/js/Classes.test",
    // "Races.test"      : "../../test/js/Races.test",
    "test_stations"      : "../../test/js/test_stations",

    "test_collections" : "../../test/js/test_collections",
    "test_misc"       : "../../test/js/test_misc",

    // handlebars  : "empty:",
    jquery      : "empty:"
  }
})