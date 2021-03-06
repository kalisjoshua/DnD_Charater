
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
  

  function addGetter (obj, config, prop) {
    function _prop () {
      return config[prop];
    }

    function _prop_slice() {
      return _prop().slice(0);
    }

    obj.__defineGetter__(prop, util.isArray(config[prop]) ? _prop_slice : _prop);
  }

  // expected to be used in Array.every for validation
  function checkProp (type, config, fn) {
    var prop  = fn.name
      , value = config[prop];

    if (!fn(value)) {
      throw new Error("Attempting to set invalid '{p}' property [{v}] in {t}."
        .replace("{p}", prop)
        .replace("{v}", value)
        .replace("{t}", type));
    }

    return true; // no error thrown, all is well.
  }

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
    if (q == null) {
      return false;
    }

    if (q === true) {
      return false;
    }

    if (q instanceof Date) {
      return false;
    }

    if (q instanceof Boolean) {
      return false;
    }

    if ("" === "".replace.call(q, /^\s+|\s+$/g, "")) {
      return false;
    }

    return (!isNaN(parseFloat(q)) || !isNaN(Number(q))) && isFinite(q);
  }

  function isType (type, obj) {

    return ((!!obj || obj === '') && type.test(obj.getType ? obj.getType() : ({}).toString.call(obj)));
  }

  function isValid (type, config, validations) {

    return validations.every(checkProp.bind(null, type, config));
  }

  function numericSort (a, b) {

    return a - b;
  }

  function sortAscending (a, b) {

    return a - b;
  }

  function sortDescending (a, b) {

    return b - a;
  }

  function sum (acc, cur) {

    return acc + cur;
  }

  var util = {
          addGetter   : addGetter
        , checkProp   : checkProp
        , clone       : clone
        , global      : (function () {return this;}())
        , isNumeric   : isNumeric
        , isType      : isType
        , isValid     : isValid
        , numericSort : numericSort
        , sort        : {
           asc    : sortAscending
          ,desc   : sortDescending
        }
        , sum         : sum
      };

  return "Array Function String"
    .split(" ")
    .reduce(function (acc, item) {
      acc["is" + item] = util.isType.bind(null, new RegExp(item));
      return acc;
    }, util);
});
/*jshint laxcomma:true*/
/*global define require*/

define('test_misc',[      "roll", "util"
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

/*jshint laxcomma:true*/
/*global define*/

define('Collection',[      "util"
  ], function (util) {
  

  function Collection (ar) {
    if (this === (function () {return this;}())) {
      // called as a function instead of a constructor - fix it!
      return new Collection(ar);
    }

    if (!!ar && util.isArray(ar) && ar.length > 0) {
      Collection.fn.add.call(this, ar);
    }
  }

  Collection.fn = Collection.prototype = [];

  Collection.fn.add = function (ar) {
    if (util.isArray(ar)) {
      this.push.apply(this, ar);
    } else {
      this.push.call(this, ar);
    }

    return this;
  };

  Collection.fn.each = [].forEach;

  Collection.fn.empty = function () {
    while (this.shift());

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
    });
  };

  Collection.fn.toString = function () {

    return "[object Collection]";
  };

  return Collection;
});
/*jshint laxcomma:true*/
/*global define require*/

define('test_collections',[      "Collection", "util"
  ], function (Collection,   util) {
  module("Collection");

  test("constructor", function () {
    ok(Collection, "Collection is defined.");
    ok(new Collection(), "Create an empty collection.");
    ok(Collection(), "Create an empty collection, without using 'new' keyword.");

    var sample = new Collection();

    equal(0, sample.length, "An empty collection has no items.");

    // Collection methods existence
    [ "add"
    , "each"
    , "getNames"
    , "named"
    , "toString"
    ].forEach(function (method) {
      ok(sample[method], "Collections have '." + method + "' property defined.");
      ok(util.isFunction(sample[method]), "Collections '." + method + "' property is a method.");
    });

    ok(sample.toString, "Collection has '.toString' property.");
    ok(util.isFunction(sample.toString), "Collection has '.toString' method.");
    equal("[object Collection]", sample.toString(), "Collection '.toString' return proper string.");
  });

  test("'.add' - single item", function () {
    var sample = new Collection();

    sample.add("hello");

    equal(1, sample.length, "Added item increases the length of the Collection.");
  });

  test("'.add' - array of items", function () {
    var sample = new Collection();

    /*Collection.add - */
    sample
      .add([
          "hello"
        , "world"
      ]);

    equal(2, sample.length, "Added item takes arrays as well as single items.");
  });

  test("'.each' - alias to Array.forEach", function () {
    var sample = new Collection()
      , temp;

    sample
      .add("hello")
      .add(" ")
      .add("world");

    temp = "";
    sample
      .each(function (item) {
        temp += item;
      });

    equal("hello world", temp, "Collection.each works.");
  });

  test("'.empty' - most likely only usefule for testing", function  () {
    var sample = new Collection();

    sample
      .add("hello")
      .add("world");

    sample.empty();
    equal(0, sample.length, "Collection.empty ... empties the collection.");
  });

  test("'.getNames' and '.named' - assumes that collections are made up of objects with '.name' properties", function () {
    var data = [{name: "Hanz"},{name: "Franz"}]
      , sample = new Collection();

    ok(sample.getNames, "'.getNames' is defined.");
    ok(util.isFunction(sample.getNames), "'.getNames' is a funciton.");

    ok(sample.getNames, "'.named' is defined.");
    ok(util.isFunction(sample.named), "'.named' is a funciton.");

    sample.add(data);

    equal([data[0].name, data[1].name].join()
        , sample.getNames().join()
        , "Names of elements from the collection.");

    equal(data[0].toString()
        , sample.named(data[0].name).toString()
        , "Names of elements from the collection.");

    equal(JSON.stringify(data.slice(0, 1))
        , JSON.stringify(sample.named(data[0].name))
        , "Names of elements from the collection.");
  });
});

/*jshint laxcomma:true*/
/*global define*/

define('Caste',[      "util"
  ], function (util) {
  

  var global = (function () {return this;}())
    , properties
    , validations;

  validations = [
    // return true if valid
      function name (value) {
      return util.isString(value) && value.length > 0;
    }

    , function dual (value) {
      return util.isArray(value);
    }

    , function HDT (value) {
      return util.isNumeric(value) && value > 2;
    }

    , function prefs (value) {
      return util.isArray(value) && value.length === 7;
    }

    , function saves (value) {
      return util.isArray(value) && value.length === 23;
    }

    , function skills () {
      return true;
    }

    , function spells () {
      return true;
    }

    , function thaco (value) {
      return util.isArray(value) && value.length === 25;
    }
  ];

  properties = validations
    .map(function (fn) {
      return fn.name;
    });

  function combinePrefs (a, b) {
    var i = 0
      , len = a.prefs.length
      , result = [];

    while (i < len) {
      if (!~result.indexOf(a.prefs[i])) {
        result.push(a.prefs[i]);
      }

      if (!~result.indexOf(b.prefs[i])) {
        result.push(b.prefs[i]);
      }

      i++;
    }

    return result;
  }

  function combineSaves (a, b) {

    return a.saves
      .map(function (_, level) {
        return _
          .reduce(function (acc, _, type) {
            acc.push(Math.min(a.saves[level][type], b.saves[level][type]));
            return acc;
          }, []);
      });
  }

  function combineSpells (a, b) {
    var result = [];

    result.push(a.spells ? a.spells : []);
    result.push(b.spells ? b.spells : []);

    return result;
  }

  function combineThaco (a, b) {
    return a.thaco
      .reduce(function (acc, _, indx) {
        acc.push(Math.min(a.thaco[indx], b.thaco[indx]));
        return acc;
      }, []);
  }

  function Caste (config) {
    if (this === global) {
      // called as a function instead of a constructor - fix it!
      return new Caste(config);
    }

    if (util.isValid(Caste.prototype.getType(), config, validations)) {
      properties.forEach(util.addGetter.bind(null, this, config));
    }
  }

  Caste.prototype = {
    getType: function () {

      return "[object Caste]";
    }

    ,toString: function () {

      return this.name;
    }
  };

  Caste.dual = function (a, b) {
    if (a === b || a === undefined || b === undefined) {
      throw new Error("Cannot dual Caste '" + a + "' with '" + b + "'.");
    }

    if (a.getType() !== Caste.prototype.getType()) {
      throw new Error("Caste.dual argument (alpha) is not an instance of Caste.");
    }

    if (b.getType() !== Caste.prototype.getType()) {
      throw new Error("Caste.dual argument (beta) is not an instance of Caste.");
    }

    return new Caste({
        // combining the two Caste instances
          name    : a.name + "/" + b.name
        , dual    : []
        , HDT     : (a.HDT + b.HDT) / 2
        , prefs   : combinePrefs(a, b)
        , saves   : combineSaves(a, b)
        , skills  : a.skills || b.skills
        , spells  : combineSpells(a, b)
        , thaco   : combineThaco(a, b)
      });
  };

  return Caste;
});
/*jshint laxcomma:true*/
/*global define*/

