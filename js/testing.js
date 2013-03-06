
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

  function sortAscending (a, b) {
    return a - b;
  }

  function sortDescending (a, b) {
    return b - a;
  }

  var util = {
          clone       : clone
        , isNumeric   : isNumeric
        , isType      : isType
        , sort        : {
           asc    : sortAscending
          ,desc   : sortDescending
        }
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

  test("constructor", function collection_test () {
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

  test("'.add' - single item", function collection_test () {
    var sample = new Collection();

    sample.add("hello");

    equal(1, sample.length, "Added item increases the length of the Collection.");
  });

  test("'.add' - array of items", function collection_test () {
    var sample = new Collection();

    /*Collection.add - */
    sample
      .add([
          "hello"
        , "world"
      ]);

    equal(2, sample.length, "Added item takes arrays as well as single items.");
  });

  test("'.each' - alias to Array.forEach", function collection_test () {
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

  test("'.empty' - most likely only usefule for testing", function collection_test () {
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

define('Race',[      "util"
  ], function (util) {
  

  function Race (config) {
    if (!config.name || !util.isString(config.name)) {
      throw new Error("No '.name' property given in config passed into Race constructor.");
    }

    if (!util.isNumeric(config.infravision)) {
      throw new Error("Invalid '.infravision' property given in config passed into Race constructor (" + config.infravision + ").");
    }

    if (!config.languages.length || !util.isArray(config.languages)) {
      throw new Error("Invalid '.languages' property given in config passed into Race constructor (" + config.laguages + ").");
    }

    if (!util.isNumeric(config.move) || config.move < 0) {
      throw new Error("Invalid '.move' property given in config passed into Race constructor (" + config.move + ").");
    }

    if (!!config.notes && !util.isString(config.notes)) {
      throw new Error("Invalid '.notes' property given in config passed into Race constructor (" + config.notes + ").");
    }

    if (config.saves.length !== 5 || !config.saves.every(util.isNumeric)) {
      throw new Error("Invalid '.saves' property given in config passed into Race constructor (" + config.saves + ").");
    }

    if (config.stats.length !== 7 || !config.stats.every(util.isNumeric)) {
      throw new Error("Invalid '.stats' property given in config passed into Race constructor (" + config.stats + ").");
    }

    if (config.thieving.length !== 8 | !config.thieving.every(util.isNumeric)) {
      throw new Error("Invalid '.thieving' property given in config passed into Race constructor (" + config.thieving + ").");
    }

    for (var attr in config) {
      this[attr] = config[attr];
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

  list = new Collection(racesConfigs
    .map(function (config) {
      return new Race(config);
    }));

  list.languages = languages.slice(0);

  return list;
});
/*jshint laxcomma:true*/
/*global define require*/

define('test_races',[      "races", "Race", "util"
  ], function (races,   Race,   util) {
  module("Race");

  function valid_race_config () {
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
      var invalid = valid_race_config();
      invalid.name = "";
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.infravision = "";
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.languages = "";
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.move = "";
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.move = -1;
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      delete invalid.move;
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    ok(function () {
      // notes can be empty so there is no validation
      try {
        var invalid = valid_race_config();
        delete invalid.notes;
        var sample = new Race(invalid);
        return true;
      } catch (e) {
        return false;
      }
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.saves.shift();
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.stats.shift();
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    throws(function () {
      var invalid = valid_race_config();
      invalid.thieving.shift();
      var sample = new Race(invalid);
    }, "An error is thrown when an invalid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = new Race(valid_race_config());
        return true;
      } catch (e) {
        return false;
      }
    }()), "An error is NOT thrown when a valid config is passed into the constructor.");

    ok((function () {
      try {
        var sample = Race(valid_race_config());
        return true;
      } catch (e) {
        return false;
      }
    }()), "Constructor function also detects that it was called as a normal function and fixes itself.");
  });

  test("instance methods", function () {
    var sample = new Race(valid_race_config());

    ok(sample.getType, "Sample instance has '.getType' property.");
    ok(util.isFunction(sample.getType), "Sample instance has '.getType' is a function.");
    ok(util.isString(sample.getType()), "Call to '.getType' returns a String.");

    ok(sample.toString, "Sample instance has '.toString' property.");
    ok(util.isFunction(sample.toString), "Sample instance has '.toString' is a function.");
    ok(util.isString(sample.toString()), "Call to '.toString' returns a String.");
    ok(sample.toString() === valid_race_config().name, "Call to '.toString' returns the correct String.");
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

define('Station',[      "roll"
  ], function (roll) {
  

  function numericSort (a, b) {
    return a - b;
  }

  function roll_stat (obj) {
    var result;

    do {
      result = Array.apply(null, Array(obj.dice))
        .map(roll.bind(null, "d6"))
        .sort()
        .slice(-3)
        .reduce(sum);
    } while (result < obj.min);

    return result;
  }

  function sum (acc, cur) {
    return acc + cur;
  }

  function Station (config) {
    if (this === (function () {return this;}())) {
      // called as a function instead of a constructor - fix it!
      return new Station(config);
    }

    if (!config.dice) {
      throw new Error("No 'dice' property passed into Station constructor.");
    }

    if (!config.name) {
      throw new Error("No 'name' property passed into Station constructor.");
    }

    if (!config.min) {
      throw new Error("No 'min' property passed into Station constructor.");
    }

    for (var attr in config) {
      this[attr] = config[attr];
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

        result[indx] = result[indx].sort(numericSort).reverse();
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
      ,{name: "npc"     , dice: 3, min: 4}
      ,{name: "Player"  , dice: 3, min: 7}
      ,{name: "Pleb"    , dice: 3, min: 3}
    ].map(function (config) {
      return new Station(config);
    }));
});
/*jshint laxcomma:true*/
/*global define require*/

define('test_stations',[      "station_list", "Station", "util"
  ], function (station_list,   Station,   util) {
  module("Station");

  test("constructor", function constructorOfStation_test () {
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

    ok(sample.toString, "Sample instance has '.toString' property.");
    ok(util.isFunction(sample.toString), "Sample instance has '.toString' is a function.");
    ok(util.isString(sample.toString()), "Call to '.toString' returns a String.");
    ok(sample.toString() === rank_name, "Call to '.toString' returns the correct String.");

    ok(sample.valueOf, "Sample instance has '.valueOf' property.");
    ok(util.isFunction(sample.valueOf), "Sample instance has '.valueOf' is a function.");
    ok(util.isString(sample.valueOf()), "Call to '.valueOf' returns a String.");
    ok(sample.valueOf() === JSON.stringify(sample), "Call to '.valueOf' returns the correct String.");
  });

  test("Collection of instances", function stationList_test () {
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
/*global require*/

require(["test_misc"]);
require(["test_collections"]);
require(["test_races"]);
require(["test_stations"]);

define("../../test/js/testing", function(){});
