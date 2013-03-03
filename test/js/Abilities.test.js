/*jshint laxcomma:true*/
/*global define require*/

define(["Abilities"], function (Abilities) {
  module("Abilities");

  var max_test_iterations = function () {return 1000000;};

  test("is a constructor function", function Abilities_test () {
    ok(Abilities, "defined");
  });
});
