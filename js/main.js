
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

  var util = {
          clone: clone
        , isNumeric: isNumeric
        , isType: isType
      };

  return "Array Function String"
    .split(" ")
    .reduce(function (acc, item) {
      acc["is" + item] = util.isType.bind(null, new RegExp(item));
      return acc;
    }, util);
});
/*jshint*/
/*global define*/

define('Collection',[      "util"
  ], function (util) {
  

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

define('Caste',[      "util"
  ], function (util) {
  

  function Caste (config) {
    if (!config.name) {
      throw new Error("No '.name' property given in config passed into Caste constructor.");
    }

    if (!config.dual) {
      throw new Error("No '.dual' property given in config passed into Caste constructor.");
    }

    if (!util.isNumeric(config.HDT) || config.HDT < 4) {
      throw new Error("Invalid '.HDT' property given in config passed into Caste constructor (" + config.HDT + ").");
    }

    if (config.prefs.length !== 7) {
      throw new Error("Invalid '.prefs' property given in config passed into Caste constructor (" + config.prefs + ").");
    }

    if (config.saves.length !== 23) {
      throw new Error("Invalid '.saves' table-property given in config passed into Caste constructor (" + config.saves + ").");
    }

    if (config.thaco.length !== 25) {
      throw new Error("Invalid '.thaco' table-property given in config passed into Caste constructor (" + config.thaco + ").");
    }

    for (var attr in config) {
      this[attr] = config[attr];
    }
  }

  Caste.prototype = {
    getType: function () {

      return "[object Class]";
    }

    ,toString: function () {

      return this.name;
    }
  };

  // allClasses.merge = function (_a, _b) {
  //   if ((_b === undefined || _b === "") && !!allClasses.named(_a)) {
  //     return allClasses.named(_a);
  //   }

  //   if (_a === _b || _a === undefined || !allClasses.named(_a) || !allClasses.named(_b)) {
  //     throw new Error("Invalid arguments passed to Classes.merge(): " + [_a, _b]);
  //   }

  //   _a = allClasses.named(_a);
  //   _b = allClasses.named(_b);

  //   return new Caste({
  //      name: _a.name + "/" + _b.name

  //     ,dual: []

  //     ,HDT: (_a.HDT + _b.HDT) / 2

  //     ,prefs: (function (a, b) {
  //       var  i = 0
  //           ,l = a.length
  //           ,result = [];

  //       for ( ; i < l; i++) {
  //         result.indexOf(a[i]) === -1 && result.push(a[i]);
  //         result.indexOf(b[i]) === -1 && result.push(b[i]);
  //       }

  //       return result;
  //     }(_a.prefs, _b.prefs))

  //     ,saves: (function (a, b) {
  //       var level = [],
  //           result = [];

  //       while (result.length < a.length) {
  //         level = [];

  //         while (level.length < a[0].length) {
  //           level.push(a[result.length][level.length] < b[result.length][level.length] ? a[result.length][level.length] : b[result.length][level.length]);
  //         }

  //         result.push(level);
  //       }

  //       return result;
  //     }(_a.saves, _b.saves))

  //     ,spells: (function (a, b) {
  //       if (a || b) {
  //         return [a, b];
  //       }
  //     }(_a.spells, _b.spells))

  //     ,thaco: (function (a, b) {
  //       var indx = 0,
  //           result = [];

  //       while (indx < a.length) {
  //         result.push(a[indx] < b[indx] ? a[indx] : b[indx]);
  //         indx++;
  //       }

  //       return result;
  //     }(_a.thaco, _b.thaco))
  //   });
  // };

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
        , prefs   : [3,4,0,1,5,2,6]
        , saves   : saves.Thief
        , skills  : acrobating
        , thaco   : thacos.Thief
      }

      , {
          name    : "Archer"
        , dual    : []
        , HDT     : 8
        , prefs   : [3,0,4,2,1,5,6]
        , saves   : saves.Cleric
        , thaco   : thacos.Cleric
      }

      , {
          name    : "Assassin"
        , dual    : []
        , HDT     : 6
        , prefs   : [5,3,1,4,0,2,6]
        , saves   : saves.Thief
        , thaco   : thacos.Thief
      }

      , {
          name    : "Barbarian"
        , dual    : []
        , HDT     : 12
        , prefs   : [0,4,3,5,1,6,2]
        , saves   : saves.Fighter
        , thaco   : thacos.Fighter
      }

      , {
          name    : "Bard"
        , dual    : []
        , HDT     : 12
        , prefs   : [5,0,1,4,3,6,2]
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
        , prefs   : [2,4,0,3,1,5,6]
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
        , prefs   : [0,5,6,2,1,3,4]
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
        , prefs   : [1,3,5,2,4,6,0]
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
        , prefs   : [3,4,2,1,0,5,6]
        , saves   : saves.Thief
        , thaco   : thacos.Cleric
      }

      , {
          name    : "Paladin"
        , dual    : []
        , HDT     : 10
        , prefs   : [0,4,3,5,1,6,2]
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
        , prefs   : [0,4,3,2,5,6,1]
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
        , prefs   : [3,1,5,4,0,2,6]
        , saves   : saves.Thief
        , skills  : thieving
        , thaco   : thacos.Thief
      }
    ];

  allCastes = new Collection(classConfigs
    .map(function (config) {
      return new Caste(config);
    }));

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
  

  function Race (config) {
    if (!config.name) {
      throw new Error("No '.name' property given in config passed into Race constructor.");
    }

    if (!util.isNumeric(config.infravision)) {
      throw new Error("Invalid '.infravision' property given in config passed into Race constructor (" + config.infravision + ").");
    }

    if (!config.languages.length) {
      throw new Error("Invalid '.languages' property given in config passed into Race constructor (" + config.laguages + ").");
    }

    if (config.saves.length !== 5) {
      throw new Error("Invalid '.saves' property given in config passed into Race constructor (" + config.saves + ").");
    }

    if (config.stats.length !== 7) {
      throw new Error("Invalid '.stats' property given in config passed into Race constructor (" + config.stats + ").");
    }

    if (config.thieving.length !== 8) {
      throw new Error("Invalid '.thieving' property given in config passed into Race constructor (" + config.thieving + ").");
    }

    if (!util.isNumeric(config.move)) {
      throw new Error("Invalid '.move' property given in config passed into Race constructor (" + config.move + ").");
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
      return "Race: " + this.name;
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

  var languages = [
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

  return new Collection(racesConfigs
    .map(function (config) {
      return new Race(config);
    }));
});
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
       new Station({name: "Champion", dice: 6, min: 7})
      ,new Station({name: "Hero"    , dice: 4, min: 4})
      ,new Station({name: "npc"     , dice: 3, min: 4})
      ,new Station({name: "Player"  , dice: 3, min: 7})
      ,new Station({name: "Pleb"    , dice: 3, min: 3})
    ]);
});
/*jshint laxcomma:true*/
/*global require define*/

