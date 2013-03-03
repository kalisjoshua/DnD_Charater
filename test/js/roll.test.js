/*jshint laxcomma:true*/
/*global define require*/

define(["roll", "util"], function (roll, util) {
  module("roll");

  var max_test_iterations = 100000;

  test("functionality", function () {
    ok(roll, "'roll' is defined");
    ok(util.isFunction(roll), "'roll' is defined as a function");

    var faces   = 6
      , num     = ""
      , limit   = max_test_iterations
      , min     = num || 1
      , max     = faces * min
      , minmax  = [max, min] // start min/max inverted to make sure they are being set
      , temp;

    oned6:
    while (limit--) {
      temp = roll(num + "d" + faces);

      minmax[0] = temp < minmax[0] ? temp : minmax[0];
      minmax[1] = temp > minmax[1] ? temp : minmax[1];
    }
    ok(minmax[0] === min, "min roll of " + (num || " a ") + "d" + faces + " is one: " + minmax[0]);
    ok(minmax[1] === max, "max roll of " + (num || " a ") + "d" + faces + " is six: " + minmax[1]);


    num     = 6;
    limit   = max_test_iterations;
    min     = num || 1;
    max     = faces * min;
    minmax  = [max, min]; // start min/max inverted to make sure they are being set

    sixd6:
    while (limit--) {
      temp = roll("6d6");

      minmax[0] = temp < minmax[0] ? temp : minmax[0];
      minmax[1] = temp > minmax[1] ? temp : minmax[1];

      if (temp < max / 6 || temp > max) {
        temp = false;
        break sixd6;
      }
    }
    ok(temp, "Min/max values: " + minmax);
  });
});
