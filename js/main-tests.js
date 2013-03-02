
/*jshint laxcomma:true*/
/*global define*/

define('roll',[], function () {
  

  var strict  = /^\d*d(?:2|3|4|6|8|10|12|20|24|30|36|50|100)$/;

  function roll (face, num) {
    var sum = 0;

    while (num--) {
      sum += ~~(Math.random() * face) + 1;
    }

    return sum;
  }

  return function (combo) {
      if (!strict.test(combo)) {
        throw new Error("Invalid combo passed to roll(): " + combo);
      }

      if (!roll[combo]) {
        var split = combo.split("d");
        roll[combo] = roll.bind(null, ~~split[1], ~~split[0] || 1);
      }

      return roll[combo]();
    };
});
/*jshint laxcomma:true*/
/*global define require*/

define('roll.test',["roll"], function (roll) {
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

/*jshint laxcomma:true*/
/*global require*/

require(["roll.test"]);

define("../../test/js/main-tests", function(){});