define('ui_builder',[ "jquery", "castes", "races", "station_list"
  ], function ($,   castes,   races,   station_list) {
    

    var empty_option  = $("<option value>-- select one --</option>")
          .wrap("div")  // so that .clone() isn't
          .parent()     // needed each time a new
          .html()       // instance is apended

      // DOM selectors
      , _station      = "#station"
      , _caste_alpha  = "#caste_alpha"
      , _caste_beta   = "#caste_beta"
      , _strict_dual  = "#strict_dual"
      , _level        = "#level"
      , _race         = "#race"
      , _stats_column = "#stats_column"

      // selector groups
      , dual_elements = [_caste_alpha, _caste_beta, _strict_dual].join()
      , ui_elements   = [_station, _caste_alpha, _caste_beta, _strict_dual, _level, _race, _stats_column].join()

      // jQuery DOM object references
      , $station      = $(_station)
      , $caste_alpha  = $(_caste_alpha)
      , $caste_beta   = $(_caste_beta)
      , $document     = $(document)
      , $strict_dual  = $(_strict_dual)
      , $level        = $(_level)
      , $race         = $(_race)
      , $stats_column = $(_stats_column);

    function attemptPlayerCreation (event) {
      if ($caste_alpha.val() && $race.val()) {
        $document
          .trigger("showGrid", 9);
      }
    }

    function dualCasteHandler (event) {
      var list
        , caste_alphaValue      = $caste_alpha.find("option:selected").val()
        , caste_betaValue       = $caste_beta.find("option:selected").val()
        , isStrictDualSelected  = $strict_dual.is(":checked")
        , isCasteAlphaDualable  = !isStrictDualSelected ||
                                  !!caste_alphaValue &&
                                  !!castes.named(caste_alphaValue).dual.length;

      $caste_beta.empty();

      // add list of character castes to the beta dropdown
      if (caste_alphaValue !== "" && isCasteAlphaDualable) {
        list = (isStrictDualSelected ? castes.duals() : castes)
          // filter out the selected alpha from the list of possible betas
          .filter(function (item) {
            return item.name !== caste_alphaValue;
          })
          .map(selectOption);

        list.unshift(empty_option);

        $caste_beta.append(list);

        // ensure against dual Casteing the same two castes
        if (caste_alphaValue !== caste_betaValue) {
          $caste_beta.val(caste_betaValue);
        }
      } else {
        $caste_beta.append("<option></option>");
      }
    }

    function initUI () {
      $station
        .append(station_list.map(radioItem.bind(null, "rank")));

      $caste_alpha
        .append(empty_option)
        .append(castes.map(selectOption));

      $race
        .append(empty_option)
        .append(races.map(selectOption));
    }

    function radioItem (prefix, item, indx) {
      return '<label for="{pre}-{name}"><input id="{pre}-{name}" name="{pre}" type="radio" value="{i}"> {name}</label>'
        .replace(/\{i\}/g, indx)
        .replace(/\{pre\}/g, prefix)
        .replace(/\{name\}/g, item.name);
    }

    function selectOption (item) {
      return '<option>{name}</option>'
        .replace(/\{name\}/g, item.name);
    }

    function statColumn (event) {
      if (!/label/i.test(event.target.nodeName)) {
        var column = station_list[event.target.value].column();

        $stats_column
          .val(column)
          .parent()
          .show();
      }
    }

    $document
      .on("click", _station + " label", statColumn)
      .on("change", dual_elements, dualCasteHandler)
      .on("change", ui_elements, attemptPlayerCreation)
      .on("ready", initUI);
});
/*jshint laxcomma:true*/
/*global require define*/

require(["jquery"
  ], function ($) {
    

    var _abilities    = "#abilities"
      , _detail       = "#detail"
      , _saves        = "#saves"
      , _skills       = "#skills"
      , _vitals       = "#vitals"

      , $abilities    = $(_abilities)
      , $detail       = $(_detail)
      , $saves        = $(_saves)
      , $skills       = $(_skills)
      , $vitals       = $(_vitals)

      , templates     = {
          abilities : $abilities.html()
        , saves     : $saves.html()
        , skills    : $skills.html()
        , vitals    : $vitals.html()
      };

    $abilities
      .add($saves)
      .add($skills)
      .add($vitals)
      .html("waiting for HTML");

    function showGrid (event, player) {
      $detail.show();
    }

    $(document)
      .on("showGrid", showGrid);
  });
define("ui_detail", function(){});

/*jshint laxcomma:true*/
/*global require define*/

require.config({
  basePath: "js"
  ,paths: {
    jquery        : ["//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min", "lib/jquery"]
    // ,handlebars   : "lib/handlebars"
  }
  // ,shim: {
  //   handlebars: {
  //     exports: "handlebars"
  //   }
  // }
});

// ready the UI
require(["ui_builder"]);
require(["ui_detail"]);

define("main", function(){});