define('castes',[      "Collection", "Caste"
  ], function (Collection,   Caste) {
  

  var allCastes
    , saves = {
      // from DnD 1E DMG
        Cleric: [
        //ppd, pp,rsw, bw, sp
          [19, 19, 19, 19, 19] //  0th level charcter
        , [10, 13, 14, 16, 15] //  1
        , [10, 13, 14, 16, 15] //  2
        , [10, 13, 14, 16, 15] //  3
        , [ 9, 12, 13, 15, 14] //  4
        , [ 9, 12, 13, 15, 14] //  5
        , [ 9, 12, 13, 15, 14] //  6
        , [ 7, 10, 11, 13, 12] //  7
        , [ 7, 10, 11, 13, 12] //  8
        , [ 7, 10, 11, 13, 12] //  9
        , [ 6,  9, 10, 12, 11] // 10
        , [ 6,  9, 10, 12, 11] // 11
        , [ 6,  9, 10, 12, 11] // 12
        , [ 5,  8,  9, 11, 10] // 13
        , [ 5,  8,  9, 11, 10] // 14
        , [ 5,  8,  9, 11, 10] // 15
        , [ 4,  7,  8, 10,  9] // 16
        , [ 4,  7,  8, 10,  9] // 17
        , [ 4,  7,  8, 10,  9] // 18
        , [ 2,  5,  6,  8,  7] // 19
        , [ 2,  5,  6,  8,  7] // 20
        , [ 2,  5,  6,  8,  7] // 21
        , [ 1,  3,  4,  6,  5] // 22
      ]

      , Fighter: [
        //ppd, pp,rsw, bw, sp
          [16, 17, 18, 20, 19] //  0th level charcter
        , [14, 15, 16, 17, 17] //  1
        , [14, 15, 16, 17, 17] //  2
        , [13, 14, 15, 16, 16] //  3
        , [13, 14, 15, 16, 16] //  4
        , [11, 12, 13, 13, 14] //  5
        , [11, 12, 13, 13, 14] //  6
        , [10, 11, 12, 12, 13] //  7
        , [10, 11, 12, 12, 13] //  8
        , [ 8,  9, 10,  9, 11] //  9
        , [ 8,  9, 10,  9, 11] // 10
        , [ 7,  8,  9,  8, 10] // 11
        , [ 7,  8,  9,  8, 10] // 12
        , [ 5,  6,  7,  5,  8] // 13
        , [ 5,  6,  7,  5,  8] // 14
        , [ 4,  5,  6,  4,  7] // 15
        , [ 4,  5,  6,  4,  7] // 16
        , [ 3,  4,  5,  4,  6] // 17
        , [ 3,  4,  5,  4,  6] // 18
        , [ 2,  3,  4,  3,  5] // 19
        , [ 2,  3,  4,  3,  5] // 20
        , [ 1,  2,  3,  3,  4] // 21
        , [ 1,  2,  3,  3,  4] // 22
      ]

      , Mage: [
        //ppd, pp,rsw, bw, sp
          [19, 19, 19, 19, 19] //  0th level charcter
        , [14, 13, 11, 15, 12] //  1
        , [14, 13, 11, 15, 12] //  2
        , [14, 13, 11, 15, 12] //  3
        , [14, 13, 11, 15, 12] //  4
        , [14, 13, 11, 15, 12] //  5
        , [13, 11,  9, 13, 10] //  6
        , [13, 11,  9, 13, 10] //  7
        , [13, 11,  9, 13, 10] //  8
        , [13, 11,  9, 13, 10] //  9
        , [13, 11,  9, 13, 10] // 10
        , [11,  9,  7, 11,  8] // 11
        , [11,  9,  7, 11,  8] // 12
        , [11,  9,  7, 11,  8] // 13
        , [11,  9,  7, 11,  8] // 14
        , [11,  9,  7, 11,  8] // 15
        , [10,  7,  5,  9,  6] // 16
        , [10,  7,  5,  9,  6] // 17
        , [10,  7,  5,  9,  6] // 18
        , [10,  7,  5,  9,  6] // 19
        , [10,  7,  5,  9,  6] // 20
        , [ 8,  5,  3,  7,  4] // 21
        , [ 8,  5,  3,  7,  4] // 22
      ]

      , Thief: [
        //ppd, pp,rsw, bw, sp
          [19, 19, 19, 19, 19] //  0th level charcter
        , [13, 12, 14, 16, 15] //  1
        , [13, 12, 14, 16, 15] //  2
        , [13, 12, 14, 16, 15] //  3
        , [13, 12, 14, 16, 15] //  4
        , [12, 11, 12, 15, 13] //  5
        , [12, 11, 12, 15, 13] //  6
        , [12, 11, 12, 15, 13] //  7
        , [12, 11, 12, 15, 13] //  8
        , [11, 10, 10, 14, 11] //  9
        , [11, 10, 10, 14, 11] // 10
        , [11, 10, 10, 14, 11] // 11
        , [11, 10, 10, 14, 11] // 12
        , [10,  9,  8, 13,  9] // 13
        , [10,  9,  8, 13,  9] // 14
        , [10,  9,  8, 13,  9] // 15
        , [10,  9,  8, 13,  9] // 16
        , [ 9,  8,  6, 12,  7] // 17
        , [ 9,  8,  6, 12,  7] // 18
        , [ 9,  8,  6, 12,  7] // 19
        , [ 9,  8,  6, 12,  7] // 20
        , [ 8,  7,  4, 11,  5] // 21
        , [ 8,  7,  4, 11,  5] // 22
      ]
    }

    , thacos = {
     //            0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24th level
       Cleric  : [20, 20, 20, 18, 18, 18, 16, 16, 16, 14, 14, 14, 12, 12, 12, 10, 10, 10,  9,  9,  8,  8,  7,  6,  5]
     , Fighter : [20, 20, 18, 18, 16, 16, 14, 14, 12, 12, 10, 10,  8,  8,  6,  6,  4,  4,  4,  2,  2,  1,  1,  1,  1]
     , Mage    : [20, 20, 20, 20, 20, 19, 19, 19, 19, 19, 16, 16, 16, 16, 16, 13, 13, 13, 13, 13, 11, 11,  9,  8,  7]
     , Thief   : [20, 20, 20, 20, 19, 19, 19, 19, 16, 16, 16, 16, 14, 14, 14, 14, 12, 12, 12, 12, 10, 10,  8,  7,  6]
    }

    , thieving = {
      //                        1   2   3   4   5   6   7   8   9  10  11     12     13     14     15     16     17th level
        "Pick Pockets"      : [30, 35, 40, 45, 50, 55, 60, 65, 70, 80, 90  , 100  , 105  , 110  , 115  , 125  , 125  ]
      , "Open Locks"        : [25, 29, 33, 37, 42, 47, 52, 57, 62, 67, 72  ,  77  ,  82  ,  87  ,  92  ,  97  ,  99  ]
      , "Find/Remove Traps" : [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70  ,  75  ,  80  ,  85  ,  90  ,  95  ,  99  ]
      , "Move Silently"     : [15, 21, 27, 33, 40, 47, 55, 62, 70, 78, 86  ,  94  ,  99  ,  99  ,  99  ,  99  ,  99  ]
      , "Hide In Shadows"   : [10, 15, 20, 25, 31, 37, 43, 49, 56, 63, 70  ,  77  ,  85  ,  93  ,  99  ,  99  ,  99  ]
      , "Hear Noise"        : [10, 10, 15, 15, 20, 20, 25, 25, 30, 30, 35  ,  35  ,  40  ,  40  ,  50  ,  50  ,  55  ]
      , "Climb Walls"       : [85, 86, 87, 88, 90, 92, 94, 96, 98, 99, 99.1,  99.2,  99.3,  99.4,  99.5,  99.6,  99.7]
      , "Read Languages"    : [ 0,  0,  0, 20, 25, 30, 35, 40, 45, 50, 55  ,  60  ,  65  ,  70  ,  75  ,  80  ,  80  ]
    }

    , acrobating = { // page 24 UA
      //                                   1   2   3   4   5   6    7   8      9     10     11   12      13    14      15      16      17   18      19   20      21   22     23   24th level
        "Tightrope Walking"           : [  0,  0,  0,  0,  0,  0,  75, 80   , 85   , 90   , 95, 100   , 100  ,100   , 100   , 100   , 100, 100   , 100, 100   , 100, 100  , 100, 100  ]
      , "Pole Vaulting"               : [  0,  0,  0,  0,  0,  0,   9,  9.5 , 10   , 10.5 , 11,  11.5 ,  12  , 12.5 ,  13   ,  13.5 ,  14,  14.5 ,  15,  15.5 ,  16,  16.5,  17,  17.5]
      , "High Jumping"                : [  0,  0,  0,  0,  0,  0,   4,  4.25,  4.50,  4.75,  5,   5.25,  5.50,  5.75,   6.25,   6.50,   7,   7.50,   8,   8.50,   9,   9  ,   9,   9  ]
      , "Standing Long Jump"          : [  0,  0,  0,  0,  0,  0,   5,  5.5 ,  6   ,  6.5 ,  7,   7.5 ,  8   ,  8.5 ,   9   ,   9.5 ,  10,  10.5 ,  11,  11.5 ,  12,  12  ,  12,  12  ]
      , "Running Long Jump"           : [  0,  0,  0,  0,  0,  0,   9,  9.5 , 10   , 10.5 , 11,  11.5 ,  12  , 13   ,  14   ,  15   ,  16,  17   ,  18,  19   ,  20,  21  ,  22,  22  ]
      , "Tumbling Maneuvers: Attack"  : [  0,  0,  0,  0,  0,  0,   6,  7   ,  8   ,  9   , 10,  11   ,  12  , 13   ,  14   ,  15   ,  16,  17   ,  18,  19   ,  20,  20  ,  20,  20  ]
      , "Tumbling Maneuvers: Evasion" : [  0,  0,  0,  0,  0,  0,  10, 15   , 20   , 25   , 30,  35   ,  40  , 45   ,  50   ,  52   ,  54,  56   ,  58,  60   ,  60,  60  ,  60,  60  ]
      , "Tumbling Maneuvers: Falling" : [  0,  0,  0,  0,  0,  0
                                          , "25%, 10'" //  7
                                          , "50%, 10'" //  8
                                          , "75%, 10'" //  9
                                          , "25%, 20'" // 10
                                          , "50%, 20'" // 11
                                          , "75%, 20'" // 12
                                          , "25%, 30'" // 13
                                          , "50%, 30'" // 14
                                          , "75%, 30'" // 15
                                          , "20%, 40'" // 16
                                          , "40%, 40'" // 17
                                          , "60%, 40'" // 18
                                          , "80%, 40'" // 19
                                          , "20%, 50'" // 20
                                          , "40%, 50'" // 21
                                          , "60%, 50'" // 22
                                          , "80%, 50'" // 23
                                          , "20%, 60'" // 24
                                        ]
    }

    , classConfigs = [
      {
          name    : "Acrobat"
        , dual    : []
        , HDT     : 6
                                    // 3   4   0   1   5   2   6   //
                                    // Dex Con Str Int Cha Wis Com //
        , prefs   : [3,4,0,1,5,2,6]
        , saves   : saves.Thief
        , skills  : acrobating
        , thaco   : thacos.Thief
      }

      , {
          name    : "Archer"
        , dual    : []
        , HDT     : 8
                                    // 3   0   4   2   1   5   6   //
                                    // Dex Str Con Wis Int Cha Com //
        , prefs   : [3,0,4,2,1,5,6]
        , saves   : saves.Cleric
        , thaco   : thacos.Cleric
      }

      , {
          name    : "Assassin"
        , dual    : []
        , HDT     : 6
                                    // 5   3   1   4   0   2   6   //
                                    // Cha Dex Int Con Str Wis Com //
        , prefs   : [5,3,1,4,0,2,6]
        , saves   : saves.Thief
        , thaco   : thacos.Thief
      }

      , {
          name    : "Barbarian"
        , dual    : []
        , HDT     : 12
                                    // 0   4   3   1   6   2   5   //
                                    // Str Con Dex Int Com Wis Cha //
        , prefs   : [0,4,3,1,6,2,5]
        , saves   : saves.Fighter
        , thaco   : thacos.Fighter
      }

      , {
          name    : "Bard"
        , dual    : []
        , HDT     : 12
                                    // 5   1   3   6   2   4   0   //
                                    // Cha Int Dex Com Wis Con Str //
        , prefs   : [5,1,3,6,2,4,0]
        , saves   : saves.Fighter
        , spells  : [
          //TODO: fill out these values...?
          // 1 2 3 4 5 6 7  Spell level
            [0,0,0,0,0,0,0]  //  0th level character
          , [0,0,0,0,0,0,0]  //  1
          , [0,0,0,0,0,0,0]  //  2
          , [0,0,0,0,0,0,0]  //  3
          , [0,0,0,0,0,0,0]  //  4
          , [0,0,0,0,0,0,0]  //  5
          , [0,0,0,0,0,0,0]  //  6
          , [0,0,0,0,0,0,0]  //  7
          , [0,0,0,0,0,0,0]  //  8
          , [0,0,0,0,0,0,0]  //  9
          , [0,0,0,0,0,0,0]  // 10
          , [0,0,0,0,0,0,0]  // 11
          , [0,0,0,0,0,0,0]  // 12
          , [0,0,0,0,0,0,0]  // 13
          , [0,0,0,0,0,0,0]  // 14
          , [0,0,0,0,0,0,0]  // 15
          , [0,0,0,0,0,0,0]  // 16
          , [0,0,0,0,0,0,0]  // 17
          , [0,0,0,0,0,0,0]  // 18
          , [0,0,0,0,0,0,0]  // 19
          , [0,0,0,0,0,0,0]  // 20
          , [0,0,0,0,0,0,0]  // 21
          , [0,0,0,0,0,0,0]  // 22
          , [0,0,0,0,0,0,0]  // 23
          , [0,0,0,0,0,0,0]  // 24
          , [0,0,0,0,0,0,0]  // 25
          , [0,0,0,0,0,0,0]  // 26
          , [0,0,0,0,0,0,0]  // 27
          , [0,0,0,0,0,0,0]  // 28
          , [0,0,0,0,0,0,0]  // 29
        ]
        , thaco   : thacos.Fighter
      }

      , {
          name    : "Cavalier"
        , dual    : []
        , HDT     : 10
                                    // 0   3   4   1   5   6   2   //
                                    // Str Dex Con Int Cha Com Wis //
        , prefs   : [0,3,4,1,5,6,2]
        , saves   : saves.Fighter
        , thaco   : thacos.Fighter
      }

      , {
          name    : "Cleric"
        , dual    : [
            "Fighter"
          , "Illusionist"
          , "Mage"
          , "Thief"
        ]
        , HDT     : 8
                                    // 2   4   3   1   0   5   6   //
                                    // Wis Con Dex Int Str Cha Com //
        , prefs   : [2,4,3,1,0,5,6]
        , saves   : saves.Cleric
        , spells  : [
          // 1 2 3 4 5 6 7  Spell level
            [0,0,0,0,0,0,0]  //  0th level character
          , [1,0,0,0,0,0,0]  //  1
          , [2,0,0,0,0,0,0]  //  2
          , [2,1,0,0,0,0,0]  //  3
          , [3,2,0,0,0,0,0]  //  4
          , [3,3,1,0,0,0,0]  //  5
          , [1,3,2,0,0,0,0]  //  6
          , [1,3,2,1,0,0,0]  //  7
          , [3,3,3,2,0,0,0]  //  8
          , [4,4,3,2,1,0,0]  //  9
          , [4,4,3,3,2,0,0]  // 10
          , [5,4,4,3,2,1,0]  // 11
          , [6,5,5,3,2,2,0]  // 12
          , [6,6,6,4,2,2,0]  // 13
          , [6,6,6,5,3,2,0]  // 14
          , [7,7,7,5,4,2,0]  // 15
          , [7,7,7,6,5,3,1]  // 16
          , [8,8,8,6,5,3,1]  // 17
          , [8,8,8,7,6,4,1]  // 18
          , [9,9,9,7,6,4,2]  // 19
          , [9,9,9,8,7,5,2]  // 20
          , [9,9,9,9,8,6,2]  // 21
          , [9,9,9,9,9,6,3]  // 22
          , [9,9,9,9,9,7,3]  // 23
          , [9,9,9,9,9,8,3]  // 24
          , [9,9,9,9,9,8,4]  // 25
          , [9,9,9,9,9,9,4]  // 26
          , [9,9,9,9,9,9,5]  // 27
          , [9,9,9,9,9,9,6]  // 28
          , [9,9,9,9,9,9,7]  // 29
        ]
        , thaco   : thacos.Cleric
      }

      , {
          name    : "Druid"
        , dual    : [
            "Fighter"
          , "Illusionist"
          , "Mage"
          , "Thief"
        ]
        , HDT     : 8
                                    // 2   5   3   4   1   0   6   //
                                    // Wis Cha Dex Con Int Str Com //
        , prefs   : [2,5,3,4,1,0,6]
        , saves   : saves.Cleric
        , spells  : [
          // 1 2 3 4 5 6 7  Spell level
            [0,0,0,0,0,0,0]  //  0th level character
          , [2,0,0,0,0,0,0]  //  1
          , [2,1,0,0,0,0,0]  //  2
          , [3,2,1,0,0,0,0]  //  3
          , [4,2,2,0,0,0,0]  //  4
          , [4,3,2,0,0,0,0]  //  5
          , [4,3,2,1,0,0,0]  //  6
          , [4,4,3,1,0,0,0]  //  7
          , [4,4,3,2,0,0,0]  //  8
          , [5,4,3,2,1,0,0]  //  9
          , [5,4,3,3,2,0,0]  // 10
          , [5,5,3,3,2,1,0]  // 11
          , [5,5,4,4,3,2,1]  // 12
          , [6,5,5,5,4,3,2]  // 13
          , [6,5,6,5,4,3,3]  // 14
          , [6,6,6,5,4,3,3]  // 15
          , [6,6,6,5,4,3,3]  // 16
          , [7,6,6,6,4,3,3]  // 17
          , [7,6,6,6,5,4,4]  // 18
          , [7,7,6,6,5,4,4]  // 19
          , [7,7,6,6,5,4,4]  // 20
          , [8,7,7,7,5,4,4]  // 21
          , [8,7,7,7,5,4,4]  // 22
          , [8,8,7,7,6,5,4]  // 23
          , [8,8,8,7,6,5,4]  // 24
          , [9,8,8,7,6,5,4]  // 25
          , [9,8,8,8,6,5,4]  // 26
          , [9,9,8,8,6,5,5]  // 27
          , [9,9,8,8,7,6,5]  // 28
          , [9,9,9,9,7,6,6]  // 29
        ]
        , thaco   : thacos.Cleric
      }

      , {
          name    : "Fighter"
        , dual    : [
            "Cleric"
          , "Druid"
          , "Illusionist"
          , "Mage"
          , "Thief"
        ]
        , HDT     : 10
                                    // 0   4   3   5   1   6   2   //
                                    // Str Con Dex Cha Int Com Wis //
        , prefs   : [0,4,3,5,1,6,2]
        , saves   : saves.Fighter
        , thaco   : thacos.Fighter
      }

      , {
          name    : "Illusionist"
        , dual    : [
            "Cleric"
          , "Druid"
          , "Fighter"
          , "Thief"
        ]
        , HDT     : 4
                                    // 1   3   6   5   4   2   0   //
                                    // Int Dex Com Cha Con Wis Str //
        , prefs   : [1,3,6,5,4,2,0]
        , saves   : saves.Mage
        , spells  : [
          // 1 2 3 4 5 6 7  Spell level
            [0,0,0,0,0,0,0]  //  0th level character
          , [1,0,0,0,0,0,0]  //  1
          , [2,0,0,0,0,0,0]  //  2
          , [2,1,0,0,0,0,0]  //  3
          , [3,2,0,0,0,0,0]  //  4
          , [4,2,1,0,0,0,0]  //  5
          , [4,3,1,0,0,0,0]  //  6
          , [4,3,2,0,0,0,0]  //  7
          , [4,3,2,1,0,0,0]  //  8
          , [4,3,3,2,0,0,0]  //  9
          , [5,4,3,2,1,0,0]  // 10
          , [5,4,4,3,2,0,0]  // 11
          , [5,5,4,3,2,1,0]  // 12
          , [5,5,4,3,2,2,0]  // 13
          , [5,5,4,3,2,2,1]  // 14
          , [5,5,5,4,2,2,2]  // 15
          , [5,5,5,4,3,2,2]  // 16
          , [5,5,5,5,3,2,2]  // 17
          , [5,5,5,5,3,3,2]  // 18
          , [5,5,5,5,4,3,2]  // 19
          , [5,5,5,5,4,3,3]  // 20
          , [5,5,5,5,5,4,3]  // 21
          , [5,5,5,5,5,5,4]  // 22
          , [5,5,5,5,5,5,5]  // 23
          , [6,6,6,6,5,5,5]  // 24
          , [6,6,6,6,6,6,6]  // 25
          , [7,7,7,7,6,6,6]  // 26
          , [8,7,7,7,6,6,6]  // 27
          , [9,8,7,7,6,6,6]  // 28
          , [9,9,9,7,7,7,7]  // 29
        ]
        , thaco   : thacos.Mage
      }

      , {
          name    : "Mage"
        , dual    : [
            "Cleric"
          , "Druid"
          , "Fighter"
          , "Thief"
        ]
        , HDT     : 4
                                    // 1   3   2   5   4   0   6   //
                                    // Int Dex Wis Cha Con Str Com //
        , prefs   : [1,3,2,5,4,0,6]
        , saves   : saves.Mage
        , spells  : [
          // 1 2 3 4 5 6 7 8 9  Spell level
            [0,0,0,0,0,0,0,0,0]  //  0th level character
          , [1,0,0,0,0,0,0,0,0]  //  1
          , [2,0,0,0,0,0,0,0,0]  //  2
          , [2,1,0,0,0,0,0,0,0]  //  3
          , [3,2,0,0,0,0,0,0,0]  //  4
          , [4,2,1,0,0,0,0,0,0]  //  5
          , [4,2,2,0,0,0,0,0,0]  //  6
          , [4,3,2,1,0,0,0,0,0]  //  7
          , [4,3,3,2,0,0,0,0,0]  //  8
          , [4,3,3,2,1,0,0,0,0]  //  9
          , [4,4,3,2,2,0,0,0,0]  // 10
          , [4,4,4,3,3,0,0,0,0]  // 11
          , [4,4,4,4,4,1,0,0,0]  // 12
          , [5,5,5,4,4,2,0,0,0]  // 13
          , [5,5,5,4,4,2,1,0,0]  // 14
          , [5,5,5,5,5,2,1,0,0]  // 15
          , [5,5,5,5,5,3,2,1,0]  // 16
          , [5,5,5,5,5,3,3,2,0]  // 17
          , [5,5,5,5,5,3,3,2,1]  // 18
          , [5,5,5,5,5,3,3,3,1]  // 19
          , [5,5,5,5,5,4,3,3,2]  // 20
          , [5,5,5,5,5,4,4,4,2]  // 21
          , [5,5,5,5,5,5,4,4,3]  // 22
          , [5,5,5,5,5,5,5,5,3]  // 23
          , [5,5,5,5,5,5,5,5,4]  // 24
          , [5,5,5,5,5,5,5,5,5]  // 25
          , [6,6,6,6,5,5,5,5,5]  // 26
          , [6,6,6,6,6,6,6,5,5]  // 27
          , [6,6,6,6,6,6,6,6,6]  // 28
          , [7,7,7,7,6,6,6,6,6]  // 29
        ]
        , thaco   : thacos.Mage
      }

      , {
          name    : "Monk"
        , dual    : []
        , HDT     : 4
                                    // 3   4   2   1   0   5   6   //
                                    // Dex Con Wis Int Str Cha Com //
        , prefs   : [3,4,2,1,0,5,6]
        , saves   : saves.Thief
        , thaco   : thacos.Cleric
      }

      , {
          name    : "Paladin"
        , dual    : []
        , HDT     : 10
                                    // 0   4   3   5   1   2   6   //
                                    // Str Con Dex Cha Int Wis Com //
        , prefs   : [0,4,3,5,1,2,6]
        , saves   : saves.Fighter
        , spells  : [
          // 1 2 3 4  Spell level
            [0,0,0,0]  //  0th level character
          , [0,0,0,0]  //  1
          , [0,0,0,0]  //  2
          , [0,0,0,0]  //  3
          , [0,0,0,0]  //  4
          , [0,0,0,0]  //  5
          , [0,0,0,0]  //  6
          , [0,0,0,0]  //  7
          , [0,0,0,0]  //  8
          , [1,0,0,0]  //  9
          , [2,0,0,0]  // 10
          , [2,1,0,0]  // 11
          , [2,2,0,0]  // 12
          , [2,2,1,0]  // 13
          , [3,2,1,0]  // 14
          , [3,2,1,1]  // 15
          , [3,3,1,1]  // 16
          , [3,3,2,1]  // 17
          , [3,3,3,1]  // 18
          , [4,3,3,2]  // 19
          , [4,3,3,3]  // 20
          , [4,3,3,3]  // 21
          , [4,4,3,3]  // 22
          , [4,4,3,3]  // 23
          , [5,4,4,3]  // 24
          , [5,4,4,3]  // 25
          , [5,4,4,3]  // 26
          , [5,5,5,4]  // 27
          , [5,5,5,4]  // 28
          , [6,5,5,4]  // 29
        ]
        , thaco   : thacos.Fighter
      }

      , {
          name    : "Ranger"
        , dual    : []
        , HDT     : 10
                                    // 4   1   3   0   2   5   6   //
                                    // Con Int Dex Str Wis Cha Com //
        , prefs   : [4,1,3,0,2,5,6]
        , saves   : saves.Fighter
        , spells  : [
          // 1 2 3 4 5  Spell level
            [0,0,0,0,0]  //  0th level character
          , [0,0,0,0,0]  //  1
          , [0,0,0,0,0]  //  2
          , [0,0,0,0,0]  //  3
          , [0,0,0,0,0]  //  4
          , [0,0,0,0,0]  //  5
          , [0,0,0,0,0]  //  6
          , [0,0,0,0,0]  //  7
          , [1,0,0,0,0]  //  8
          , [1,0,0,1,0]  //  9
          , [2,0,0,1,0]  // 10
          , [2,0,0,2,0]  // 11
          , [2,1,0,2,0]  // 12
          , [2,1,0,2,1]  // 13
          , [2,2,0,2,1]  // 14
          , [2,2,0,2,2]  // 15
          , [2,2,1,2,2]  // 16
          , [3,2,2,2,2]  // 17
          , [3,2,2,2,2]  // 18
          , [3,2,2,2,2]  // 19
          , [3,3,2,2,2]  // 20
          , [3,3,2,2,2]  // 21
          , [3,3,2,2,2]  // 22
          , [3,3,3,2,2]  // 23
          , [3,3,3,2,2]  // 24
          , [4,3,3,2,2]  // 25
          , [4,4,3,3,2]  // 26
          , [4,4,4,3,2]  // 27
          , [4,4,4,3,2]  // 28
          , [5,4,4,4,3]  // 29
        ]
        , thaco   : thacos.Fighter
      }

      , {
          name    : "Thief"
        , dual    : [
            "Cleric"
          , "Fighter"
          , "Druid"
          , "Illusionist"
          , "Mage"
        ]
        , HDT     : 6
                                    // 3   1   5   4   0   6   2   //
                                    // Dex Int Cha Con Str Com Wis //
        , prefs   : [3,1,5,4,0,6,2]
        , saves   : saves.Thief
        , skills  : thieving
        , thaco   : thacos.Thief
      }
    ];

  allCastes = new Collection(classConfigs.map(Caste));

  allCastes.duals = function () {
      return new Collection().add(allCastes.filter(function (item) {
        return item.dual.length > 0;
      }));
    }.bind(allCastes);

  return allCastes;
});
/*jshint laxcomma:true*/
/*global define*/

