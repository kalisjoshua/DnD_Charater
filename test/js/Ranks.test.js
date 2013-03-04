/*jshint laxcomma:true*/
/*global define require*/

define([      "Ranks", "util"
  ], function (Ranks,   util) {
  module("Ranks");

  test("API", function Ranks_test () {
    ok(Ranks, "Ranks is defined.");
    equal("[object Collection]", Ranks.toString(), "Ranks is a Collection.");
    equal(5, Ranks.length, "Ranks has the right number of Caste instances.");

    var caste = "Hero"
      , sample = Ranks.named(caste)
      , temp;

    ok(sample.name === caste, "Sample instance has a name and it matches what was searched for in the Collection.");

    ok(sample.column, "Sample instance has 'column' property.");
    ok(util.isFunction(sample.column), "Sample instance '.column' is a function.");
    ok(sample.column().every(util.isNumeric), "Call to '.column' returns an array of numbers.");

    ok(sample.getType, "Sample instance has '.getType' property.");
    ok(util.isFunction(sample.getType), "Sample instance has '.getType' is a function.");
    ok(util.isString(sample.getType()), "Call to '.getType' returns a String.");

    ok(sample.toString, "Sample instance has '.toString' property.");
    ok(util.isFunction(sample.toString), "Sample instance has '.toString' is a function.");
    ok(util.isString(sample.toString()), "Call to '.toString' returns a String.");
    ok(sample.toString() === caste, "Call to '.toString' returns the correct String.");

    ok(sample.valueOf, "Sample instance has '.valueOf' property.");
    ok(util.isFunction(sample.valueOf), "Sample instance has '.valueOf' is a function.");
    ok(util.isString(sample.valueOf()), "Call to '.valueOf' returns a String.");
    ok(sample.valueOf() === '{"name":"Hero","dice":4,"min":4}', "Call to '.valueOf' returns the correct String.");
  });
});