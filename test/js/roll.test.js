/*jshint laxcomma:true*/
/*global define require*/

define(["roll"], function (roll) {
  module("roll");

  test("roll object", function () {
    ok(roll, "defined");
  });

  test("roll a d6", function () {
    var limit = 1000000
      , results = [6, 0] // start min/max out inverted to make sure they are being set
      , temp;

    while (limit--) {
      temp = roll("d6");

      results[0] = temp < results[0] ? temp : results[0];
      results[1] = temp > results[1] ? temp : results[1];
    }

    ok(results[0] === 1, "min roll of a d6 is one: " + results[0]);
    ok(results[1] === 6, "max roll of a d6 is six: " + results[1]);
  });
});