define('Race',[      "util"
  ], function (util) {
  

  var global = (function () {return this;}())
    , properties
    , validations;

  validations = [
    function name (value) {
      return !!value && util.isString(value);
    }

    , function infravision (value) {
      return util.isNumeric(value);
    }

    , function languages (value) {
      return !!value.length && util.isArray(value);
    }

    , function move (value) {
      return util.isNumeric(value) && value > 0;
    }

    , function notes (value) {
      return value === "" || util.isString(value);
    }

    , function saves (value) {
      return value.length === 5 && value.every(util.isNumeric);
    }

    , function stats (value) {
      return value.length === 7 && value.every(util.isNumeric);
    }

    , function thieving (value) {
      return value.length === 8 && value.every(util.isNumeric);
    }
  ];

  properties = validations
    .map(function (fn) {
      return fn.name;
    });

  function Race (config) {
    if (this === global) {
      // called as a function instead of a constructor - fix it!
      return new Race(config);
    }

    if (util.isValid(Race.prototype.getType(), config, validations)) {
      properties.forEach(util.addGetter.bind(null, this, config));
    }
  }

  Race.prototype = {
    getType: function () {
      return "[object Race]";
    }

    ,toString: function () {
      return this.name;
    }
  };

  return Race;
});
/*jshint laxcomma:true*/
/*global define*/

