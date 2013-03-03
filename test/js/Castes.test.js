/*jshint laxcomma:true*/
/*global define require*/

define(["Castes", "util"], function (Castes, util) {
  module("Castes");

  // var max_test_iterations = function () {return 1000000;};

  test("Collection", function Castes_test () {
    ok(Castes, "Castes is defined.");
    equal("[object Collection]", Castes.toString(), "Castes is a Collection.");
    equal(5, Castes.length, "Castes has the right number of Caste instances.");
  });

  test("Instance properties", function () {
    var caste = "Hero"
      , sample = Castes.named(caste)
      , temp;

    ok(sample.name === caste, "Sample instance has a name and it matches what was searched for in the Collection.");

    ok(sample.column, "Sample instance has 'column' property.");
    ok(util.isFunction(sample.column), "Sample instance '.column' is a function.");
    ok(sample.column().every(util.isNumeric), "Call to '.column' returns an array of numbers.");

    // test("column", function () {});
    // test("getType", function () {});
    // test("roll", function () {});
    // test("toString", function () {});
    // test("valueOf", function () {});
  });
});
