/*jshint laxcomma:true*/
/*global define require*/

define([      "roll", "util"
  ], function (roll,   util) {
  module("util");

  var max_test_iterations = 100000

    , functions = [
        function () {}                      , // function
        window.alert                        , // function, global
        new Function("return 1;")           , //

        Boolean                             , // Constructors
        Date                                , //
        Error                               , //
        Function                            , //
        Number                              , //
        Object                              , //
        RegExp                              , //
      ]

    , numbers = [
        new Number(),
        0,
        1,
        1.,
        1.0,
        1.01,
        .1,
        0.1,
        1e2,
        1E2,
        1e-2,
        0x77,
        023,
        -1,
        -1.,
        -1.0,
        -1.01,
        -1e2,
        -1e-2,
        -0x77,
        -023,
        "0",
        "1",
        "1.",
        "1.0",
        "1.01",
        ".1",
        "0.1",
        "1e2",
        "1E2",
        "1e-2",
        "0x77",
        "023",
        "-1",
        "-1.",
        "-1.0",
        "-1.01",
        "-1e2",
        "-1e-2",
        // "-0x77",
        "-023"
      ]

    , objects = [
        // []                                  , // array is not an object
        (function () {return arguments;}()) , // arguments object
        new Boolean                         , // bools
        true                                , //
        new Date                            , // date... duh
        new Error                           , // err
        JSON                                , // JSON
        Math                                , // builtin
        NaN                                 , // not a number
        null                                , // the elusive null
        (function () {return this;}())      , // object, global
        new Object()                        , //
        {}                                  , //
        /a-z/                               , // regular expression
        /a-z/gim                            , //
        new RegExp()                        , //
        (function (u) {return u;}())          // undefined
      ]

    , strings = [
        "",
        " ",
        "     ",
        "abc123",
        "123abc",
        "lorem ipsum dolor",
        new String()
      ];

  function fail (fn, list) {
    list.forEach(function (item, indx) {
      ok(!fn(item), "Testing: (" + indx + ") '" + item + "' != " + ({}).toString.call(item));
    });
  }
  function pass (fn, list) {
    list.forEach(function (item, indx) {
      ok(fn(item), "Testing: (" + indx + ") '" + item + "' != " + ({}).toString.call(item));
    });
  }

  test("'.isArray'", function () {
    ok(util.isArray([]), ".isArray()");
    ok(!util.isArray((function () {return arguments;}())), ".isArray()");
    fail(util.isArray, functions);
    fail(util.isArray, numbers);
    fail(util.isArray, objects);
    fail(util.isArray, strings);
  });

  test("'.isFunction'", function () {
    ok(util.isFunction(window.alert), ".isFunction()");
    pass(util.isFunction, functions);
    fail(util.isFunction, numbers);
    fail(util.isFunction, objects);
    fail(util.isFunction, strings);
  });

  test("'.isNumeric'", function () {
    fail(util.isNumeric, functions);
    pass(util.isNumeric, numbers);
    fail(util.isNumeric, objects);
    fail(util.isNumeric, strings);
  });

  test("'.isString'", function () {
    fail(util.isString, functions);
    fail(util.isString, numbers.slice(0, 21)); // 21 and over ARE strings
    fail(util.isString, objects);
    pass(util.isString, strings);
  });


  test("'.sort'(ing)", function () {
    ok(util.sort, "Sorting defined in util.");

    ok(util.sort.asc, "Sorting (ascending) defined in util.");
    ok(util.isFunction(util.sort.asc), "Sorting (ascending) is a function.");

    ok(util.sort.desc, "Sorting (descending) defined in util.");
    ok(util.isFunction(util.sort.desc), "Sorting (descending) is a function.");

    var ar = [2,6,8,9,1,3,7,4,0,5];

    equal([0,1,2,3,4,5,6,7,8,9].join(), ar.sort(util.sort.asc).join(), "Ascending sort works.");
    equal([9,8,7,6,5,4,3,2,1,0].join(), ar.sort(util.sort.desc).join(), "Ascending sort works.");
  });

  module("misc");

  test("roll", function () {
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