define('races',[      "Collection", "Race"
  ], function (Collection,   Race) {
  

  function pickLanguages (languages, ar) {

    return [languages[~~ar.shift()]]
      .concat(!ar.length ? [] : pickLanguages(languages, ar));
  }

  var list
    , languages = [
        // standard languages
          "burrowing mammal"
        , "dwarven"
        , "elvish"
        , "gnoll"
        , "gnome"
        , "goblin"
        , "halfling"
        , "hobgoblin"
        , "kobold"
        , "orcish"
        , "common"
      ]

    , racesConfigs =  [
        {
            name        : "Dwarf"
          , infravision : 60
          , languages   : pickLanguages(languages, [4, 5, 8, 9])
          , move        : 6
          , notes       : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
          , saves       : [1, 0, 1, 0, 1]
          , stats       : [0, 0, 0, 0, 1, -1, 0]
          , thieving    : [0, 10, 15, 0, 0, 0, -10, -5]
        }

        , {
            name        : "Elf"
          , infravision : 60
          , languages   : pickLanguages(languages, [3, 4, 5, 6, 7, 9])
          , move        : 12
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [0, 0, 0, 1, -1, 0, 0]
          , thieving    : [5, -5, 0, 5, 10, 5, 0, 0]
        }

        , {
            name        : "Gnome"
          , infravision : 60
          , languages   : pickLanguages(languages, [0, 1, 6, 5, 8])
          , move        : 6
          , notes       : "+1 on saves(rsw, sp) for each 3 1/2 of con"
          , saves       : [0, 0, 1, 0, 1]
          , stats       : [-1, 0, 0, 1, 0, 0, 0]
          , thieving    : [0, 5, 10, 5, 5, 10, 15, 0]
        }

        , {
            name        : "Goblin"
          , infravision : 30
          , languages   : pickLanguages(languages, [1, 3, 7, 8])
          , move        : 8
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [-1, 1, 0, 1, 0, -1, 0]
          , thieving    : [ 0, 15, 10, 0, 0, 15, 0, 15]
        }

        , {
            name        : "Half-Elf"
          , infravision : 60
          , languages   : pickLanguages(languages, [3, 4, 5, 6, 7, 9])
          , move        : 12
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [0, 0, 0, 0, 0, 0, 0]
          , thieving    : [10, 0, 0, 5, 0, 0, 0, 0]
        }

        , {
            name        : "Half-Orc"
          , infravision : 60
          , languages   : pickLanguages(languages, [9])
          , move        : 12
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [1, 0, 0, 0, 1, -1, 0]
          , thieving    : [ -5, 5, 5, 0, 0, 5, 5, -10]
        }

        , {
            name        : "Halfling"
          , infravision : 30
          , languages   : pickLanguages(languages, [1, 2, 4, 5, 9])
          , move        : 6
          , notes       : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
          , saves       : [1, 0, 1, 0, 1]
          , stats       : [-1, 0, 0, 1, 0, 0, 0]
          , thieving    : [ 5, 5, 5, 10, 15, 5, -15, -5]
        }

        , {
            name        : "Human"
          , infravision : 0
          , languages   : pickLanguages(languages, [10])
          , move        : 12
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [0, 0, 0, 0, 0, 0, 0]
          , thieving    : [0, 0, 0, 0, 0, 0, 0, 0]
        }
      ];

  list = new Collection(racesConfigs.map(Race));

  list.languages = languages.slice(0);

  return list;
});
/*jshint laxcomma:true*/
/*global define*/

