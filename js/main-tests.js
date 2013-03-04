
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
/*jshint laxcomma: true*/
/*global define*/

define('util',[], function () {
  

  function clone (obj) {
    var i
      , result = util.isArray(obj) ? [] : {};
    
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        result[i] = util.isObject(obj[i]) ? clone(obj[i]) : obj[i];
      }
    }
    
    return result;
  }

  function isNumeric (q) {
    if ("" === "".replace.call(q, /^\s+|\s+$/g, "") || q === true) {
      return false;
    }
    return (!isNaN(parseFloat(q)) || !isNaN(Number(q))) && isFinite(q);
  }

  function isType (type, obj) {
    return ((!!obj || obj === '') && type.test(obj.getType ? obj.getType() : ({}).toString.call(obj)));
  }

  var util = {
          clone: clone
        , isNumeric: isNumeric
        , isType: isType
      };

  return "Array Function Object String"
    .split(" ")
    .reduce(function (acc, item) {
      acc["is" + item] = util.isType.bind(null, new RegExp(item));
      return acc;
    }, util);
});
/*jshint laxcomma:true*/
/*global define require*/

define('roll.test',["roll", "util"], function (roll, util) {
  module("misc");

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
        new Number()                        , // number wrapper
        (function () {return this;}())      , // object, global
        new Object()                        , //
        {}                                  , //
        /a-z/                               , // regular expression
        /a-z/gim                            , //
        new RegExp()                        , //
        (function (u) {return u;}())        , // undefined
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

  test("util", function () {

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

    ok(util.isArray([]), ".isArray()");
    ok(!util.isArray((function () {return arguments;}())), ".isArray()");
    fail(util.isArray, functions);
    fail(util.isArray, numbers);
    fail(util.isArray, objects);
    fail(util.isArray, strings);

    ok(util.isFunction(window.alert), ".isFunction()");
    pass(util.isFunction, functions);
    fail(util.isFunction, numbers);
    fail(util.isFunction, objects);
    fail(util.isFunction, strings);

    fail(util.isNumeric, functions);
    pass(util.isNumeric, numbers);
    // fail(util.isNumeric, objects); // not wokring yet
    fail(util.isNumeric, strings);

    fail(util.isObject, functions);
    fail(util.isObject, numbers);
    // pass(util.isObject, objects); // not wokring yet
    fail(util.isObject, strings);

    fail(util.isString, functions);
    // fail(util.isString, numbers); // not wokring yet
    fail(util.isString, objects);
    pass(util.isString, strings);
  });

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

/*jshint*/
/*global define*/

define('Collection',["util"], function (util) {
  

  function Collection (ar) {
    if (!!ar && util.isArray(ar) && ar.length > 0) {
      Collection.fn.add.call(this, ar);
    }
  }

  Collection.fn = Collection.prototype = [];

  Collection.fn.add = function (ar) {
    if (util.isArray(ar)) {
      this.push.apply(this, ar);
    }

    return this;
  };

  Collection.fn.each = function (fn) {
    this.forEach(function (node, indx, orig) {
      fn(node, indx, orig);
    });

    return this;
  };

  Collection.fn.getNames = function () {

    return this.map(function (node) {
      return node.name;
    });
  };

  Collection.fn.named = function (key) {

    return this.filter(function (node) {
      return node.name === key;
    })[0];
  };

  Collection.fn.numericSort = function (descending) {
    var result = this.sort(function (a, b) { return a - b; });

    return descending ? result.reverse() : result;
  };

  Collection.fn.toString = function () {
      
    return "[object Collection]";
  };

  return Collection;
});
/*jshint laxcomma:true*/
/*global define*/

define('Castes',["Collection", "roll"], function (Collection, roll) {
  

  var allCastes = new Collection();

  function numericSort (a, b) {
    return a - b;
  }

  function sum (acc, cur) {
    return acc + cur;
  }

  function Caste (config) {
    // this is actually not necessary since it is a "privete" class
    if (this === (function () {return this;}())) {
      // called as a function instead of a constructor
      return new Caste(config);
    }

    if (!config.dice) {
      throw new Error("No 'dice' property passed into Caste constructor.");
    }

    if (!config.name) {
      throw new Error("No 'name' property passed into Caste constructor.");
    }

    if (!config.min) {
      throw new Error("No 'min' property passed into Caste constructor.");
    }
      
    for (var attr in config) {
      this[attr] = config[attr];
    }
  }

  Caste.prototype = {
    column: function (num) {
      var indx = 0
        , result = [];

      if (num < 0 || num != +num || num != ~~num) {
        num = 1;
      }

      num = ~~num;

      do {
        result[indx] = [];

        while (result[indx].length < 7) {
          result[indx].push(this.roll());
        }

        result[indx] = result[indx].sort(numericSort).reverse();
      } while (num > ++indx);

      return num === 1 ? result[0] : result;
    }

    ,getType: function () {
        
      return "[object Caste]";
    }

    ,roll: function () {
      var result;

      do {
        result = Array.apply(null, Array(this.dice))
          .map(roll.bind(null, "d6"))
          .sort()
          .slice(-3)
          .reduce(sum);
      } while (result < this.min);

      return result;
    }

    ,toString: function () {

      return this.name;
    }

    ,valueOf: function () {

      return "{name: '" + this.name + "'}";
    }
  };

  allCastes
    .add([
       new Caste({name: "Champion", dice: 6, min: 7})
      ,new Caste({name: "Hero"    , dice: 4, min: 4})
      ,new Caste({name: "npc"     , dice: 3, min: 4})
      ,new Caste({name: "Player"  , dice: 3, min: 7})
      ,new Caste({name: "Pleb"    , dice: 3, min: 3})
    ]);

  return allCastes;
});
/*jshint laxcomma:true*/
/*global define require*/

define('Castes.test',["Castes", "util"], function (Castes, util) {
  module("Castes");

  test("API", function Castes_test () {
    ok(Castes, "Castes is defined.");
    equal("[object Collection]", Castes.toString(), "Castes is a Collection.");
    equal(5, Castes.length, "Castes has the right number of Caste instances.");

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

/*jshint laxcomma:true*/
/*global require*/

require(["roll.test"]);
// require(["Abilities.test"]);
require(["Castes.test"]);

define("../../test/js/main-tests", function(){});