define('Trait',[      "util"
  ], function (util) {
  

  var global = (function () {return this;}())
    , validations;

  validations = [
    function name (value) {
      return !!value && util.isString(value);
    }

    , function detail (value) {
      return !!value && util.isString(value);
    }

    , function table (value) {
      return util.isArray(value) && value.length === 25;
    }
  ];

  function format (template, data) {
    return data.reduce(function (acc, item, indx) {
      return acc.replace("{" + indx + "}", item);
    }, template);
  }

  function isValidExceptional (value) {
    return util.isNumeric(value) && +value > 0 && +value < 101;
  }

  function Trait (config) {
    if (this === global) {
      // called as a function instead of a constructor - fix it!
      return new Trait(config);
    }

    if (util.isValid(Trait.prototype.getType(), config, validations)) {
      this.__defineGetter__("name", function () {
        return config.name;
      });

      this.__defineGetter__("detail", function () {
        return config.detail;
      });

      this.__defineGetter__("table", function () {
        return JSON.parse(JSON.stringify(config.table.slice(0)));
      });

      if (config.exceptional) {
        this.__defineGetter__("exceptional", function () {
          return JSON.parse(JSON.stringify(config.exceptional.slice(0)));
        });
      }
    }
  }

  Trait.prototype = {
    details: function (score, exceptional) {
      if (!this.table[score]) {
        throw new Error("Must pass in a valid score to get details for an Trait.");
      }

      if (this.name === "Strength" && score === 18 && arguments.length === 2) {
        if (!util.isNumeric(exceptional) || +exceptional < 1 || +exceptional > 100) {
          throw new Error("Must pass in a valid (1-100) exceptional strength value.");
        } else {
          return format(this.detail, this.exceptional
            // filter out the tables that 'exceptional' is not less than the max
            .filter(function (item) {
              return item.max >= exceptional;
            // return the lowest table that the exceptional value falls into
            })[0].table);
        }
      }

      return format(this.detail, this.table[score]);
    }

    , getType: function () {
      return "[object Trait]";
    }

    , toString: function () {
      return this.name;
    }
  };

  return Trait;
});
/*jshint laxcomma:true*/
/*global define*/

define('traits',[      "Trait", "Collection"
  ], function (Trait,   Collection) {
  

  var abilities
    , abilityConfigs;

  abilityConfigs = [
    {   name  : "Strength"
      , detail: "THAC0 Adjustment: {0}, Damage Adjustment: {1}, Weight Adjustment: {2}, Open Doors: {3}, Bend Bars: {4}"
      , table : [
        [],[],[] // tables start at ability score 3
        , [-3, -1, -350,   '1/6',  0] //  3
        , [-2, -1, -250,   '1/6',  0] //  4
        , [-2, -1, -250,   '1/6',  0] //  5
        , [-1,  0, -150,   '1/6',  0] //  6
        , [-1,  0, -150,   '1/6',  0] //  7
        , [ 0,  0,    0,   '2/6',  1] //  8
        , [ 0,  0,    0,   '2/6',  1] //  9
        , [ 0,  0,    0,   '2/6',  2] // 10
        , [ 0,  0,    0,   '2/6',  2] // 11
        , [ 0,  0,  100,   '2/6',  4] // 12
        , [ 0,  0,  100,   '2/6',  4] // 13
        , [ 0,  0,  200,   '2/6',  7] // 14
        , [ 0,  0,  200,   '2/6',  7] // 15
        , [ 0,  1,  350,   '3/6', 10] // 16
        , [ 1,  1,  500,   '3/6', 13] // 17
        , [ 1,  2,  750,   '3/6', 16] // 18

        , [ 3,  7, 1250,   '7/8', 25] // 19
        , [ 3,  8, 1750,   '7/8', 38] // 20
        , [ 4,  9, 2250,  '9/10', 50] // 21
        , [ 4, 10, 2750, '11/12', 65] // 22
        , [ 5, 11, 3250, '11/12', 73] // 23
        , [ 6, 12, 3600, '19/20', 82] // 24
      ]
      , exceptional: [
          { min:   1, max:  50, table: [ 1,  3, 1000,   '3/6', 20] }
        , { min:  51, max:  75, table: [ 2,  3, 1250,   '4/6', 25] }
        , { min:  76, max:  90, table: [ 2,  4, 1500,   '4/6', 30] }
        , { min:  91, max:  99, table: [ 2,  5, 2000,   '4/6', 35] }
        , { min: 100, max: 100, table: [ 3,  6, 3000,   '5/6', 40] }
      ]}

    , { name  : "Intelligence"
      , detail: "Additional Languages: {0}, Know Spell: {1}, Minimum Spells: {2}, Maximum Spells: {3}"
      , table : [
        [],[],[] // tables start at ability score 3
        , [ 0,  0,  0,  0] //  3
        , [ 0,  0,  0,  0] //  4
        , [ 0,  0,  0,  0] //  5
        , [ 0,  0,  0,  0] //  6
        , [ 0,  0,  0,  0] //  7
        , [ 1,  0,  0,  0] //  8
        , [ 1, 35,  4,  6] //  9
        , [ 2, 45,  5,  7] // 10
        , [ 2, 45,  5,  7] // 11
        , [ 3, 45,  5,  7] // 12
        , [ 3, 55,  6,  9] // 13
        , [ 4, 55,  6,  9] // 14
        , [ 4, 65,  7, 11] // 15
        , [ 5, 65,  7, 11] // 16
        , [ 6, 75,  8, 14] // 17
        , [ 7, 85,  9, 18] // 18
        , [ 8, 95, 10, 99] // 19
        , [ 9, 98, 11, 99] // 20
        , [10, 98, 12, 99] // 21
        , [11, 98, 13, 99] // 22
        , [12, 98, 13, 99] // 23
        , [12, 98, 14, 99] // 24
      ]}

    , { name  : "Wisdom"
      , detail: "Magic Adjustment: {0}, Spell Failure: {1}, Bonus Spells: {2}"
      , table : [
        [],[],[] // tables start at ability score 3
        , [-3, 100, ""] //  3
        , [-2, 100, ""] //  4
        , [-1, 100, ""] //  5
        , [-1, 100, ""] //  6
        , [-1, 100, ""] //  7
        , [ 0, 100, ""] //  8
        , [ 0,  20, ""] //  9
        , [ 0,  15, ""] // 10
        , [ 0,  10, ""] // 11
        , [ 0,   5, ""] // 12
        , [ 0,   0, "1"] // 13
        , [ 0,   0, "2"] // 14
        , [ 1,   0, "21"] // 15
        , [ 2,   0, "22"] // 16
        , [ 3,   0, "221"] // 17
        , [ 4,   0, "2211"] // 18
        , [ 5,   0, "22111"] // 19
        , [ 6,   0, "221111"] // 20
        , [ 6,   0, "332111"] // 21
        , [ 6,   0, "332211"] // 22
        , [ 6,   0, "443211"] // 23
        , [ 6,   0, "4433111"] // 24
      ]}

    , { name  : "Dexterity"
      , detail: "Reaction Adjustment: {0}, Missile Adjustment: {1}, Defensive Adjustment: {2}"
      , table : [
        [],[],[] // tables start at ability score 3
        , [-3, -3,  4] //  3
        , [-2, -2,  3] //  4
        , [-1, -1,  2] //  5
        , [ 0,  0,  1] //  6
        , [ 0,  0,  0] //  7
        , [ 0,  0,  0] //  8
        , [ 0,  0,  0] //  9
        , [ 0,  0,  0] // 10
        , [ 0,  0,  0] // 11
        , [ 0,  0,  0] // 12
        , [ 0,  0,  0] // 13
        , [ 0,  0,  0] // 14
        , [ 0,  0, -1] // 15
        , [ 1,  1, -2] // 16
        , [ 2,  2, -3] // 17
        , [ 3,  3, -4] // 18
        , [ 4,  4, -5] // 19
        , [ 5,  5, -6] // 20
        , [ 6,  6, -6] // 21
        , [ 6,  6, -7] // 22
        , [ 6,  7, -7] // 23
        , [ 7,  7, -8] // 24
      ]}

    , { name  : "Constitution"
      , detail: "HP Adjustment: {0}, System Shock: {1}, Raise Survival: {2}, Number of times Raised: {3}"
      , table : [
        [],[],[] // tables start at ability score 3
        , [-2,  35,  40,  0] //  3
        , [-1,  40,  45,  0] //  4
        , [-1,  45,  50,  0] //  5
        , [-1,  50,  55,  0] //  6
        , [ 0,  55,  60,  0] //  7
        , [ 0,  60,  65,  0] //  8
        , [ 0,  65,  70,  0] //  9
        , [ 0,  70,  75,  0] // 10
        , [ 0,  75,  80,  0] // 11
        , [ 0,  80,  85,  0] // 12
        , [ 0,  85,  90,  0] // 13
        , [ 0,  88,  92,  0] // 14
        , [ 1,  91,  94,  0] // 15
        , [ 2,  95,  96,  0] // 16
        , [ 3,  97,  98,  0] // 17
        , [ 4,  99, 100,  0] // 18
        , [ 4, 100, 100,  0] // 19
        , [ 5, 100, 100,  0] // 20
        , [ 5, 100, 100,  0] // 21
        , [ 6, 100, 100,  0] // 22
        , [ 7, 100, 100,  0] // 23
        , [10, 100, 100,  0] // 24
      ]}

    , { name  : "Charisma"
      , detail: "Max Henchment: {0}, Base Loyalty: {1}, Reaction Adjustment: {2}"
      , table : [
        [],[],[] // tables start at ability score 3
        , [ 1, -30, -25,  -5] //  3
        , [ 1, -25, -20,  -3] //  4
        , [ 2, -20,  15,  -3] //  5
        , [ 2, -15, -10,  -1] //  6
        , [ 3, -10,  -5,  -1] //  7
        , [ 3,  -5,   0,  -1] //  8
        , [ 4,   0,   0,   0] //  9
        , [ 4,   0,   0,   0] // 10
        , [ 4,   0,   0,   0] // 11
        , [ 5,   0,   0,   0] // 12
        , [ 5,   0,   5,   1] // 13
        , [ 6,   5,  10,   1] // 14
        , [ 7,  15,  15,   1] // 15
        , [ 8,  20,  25,   2] // 16
        , [10,  30,  30,   2] // 17
        , [15,  40,  35,   3] // 18
        , [18,  55,  45,   5] // 19
        , [24,  75,  65,   5] // 20
        , [27,  85,  75,   7] // 21
        , [30,  89,  80,  10] // 22
        , [32,  93,  83,  11] // 23
        , [35,  97,  86,  12] // 24
      ]}

    , { name  : "Comeliness"
      , detail: "Response: {0}, Charisma Bonus: {1}"
      , table : [ // page 6 in UA - look it up
        [],[],[] // tables start at ability score 3
        , ['', '', ''] //  3
        , ['', '', ''] //  4
        , ['', '', ''] //  5
        , ['', '', ''] //  6
        , ['', '', ''] //  7
        , ['', '', ''] //  8
        , ['', '', ''] //  9
        , ['', '', ''] // 10
        , ['', '', ''] // 11
        , ['', '', ''] // 12
        , ['', '', ''] // 13
        , ['', '', ''] // 14
        , ['', '', ''] // 15
        , ['', '', ''] // 16
        , ['', '', ''] // 17
        , ['', '', ''] // 18
        , ['', '', ''] // 19
        , ['', '', ''] // 20
        , ['', '', ''] // 21
        , ['', '', ''] // 22
        , ['', '', ''] // 23
        , ['', '', ''] // 24
      ]}
  ];

  abilities = new Collection(abilityConfigs.map(Trait));

  // create easy to use accessors as named properties that point to indexed values
  abilities
    .forEach(function (item, indx, src) {
        abilities[item.name] =
        abilities[item.name.slice(0, 3).toLowerCase()] = src[indx];
    });

  return abilities;
});
/*jshint laxcomma:true*/
/*global define*/

define('Player',[      "traits", "util"
  ], function (traits,   util) {
  

  var properties
    , validations;

  validations = [
    function name (value) {
      return !value || util.isString(value);
    }

    , function caste (value) {
      return !!value && value.getType && /object caste/i.test(value.getType());
    }

    , function level (value) {
      return util.isNumeric(value);
    }

    , function race (value) {
      return !!value && value.getType && /object race/i.test(value.getType());
    }

    , function scores (value) {
      return !!value && value.length === 7 && value.every(util.isNumeric);
    }
  ];

  properties = validations.map(function (item) {
    return item.name;
  });

  function countBonuses (ar) {
    return ar.filter(function (item) {
        return item > 0;
      }).length;
  }

  function countNumber (num, ar) {
    return ar.filter(function (item) {
        return item === num;
      }).length;
  }

  function distributeScores (config) {
    var bonuses   = config.addBonus ? config.race.stats.slice(0) : [0,0,0,0,0,0,0]
      , column    = config.scores.slice(0)
      , prefs     = config.caste.prefs;

    return prefs
      .reduce(function (bonuses, prefsIndex, indx) {
        // max initial score of 18
        bonuses[prefsIndex] = Math.min(18, column[indx] + bonuses[prefsIndex]);
        return bonuses;
      }, bonuses);
  }

  function hasPriorityBonuses (bonuses, prefs) {
    return prefs
      // check the n priority traits where n is the number of bonuses, otherwise
      // all characters with any bonuses would evaluate to having priority bonuses
      .slice(0, countBonuses(bonuses))
      .reduce(function (acc, traitIndex) {
        return acc || bonuses[traitIndex] > 0;
      }, false);
  }

  function numberOfOptimization (bonuses, column) {
    return Math.min(countBonuses(bonuses), countNumber(17, column));
  }

  // rule: bonus cannot put initial score above 18
  // rule: if bonus would put strength over 18, add extra roll for exceptional
  // if a bonus on a higher trait would allow for swapping with a lower with no
  // overall loss of points due to the swap.
  function optimizer (config) {
    var bonuses   = config.addBonus ? config.race.stats : [0,0,0,0,0,0,0]
      , column    = config.scores.slice(0).sort(util.sort.desc)
      , num17     = numberOfOptimization(bonuses, column)
      , num18     = countNumber(18, column)
      , prefs     = config.caste.prefs;

    // if optimizations exist
    // if bonuses are on prioritized traits according to prefs
    // push the number of 18s below the number of 17s in the array
    if (num17 && hasPriorityBonuses(bonuses, prefs)) {
      column = column.slice(num18, (num17 + num18)) // the set of 17s
        .concat(column.slice(0, num18))             // the set of 18s
        .concat(column.slice(num17 + num18));       // the rest
    }

    return column;
  }

  /* Player
    @param config - object
      name      (optional)    String

      caste(s)  (required)    Caste
      level     (required)    Integer
      race      (required)    Race
      scores    (required)    [Integer]

      addBonus  (optional)    Boolean
      optimize  (optional)    Boolean

      station   (optional)    Station (phase II maybe? and for what?)
  */
  function Player (config) {
    if (this === util.global) {
      // called as a function instead of a constructor - fix it!
      return new Player(config);
    }
    var bonuses   = config.addBonus ? config.race.stats.slice(0) : [0,0,0,0,0,0,0]
      , column    = config.scores.slice(0)
      , prefs     = config.caste.prefs;

    this.isValid = util.isValid(Player.prototype.getType(), config, validations);

    if (this.isValid) {
      config.scores = config.optimize ? optimizer(config) : config.scores;
      config.scores = distributeScores(config);

      this.scores = config.scores;
    }
  }

  Player.prototype = {
    getType: function () {
      return "[object Player]";
    }
  };

  return Player;
});
/*jshint laxcomma:true*/
/*global define require*/

define('test_player',[      "castes", "races", "Player", "util"
  ], function (castes,   races,   Player,   util) {
  module("Player");

  function valid_config () {
    return {
          caste:  castes.named("Cleric")[0]
        , level:  1
        , race:   races.named("Elf")[0]
        , scores: [18,16,16,15,14,13,11]
      };
  }

  test("basics", function () {
    throws(function () {
      var sample = new Player();
    }, "Not a valid Player config: empty.");

    throws(function () {
      var sample = new Player({});
    }, "Not a valid Player config: empty object.");

    Object.keys(valid_config())
      .forEach(function (arg) {
        var temp = valid_config();
        delete temp[arg];

        throws(function () {
          var sample = new Player(temp);
        }, "Not a valid Player config: missing " + arg);
      });

    var sample = new Player(valid_config());

    ok(sample.isValid, "Valid Player config produces a valid Player object.");
  });

  test("optimizing w/ bonuses", function () {
    var sample;

    // Half-Orc - racial adjustment
    // +1 Str
    //  0 Int
    //  0 Wis
    //  0 Dex
    // +1 Con
    // -1 Cha
    //  0 Com
    // Fighter - preferences
    // 0   4   3   5   1   6   2   //
    // Str Con Dex Cha Int Com Wis //
    
    // start with this input   and become this output
    [ [[15,14,13,12,11,10, 9], [16,11, 9,13,15,11,10]]
    , [[16,16,16,16,16,16,16], [17,16,16,16,17,15,16]]
    , [[17,16,16,16,16,16,16], [18,16,16,16,17,15,16]]
    , [[18,16,16,16,16,16,16], [18,16,16,16,17,15,16]]
    , [[17,17,17,17,17,17,17], [18,17,17,17,18,16,17]]
    , [[18,17,17,17,17,17,17], [18,17,17,18,18,16,17]]
    , [[18,18,17,17,17,17,17], [18,17,17,18,18,17,17]]
    , [[18,18,18,17,17,17,17], [18,18,17,18,18,17,17]]
    , [[18,18,18,18,17,17,17], [18,18,17,18,18,17,18]]
    , [[18,18,18,18,18,17,17], [18,18,18,18,18,17,18]]
    , [[18,18,18,18,18,18,18], [18,18,18,18,18,17,18]] ]
    .forEach(function (scores) {
      sample = new Player({
            caste:    castes.named("Fighter")[0]
          , level:    1
          , race:     races.named("Half-Orc")[0]
          , scores:   scores[0]
          , optimize: true
          , addBonus: true
        });
      deepEqual(sample.scores, scores[1], optimizationError(scores, sample.scores));
    });

    function optimizationError (scores, output) {
      return "input: " + scores[0] + ", expectation: " + scores[1] + ", output: " + output;
    }
  });
});

/*jshint laxcomma:true*/
/*global define require*/

define('test_castes',[      "castes", "Caste", "util"
  ], function (castes,   Caste,   util) {
  module("Caste");

  function valid_config_object () {
    return {
          name: "Zero"
        , dual: []
        , HDT: 3
        , prefs: "0000000".split("")
        , saves: "00000000000000000000000".split("")
        , thaco: "0000000000000000000000000".split("")
      };
  }

  test("constructor", function () {
    var sample = new Caste(valid_config_object());

    throws(function () {
      var invalid = new Caste();
    }, "Passing no config (none) should throw an error.");

    throws(function () {
      var invalid_config = valid_config_object();
      invalid_config.name = "";
      var invalid = new Caste(invalid_config);
    }, "Passing invalid config (no name) should throw an error.");

    throws(function () {
      var invalid_config = valid_config_object();
      invalid_config.dual = "";
      var invalid = new Caste(invalid_config);
    }, "Passing invalid config (non-array dual) should throw an error.");

    throws(function () {
      var invalid_config = valid_config_object();
      invalid_config.HDT = 1;
      var invalid = new Caste(invalid_config);
    }, "Passing invalid config (HDT) should throw an error.");

    throws(function () {
      var invalid_config = valid_config_object();
      invalid_config.prefs = "";
      var invalid = new Caste(invalid_config);
    }, "Passing invalid config (prefs) should throw an error.");

    throws(function () {
      var invalid_config = valid_config_object();
      invalid_config.saves = "";
      var invalid = new Caste(invalid_config);
    }, "Passing invalid config (saves) should throw an error.");

    throws(function () {
      var invalid_config = valid_config_object();
      invalid_config.thaco = "";
      var invalid = new Caste(invalid_config);
    }, "Passing invalid config (thaco) should throw an error.");

    ok((function () {
      try {
        var sample = new Caste(valid_config_object());
        return true;
      } catch(e) {
        return false;
      }
    }()), "An error is NOT thrown when a valid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = Caste(valid_config_object());
        return true;
      } catch(e) {
        return false;
      }
    }()), "Constructor function also detects that it was called as a normal function and fixes itself.");
  });

  test("instance methods", function () {
    var sample = new Caste(valid_config_object());

    equal(sample.name, "Zero", "Name passed to constructor is what is returned by '.get' method.");

    sample.name = "Other";
    equal(sample.name, "Zero", "Property values cannot be changed once the object is instantiated.");

    "name HDT"
      .split(" ")
      .forEach(function (prop) {
        var instance  = new Caste(valid_config_object())
          , expected  = valid_config_object()[prop]
          , propRef   = instance[prop];

        propRef += 99;

        equal(instance[prop]
          , expected
          , "Actual internal structure '{p}' is not exposed via get methods.".replace("{p}", prop));
      });

    "dual prefs saves thaco"
      .split(" ")
      .forEach(function (prop) {
        var instance  = new Caste(valid_config_object())
          , expected  = valid_config_object()[prop].join()
          , propRef   = instance[prop];

        propRef.shift();

        equal(instance[prop].join()
          , expected
          , "Actual internal structure '{p}' is not exposed via get methods.".replace("{p}", prop));
      });

    ok(sample.getType, "Sample instance has '.getType' property.");
    ok(util.isFunction(sample.getType), "Sample instance has '.getType' is a function.");
    ok(util.isString(sample.getType()), "Call to '.getType' returns a String.");
    equal(sample.getType(), "[object Caste]", "Call to '.getType' returns a String.");

    ok(sample.toString, "Sample instance has '.toString' property.");
    ok(util.isFunction(sample.toString), "Sample instance has '.toString' is a function.");
    ok(util.isString(sample.toString()), "Call to '.toString' returns a String.");
    ok(sample.toString() === valid_config_object().name, "Call to '.toString' returns the correct String.");
  });

  test("collection of instances", function () {
    ok(castes, "collecion is defined.");
    equal("[object Collection]", castes.toString(), "collection is a Collection.");
    equal(15, castes.length, "collection has the right number of instances.");

    ok(castes[0].name === "Acrobat", "Sample instance has a name and it matches what was searched for in the Collection.");
  });

  test("dual Caste(ing)", function () {
    throws(function () {
      var dual = Caste.dual();
    }, "Invalid arguments to Caste.dual throws errors.");

    throws(function () {
      var dual = Caste.dual("", "");
    }, "Invalid arguments to Caste.dual throws errors.");

    throws(function () {
      var dual = Caste.dual("Cleric", "Fighter");
    }, "Invalid arguments to Caste.dual throws errors.");

    throws(function () {
      var dual = Caste.dual(castes.named("Cleric")[0], "Fighter");
    }, "Invalid arguments to Caste.dual throws errors.");

    throws(function () {
      var dual = Caste.dual("Fighter", castes.named("Cleric")[0]);
    }, "Invalid arguments to Caste.dual throws errors.");

    throws(function () {
      var dual = Caste.dual(castes.named("Fighter"), castes.named("Cleric"));
    }, "Invalid arguments to Caste.dual throws errors.");

    var a = castes.named("Fighter")[0]
      , b = castes.named("Cleric")[0]
      , dual = Caste.dual(a, b);

    equal(dual.name, a.name + "/" + b.name, "Combining '" + a.name + "' and '" + b.name + "' produces '" + dual.name + "'.");
    deepEqual(dual.dual, [], "A dualed Caste should not have the ability to be dualed further.");
    equal(dual.HDT, (a.HDT + b.HDT) / 2, "Proper HDT value.");
    deepEqual(dual.skills, undefined, dual.name + " does not have thieving skills.");
    equal(dual.prefs.join(""), "0243516", "Proper .prefs value.");
    deepEqual(dual.saves.join(",").split(","), "16,17,18,19,19,10,13,14,16,15,10,13,14,16,15,10,13,14,16,15,9,12,13,15,14,9,12,13,13,14,9,12,13,13,14,7,10,11,12,12,7,10,11,12,12,7,9,10,9,11,6,9,10,9,11,6,8,9,8,10,6,8,9,8,10,5,6,7,5,8,5,6,7,5,8,4,5,6,4,7,4,5,6,4,7,3,4,5,4,6,3,4,5,4,6,2,3,4,3,5,2,3,4,3,5,1,2,3,3,4,1,2,3,3,4".split(","), "Proper .saves value.");
    ok(util.isArray(dual.spells), "Dual Castes should always have an array as the value for .spells.");
    equal(dual.spells.length, 2, "Dual Caste instance's .spells property should be of length 2.");
    deepEqual(dual.spells, [[], b.spells], "Proper .spells value.");
    deepEqual(dual.thaco, "20,20,18,18,16,16,14,14,12,12,10,10,8,8,6,6,4,4,4,2,2,1,1,1,1".split(",").map(Number), "Proper .thaco value.");

    todo("work on dual Caste-ing with two Castes that have .skills.");
  });
});
/*jshint laxcomma:true*/
/*global define require*/

define('test_races',[      "races", "Race", "util"
  ], function (races,   Race,   util) {
  module("Race");

  function valid_config_object () {
    return {
        name        : "Dwarf"
      , infravision : 60
      , languages   : ["gnome", "goblin", "kobol", "orcish"]
      , move        : 6
      , notes       : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
      , saves       : [1, 0, 1, 0, 1]
      , stats       : [0, 0, 0, 0, 1, -1, 0]
      , thieving    : [0, 10, 15, 0, 0, 0, -10, -5]};
  }

  test("constructor", function () {
    ok(Race, "Race object is defined.");
    ok(util.isFunction(Race), "Race object is a function.");

    throws(function () {
      var sample = new Race();
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_config_object();
      invalid.name = "";
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_config_object();
      invalid.infravision = "";
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_config_object();
      invalid.languages = "";
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_config_object();
      invalid.move = "";
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_config_object();
      invalid.move = -1;
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_config_object();
      delete invalid.move;
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    ok(function () {
      // notes can be empty so there is no validation
      try {
        var invalid = valid_config_object();
        delete invalid.notes;
        var sample = new Race(invalid);
        return true;
      } catch (e) {
        return false;
      }
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_config_object();
      invalid.saves.shift();
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_config_object();
      invalid.stats.shift();
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_config_object();
      invalid.thieving.shift();
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = new Race(valid_config_object());
        return true;
      } catch (e) {
        return false;
      }
    }()), "An error is NOT thrown when a valid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = Race(valid_config_object());
        return true;
      } catch (e) {
        return false;
      }
    }()), "Constructor function also detects that it was called as a normal function and fixes itself.");
  });

  test("instance methods", function () {
    var sample = new Race(valid_config_object());

    ok(sample.getType, "Sample instance has '.getType' property.");
    ok(util.isFunction(sample.getType), "Sample instance has '.getType' is a function.");
    ok(util.isString(sample.getType()), "Call to '.getType' returns a String.");
    equal(sample.getType(), "[object Race]", "Call to '.getType' returns a String.");

    ok(sample.toString, "Sample instance has '.toString' property.");
    ok(util.isFunction(sample.toString), "Sample instance has '.toString' is a function.");
    ok(util.isString(sample.toString()), "Call to '.toString' returns a String.");
    ok(sample.toString() === valid_config_object().name, "Call to '.toString' returns the correct String.");
  });

  test("collection of instances", function () {
    ok(races, "collecion is defined.");
    equal("[object Collection]", races.toString(), "collection is a Collection.");
    equal(8, races.length, "collection has the right number of instances.");
    ok(races.languages, "Races provides all available languages.");
    ok(util.isArray(races.languages), "Races provides all available languages in an array.");

    var sample = races.named("Dwarf")[0];

    ok(sample.name === "Dwarf", "Sample instance has a name and it matches what was searched for in the Collection.");
  });
});

/*jshint laxcomma:true*/
/*global define*/

define('Station',[      "roll", "util"
  ], function (roll,   util) {
  

  var global = (function () {return this;}())
    , properties
    , validations;

  validations = [
    function dice (value) {
      return !!value && util.isNumeric(value);
    }

    , function min (value) {
      return !!value && util.isNumeric(value);
    }

    , function name (value) {
      return !!name && util.isString(value);
    }
  ];

  properties = validations
    .map(function (fn) {
      return fn.name;
    });

  function roll_stat (obj) {
    var result;

    do {
      result = Array.apply(null, Array(obj.dice))
        .map(roll.bind(null, "d6"))
        .sort()
        .slice(-3)
        .reduce(util.sum);
    } while (result < obj.min);

    return result;
  }

  function Station (config) {
    if (this === global) {
      // called as a function instead of a constructor - fix it!
      return new Station(config);
    }

    if (util.isValid(Station.prototype.getType(), config, validations)) {
      properties.forEach(util.addGetter.bind(null, this, config));
    }
  }

  Station.prototype = {
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
          result[indx].push(roll_stat(this));
        }

        result[indx] = result[indx].sort(util.numericSort).reverse();
      } while (num > ++indx);

      return num === 1 ? result[0] : result;
    }

    ,getType: function () {

      return "[object Station]";
    }

    ,toString: function () {

      return this.name;
    }

    ,valueOf: function () {

      return JSON.stringify(this);
    }
  };

  return Station;
});
/*jshint laxcomma:true*/
/*global define*/

define('station_list',[      "Collection", "Station"
  ], function (Collection,   Station) {
  

  return new Collection([
       {name: "Champion", dice: 6, min: 7}
      ,{name: "Hero"    , dice: 4, min: 4}
      ,{name: "Player"  , dice: 3, min: 7}
      ,{name: "npc"     , dice: 3, min: 4}
      ,{name: "Pleb"    , dice: 3, min: 3}
    ].map(Station));
});
/*jshint laxcomma:true*/
/*global define require*/

define('test_stations',[      "station_list", "Station", "util"
  ], function (station_list,   Station,   util) {
  module("Station");

  test("constructor", function () {
    ok(Station, "Station object is defined.");
    ok(util.isFunction(Station), "Station object is a function.");

    throws(function () {
      var sample = new Station();
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var sample = new Station({});
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var sample = new Station({name: "Charlatan"});
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var sample = new Station({name: "Charlatan", dice: 4});
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var sample = new Station({name: "Charlatan", min: 6});
    }, "An error is thrown when an invalid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = new Station({name: "Charlatan", dice: 4, min: 6});

        return true;
      } catch (e) {
        return false;
      }
    }()), "An error is NOT thrown when a valid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = Station({name: "Charlatan", dice: 4, min: 6});

        return true;
      } catch (e) {
        return false;
      }
    }()), "Constructor function also detects that it was called as a normal function and fixes itself.");
  });

  test("instance methods", function () {
    var rank_name = "Charlatan"
      , sample = Station({name: rank_name, dice: 4, min: 6});

    equal(rank_name, sample.name, "Constructed object has properties from config.");
    equal(4, sample.dice, "Constructed object has properties from config.");
    equal(6, sample.min, "Constructed object has properties from config.");

    ok(sample.column, "Sample instance has 'column' property.");
    ok(util.isFunction(sample.column), "Sample instance '.column' is a function.");
    ok(sample.column().every(util.isNumeric), "Call to '.column' returns an array of numbers.");

    ok(sample.getType, "Sample instance has '.getType' property.");
    ok(util.isFunction(sample.getType), "Sample instance has '.getType' is a function.");
    ok(util.isString(sample.getType()), "Call to '.getType' returns a String.");
    equal(sample.getType(), "[object Station]", "Call to '.getType' returns a String.");

    ok(sample.toString, "Sample instance has '.toString' property.");
    ok(util.isFunction(sample.toString), "Sample instance has '.toString' is a function.");
    ok(util.isString(sample.toString()), "Call to '.toString' returns a String.");
    equal(sample.toString(), rank_name, "Call to '.toString' returns the correct String.");

    ok(sample.valueOf, "Sample instance has '.valueOf' property.");
    ok(util.isFunction(sample.valueOf), "Sample instance has '.valueOf' is a function.");
    ok(util.isString(sample.valueOf()), "Call to '.valueOf' returns a String.");
    equal(sample.valueOf(), JSON.stringify(sample), "Call to '.valueOf' returns the correct String.");
  });

  test("Collection of instances", function () {
    ok(station_list, "station_list is defined.");
    equal("[object Collection]", station_list.toString(), "station_list is a Collection.");
    equal(5, station_list.length, "station_list has the right number of Station instances.");

    var rank_name = "Hero"
      , sample = station_list.named(rank_name)[0]
      , temp;

    ok(sample.name === rank_name, "Sample instance has a name and it matches what was searched for in the Collection.");
  });
});

/*jshint laxcomma:true*/
/*global define require*/

define('test_traits',[      "traits"
  ], function (traits) {
  module("Traits");

  function simplate (tmpl, data) {
    for (var p in data) {
      tmpl = tmpl.replace("{" + p + "}", data[p]);
    }

    return tmpl;
  }

  function table_manip (stat, indx) {
    // must use the full path to the table object to be sure that actual values aren't altered
    // if aliased: var table = traits.str.table[indx]; changes will be on the copy not actual
    var expected = traits[stat].table[indx].join("")
      , result;

    traits[stat].table[indx][0] += 1;
    result = traits[stat].table[indx].join("");

    equal(result, expected, "Attempting to change the values in a Ability table does not work.");
  }

  test("Strength", function () {
    var expected;

    table_manip("str", 3);
    table_manip("str", 6);
    table_manip("str", 10);
    table_manip("str", 15);
    table_manip("str", 18);

    expected = "THAC0 Adjustment: -3, Damage Adjustment: -1, Weight Adjustment: -350, Open Doors: 1/6, Bend Bars: 0";
    equal(traits.str.details(3), expected, "Strength score: 3");

    expected = "THAC0 Adjustment: 1, Damage Adjustment: 2, Weight Adjustment: 750, Open Doors: 3/6, Bend Bars: 16";
    equal(traits.str.details(18), expected, "Strength score: 18");

    expected = "THAC0 Adjustment: 1, Damage Adjustment: 3, Weight Adjustment: 1000, Open Doors: 3/6, Bend Bars: 20";
    equal(traits.str.details(18, 1), expected, "Strength score: 18/1");
    equal(traits.str.details(18, 2), expected, "Strength score: 18/1");
    equal(traits.str.details(18, 49), expected, "Strength score: 18/50");
    equal(traits.str.details(18, 50), expected, "Strength score: 18/50");

    expected = "THAC0 Adjustment: 2, Damage Adjustment: 3, Weight Adjustment: 1250, Open Doors: 4/6, Bend Bars: 25";
    equal(traits.str.details(18, 51), expected, "Strength score: 18/51");
    equal(traits.str.details(18, 52), expected, "Strength score: 18/51");
    equal(traits.str.details(18, 74), expected, "Strength score: 18/75");
    equal(traits.str.details(18, 75), expected, "Strength score: 18/75");

    expected = "THAC0 Adjustment: 2, Damage Adjustment: 4, Weight Adjustment: 1500, Open Doors: 4/6, Bend Bars: 30";
    equal(traits.str.details(18, 76), expected, "Strength score: 18/76");
    equal(traits.str.details(18, 77), expected, "Strength score: 18/76");
    equal(traits.str.details(18, 89), expected, "Strength score: 18/90");
    equal(traits.str.details(18, 90), expected, "Strength score: 18/90");

    expected = "THAC0 Adjustment: 2, Damage Adjustment: 5, Weight Adjustment: 2000, Open Doors: 4/6, Bend Bars: 35";
    equal(traits.str.details(18, 91), expected, "Strength score: 18/91");
    equal(traits.str.details(18, 92), expected, "Strength score: 18/91");
    equal(traits.str.details(18, 98), expected, "Strength score: 18/91");
    equal(traits.str.details(18, 99), expected, "Strength score: 18/99");

    expected = "THAC0 Adjustment: 3, Damage Adjustment: 6, Weight Adjustment: 3000, Open Doors: 5/6, Bend Bars: 40";
    equal(traits.str.details(18, 100), expected, "Strength score: 18/100");

    throws(function () {
      traits.str.details(18, 0);
    }, "Getting details for a Strength score of 18 requires an exceptional value of 1-100.");

    throws(function () {
      traits.str.details(18, 101);
    }, "Getting details for a Strength score of 18 requires an exceptional value of 1-100.");
  });

  test("Intelligence", function () {
    var score
      , stat = "int"
      , tmpl = "Additional Languages: {0}, Know Spell: {1}, Minimum Spells: {2}, Maximum Spells: {3}";

    [3, 8, 14, 18, 24]
      .forEach(function (num) {
        table_manip(stat, num);
        equal(traits[stat].details(num), simplate(tmpl, traits[stat].table[num]));
      });
  });

  test("Wisdom", function () {
    var score
      , stat = "wis"
      , tmpl = "Magic Adjustment: {0}, Spell Failure: {1}, Bonus Spells: {2}";

    [3, 8, 14, 18, 24]
      .forEach(function (num) {
        table_manip(stat, num);
        equal(traits[stat].details(num), simplate(tmpl, traits[stat].table[num]));
      });
  });

  test("Dexterity", function () {
    var score
      , stat = "dex"
      , tmpl = "Reaction Adjustment: {0}, Missile Adjustment: {1}, Defensive Adjustment: {2}";

    [3, 8, 14, 18, 24]
      .forEach(function (num) {
        table_manip(stat, num);
        equal(traits[stat].details(num), simplate(tmpl, traits[stat].table[num]));
      });
  });

  test("Constitution", function () {
    var score
      , stat = "con"
      , tmpl = "HP Adjustment: {0}, System Shock: {1}, Raise Survival: {2}, Number of times Raised: {3}";

    [3, 8, 14, 18, 24]
      .forEach(function (num) {
        table_manip(stat, num);
        equal(traits[stat].details(num), simplate(tmpl, traits[stat].table[num]));
      });
  });

  test("Charisma", function () {
    var score
      , stat = "cha"
      , tmpl = "Max Henchment: {0}, Base Loyalty: {1}, Reaction Adjustment: {2}";

    [3, 8, 14, 18, 24]
      .forEach(function (num) {
        table_manip(stat, num);
        equal(traits[stat].details(num), simplate(tmpl, traits[stat].table[num]));
      });
  });

  test("Comeliness", function () {
    var score
      , stat = "com"
      , tmpl = "Response: {0}, Charisma Bonus: {1}";

    [3, 8, 14, 18, 24]
      .forEach(function (num) {
        table_manip(stat, num);
        equal(traits[stat].details(num), simplate(tmpl, traits[stat].table[num]));
      });
  });
});

/*jshint laxcomma:true*/
/*global require*/

require(["test_misc"]);
require(["test_collections"]);

require(["test_player"]);

require(["test_castes"]);
require(["test_races"]);
require(["test_stations"]);
require(["test_traits"]);

define("../../test/js/testing", function(){});
