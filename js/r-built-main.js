
/*jshint*/
/*global define*/

define('Util',[], function () {
  

  var Util = {
       clone: function(obj){
          var i, result = Util.isArray(obj) ? [] : {};
          
          for (i in obj) {
            if (obj.hasOwnProperty(i)) {
              result[i] = Util.isObject(obj[i]) ? Util.clone(obj[i]) : obj[i];
            }
          }
          
          return result;
        }

        ,isNumeric: function (q) {

          return !isNaN(parseFloat(q)) && isFinite(q);
        }

        ,isType: function (type, obj) {
            
          return (obj && obj.getType ? obj.getType() : {}.toString.call(obj)).indexOf(type);
        }
      };

  Util.isArray  = Util.isType.bind(null, "Array");
  Util.isObject = Util.isType.bind(null, "Object");
  Util.isString = Util.isType.bind(null, "String");

  return Util;
});
/*jshint*/
/*global define*/

define('Collection',["Util"], function (Util) {
  

  function Collection (ar) {
    if (!!ar && Util.isArray(ar) && ar.length > 0) {
      Collection.fn.add.call(this, ar);
    }
  }

  Collection.fn = Collection.prototype = [];

  Collection.fn.add = function (ar) {
      if (Util.isArray(ar)) {
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
    if (!config.name) {
      throw new Error({
        args: arguments
        ,fn: "Caste constructor"
      });
    }
      
    for (var attr in config) {
      this[attr] = config[attr];
    }
  }

  Caste.prototype = {
    column: function (num) {
      var indx = 0
        , result = [];

      // FIXME: I do not think this is what I think it is and should probably be removed.
      num |= 1;

      while (num > indx) {
        result[indx] = [];

        while (result[indx].length < 7) {
          result[indx].push(this.roll());
        }

        result[indx] = result[indx].sort(numericSort).reverse();

        indx++;
      }

      return num === 1 ? result[0] : result;
    }

    ,getType: function () {
        
      return "[object Caste]";
    }

    ,roll: function () {
      var result;

      do {
        result = roll(this.dice, 6)
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
/*global define*/

define('Classes',["Collection", "Util"], function (Collection, Util) {
  

  var allClasses
      ,saves = {
        Cleric: [
          //ppd, pp,rsw, bw, sp
           [ 19, 19, 19, 19, 19] //  0th level charcter
          ,[ 10, 13, 14, 16, 15] //  1
          ,[ 10, 13, 14, 16, 15] //  2
          ,[ 10, 13, 14, 16, 15] //  3
          ,[  9, 12, 13, 15, 14] //  4
          ,[  9, 12, 13, 15, 14] //  5
          ,[  9, 12, 13, 15, 14] //  6
          ,[  7, 10, 11, 13, 12] //  7
          ,[  7, 10, 11, 13, 12] //  8
          ,[  7, 10, 11, 13, 12] //  9
          ,[  6,  9, 10, 12, 11] // 10
          ,[  6,  9, 10, 12, 11] // 11
          ,[  6,  9, 10, 12, 11] // 12
          ,[  5,  8,  9, 11, 10] // 13
          ,[  5,  8,  9, 11, 10] // 14
          ,[  5,  8,  9, 11, 10] // 15
          ,[  4,  7,  8, 10,  9] // 16
          ,[  4,  7,  8, 10,  9] // 17
          ,[  4,  7,  8, 10,  9] // 18
          ,[  2,  5,  6,  8,  7] // 19
          ,[  2,  5,  6,  8,  7] // 20
          ,[  2,  5,  6,  8,  7] // 21
          ,[  1,  3,  4,  6,  5] // 22
        ],
    
        Fighter: [
          //ppd, pp,rsw, bw, sp
           [ 16, 17, 18, 20, 19] //  0th level charcter
          ,[ 14, 15, 16, 17, 17] //  1
          ,[ 14, 15, 16, 17, 17] //  2
          ,[ 13, 14, 15, 16, 16] //  3
          ,[ 13, 14, 15, 16, 16] //  4
          ,[ 11, 12, 13, 13, 14] //  5
          ,[ 11, 12, 13, 13, 14] //  6
          ,[ 10, 11, 12, 12, 13] //  7
          ,[ 10, 11, 12, 12, 13] //  8
          ,[  8,  9, 10,  9, 11] //  9
          ,[  8,  9, 10,  9, 11] // 10
          ,[  7,  8,  9,  8, 10] // 11
          ,[  7,  8,  9,  8, 10] // 12
          ,[  5,  6,  7,  5,  8] // 13
          ,[  5,  6,  7,  5,  8] // 14
          ,[  4,  5,  6,  4,  7] // 15
          ,[  4,  5,  6,  4,  7] // 16
          ,[  3,  4,  5,  4,  6] // 17
          ,[  3,  4,  5,  4,  6] // 18
          ,[  2,  3,  4,  3,  5] // 19
          ,[  2,  3,  4,  3,  5] // 20
          ,[  1,  2,  3,  3,  4] // 21
          ,[  1,  2,  3,  3,  4] // 22
        ],
    
        Mage: [
          //ppd, pp,rsw, bw, sp
           [ 19, 19, 19, 19, 19] //  0th level charcter
          ,[ 14, 13, 11, 15, 12] //  1
          ,[ 14, 13, 11, 15, 12] //  2
          ,[ 14, 13, 11, 15, 12] //  3
          ,[ 14, 13, 11, 15, 12] //  4
          ,[ 14, 13, 11, 15, 12] //  5
          ,[ 13, 11,  9, 13, 10] //  6
          ,[ 13, 11,  9, 13, 10] //  7
          ,[ 13, 11,  9, 13, 10] //  8
          ,[ 13, 11,  9, 13, 10] //  9
          ,[ 13, 11,  9, 13, 10] // 10
          ,[ 11,  9,  7, 11,  8] // 11
          ,[ 11,  9,  7, 11,  8] // 12
          ,[ 11,  9,  7, 11,  8] // 13
          ,[ 11,  9,  7, 11,  8] // 14
          ,[ 11,  9,  7, 11,  8] // 15
          ,[ 10,  7,  5,  9,  6] // 16
          ,[ 10,  7,  5,  9,  6] // 17
          ,[ 10,  7,  5,  9,  6] // 18
          ,[ 10,  7,  5,  9,  6] // 19
          ,[ 10,  7,  5,  9,  6] // 20
          ,[  8,  5,  3,  7,  4] // 21
          ,[  8,  5,  3,  7,  4] // 22
        ],
    
        Thief: [
          //ppd, pp,rsw, bw, sp
           [ 19, 19, 19, 19, 19] //  0th level charcter
          ,[ 13, 12, 14, 16, 15] //  1
          ,[ 13, 12, 14, 16, 15] //  2
          ,[ 13, 12, 14, 16, 15] //  3
          ,[ 13, 12, 14, 16, 15] //  4
          ,[ 12, 11, 12, 15, 13] //  5
          ,[ 12, 11, 12, 15, 13] //  6
          ,[ 12, 11, 12, 15, 13] //  7
          ,[ 12, 11, 12, 15, 13] //  8
          ,[ 11, 10, 10, 14, 11] //  9
          ,[ 11, 10, 10, 14, 11] // 10
          ,[ 11, 10, 10, 14, 11] // 11
          ,[ 11, 10, 10, 14, 11] // 12
          ,[ 10,  9,  8, 13,  9] // 13
          ,[ 10,  9,  8, 13,  9] // 14
          ,[ 10,  9,  8, 13,  9] // 15
          ,[ 10,  9,  8, 13,  9] // 16
          ,[  9,  8,  6, 12,  7] // 17
          ,[  9,  8,  6, 12,  7] // 18
          ,[  9,  8,  6, 12,  7] // 19
          ,[  9,  8,  6, 12,  7] // 20
          ,[  8,  7,  4, 11,  5] // 21
          ,[  8,  7,  4, 11,  5] // 22
        ]
      }

      ,thacos = {
       // level     0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24th level character
        Cleric  : [20,20,20,18,18,18,16,16,16,14,14,14,12,12,12,10,10,10, 9, 9, 8, 8, 7, 6, 5]
       ,Fighter : [20,20,18,18,16,16,14,14,12,12,10,10, 8, 8, 6, 6, 4, 4, 4, 2, 2, 1, 1, 1, 1]
       ,Mage    : [20,20,20,20,20,19,19,19,19,19,16,16,16,16,16,13,13,13,13,13,11,11, 9, 8, 7]
       ,Thief   : [20,20,20,20,19,19,19,19,16,16,16,16,14,14,14,14,12,12,12,12,10,10, 8, 7, 6]
      }

      ,thieving = {
        // -------------- level   1   2   3   4   5   6   7   8   9  10    11    12    13    14    15    16    17
         "Pick Pockets"      : [ 30, 35, 40, 45, 50, 55, 60, 65, 70, 80,   90,  100,  105,  110,  115,  125,  125]
        ,"Open Locks"        : [ 25, 29, 33, 37, 42, 47, 52, 57, 62, 67,   72,   77,   82,   87,   92,   97,   99]
        ,"Find/Remove Traps" : [ 20, 25, 30, 35, 40, 45, 50, 55, 60, 65,   70,   75,   80,   85,   90,   95,   99]
        ,"Move Silently"     : [ 15, 21, 27, 33, 40, 47, 55, 62, 70, 78,   86,   94,   99,   99,   99,   99,   99]
        ,"Hide In Shadows"   : [ 10, 15, 20, 25, 31, 37, 43, 49, 56, 63,   70,   77,   85,   93,   99,   99,   99]
        ,"Hear Noise"        : [ 10, 10, 15, 15, 20, 20, 25, 25, 30, 30,   35,   35,   40,   40,   50,   50,   55]
        ,"Climb Walls"       : [ 85, 86, 87, 88, 90, 92, 94, 96, 98, 99, 99.1, 99.2, 99.3, 99.4, 99.5, 99.6, 99.7]
        ,"Read Languages"    : [  0,  0,  0, 20, 25, 30, 35, 40, 45, 50,   55,   60,   65,   70,   75,   80,   80]
      }

      ,acrobating = { // page 24 UA
        "Tightrope Walking": [0,0,0,0,0,0
          ,75  //  6
          ,80  //  7
          ,85  //  8
          ,90  //  9
          ,95  // 10
          ,100 // 11
          ,100 // 12
          ,100 // 13
          ,100 // 14
          ,100 // 15
          ,100 // 16
          ,100 // 17
          ,100 // 18
          ,100 // 19
          ,100 // 20
          ,100 // 21
          ,100 // 22
          ,100 // 23
        ]
        ,"Pole Vaulting": [0,0,0,0,0,0
          , 9   //  6
          , 9.5 //  7
          ,10   //  8
          ,10.5 //  9
          ,11   // 10
          ,11.5 // 11
          ,12   // 12
          ,12.5 // 13
          ,13   // 14
          ,13.5 // 15
          ,14   // 16
          ,14.5 // 17
          ,15   // 18
          ,15.5 // 19
          ,16   // 20
          ,16.5 // 21
          ,17   // 22
          ,17.5 // 23
        ]
        ,"High Jumping": [0,0,0,0,0,0
          ,4    //  6
          ,4.25 //  7
          ,4.50 //  8
          ,4.75 //  9
          ,5    // 10
          ,5.25 // 11
          ,5.50 // 12
          ,5.75 // 13
          ,6.25 // 14
          ,6.50 // 15
          ,7    // 16
          ,7.50 // 17
          ,8    // 18
          ,8.50 // 19
          ,9    // 20
          ,9    // 21
          ,9    // 22
          ,9    // 23
        ]
        ,"Standing Long Jump": [0,0,0,0,0,0
          , 5   //  6
          , 5.5 //  7
          , 6   //  8
          , 6.5 //  9
          , 7   // 10
          , 7.5 // 11
          , 8   // 12
          , 8.5 // 13
          , 9   // 14
          , 9.5 // 15
          ,10   // 16
          ,10.5 // 17
          ,11   // 18
          ,11.5 // 19
          ,12   // 20
          ,12   // 21
          ,12   // 22
          ,12   // 23
        ]
        ,"Running Long Jump": [0,0,0,0,0,0
          , 9   //  6
          , 9.5 //  7
          ,10   //  8
          ,10.5 //  9
          ,11   // 10
          ,11.5 // 11
          ,12   // 12
          ,13   // 13
          ,14   // 14
          ,15   // 15
          ,16   // 16
          ,17   // 17
          ,18   // 18
          ,19   // 19
          ,20   // 20
          ,21   // 21
          ,22   // 22
          ,22   // 23
        ]
        ,"Tumbling Maneuvers: Attack"  : [0,0,0,0,0,0
          , 6 //  6
          , 7 //  7
          , 8 //  8
          , 9 //  9
          ,10 // 10
          ,11 // 11
          ,12 // 12
          ,13 // 13
          ,14 // 14
          ,15 // 15
          ,16 // 16
          ,17 // 17
          ,18 // 18
          ,19 // 19
          ,20 // 20
          ,20 // 21
          ,20 // 22
          ,20 // 23
        ]
        ,"Tumbling Maneuvers: Evasion" : [  0,  0,  0,  0,  0,  0
          ,10 //  6
          ,15 //  7
          ,20 //  8
          ,25 //  9
          ,30 // 10
          ,35 // 11
          ,40 // 12
          ,45 // 13
          ,50 // 14
          ,52 // 15
          ,54 // 16
          ,56 // 17
          ,58 // 18
          ,60 // 19
          ,60 // 20
          ,60 // 21
          ,60 // 22
          ,60 // 23
        ]
        ,"Tumbling Maneuvers: Falling" : [  0,  0,  0,  0,  0,  0
          ,"25%,10'" //  6
          ,"50%,10'" //  7
          ,"75%,10'" //  8
          ,"25%,20'" //  9
          ,"50%,20'" // 10
          ,"75%,20'" // 11
          ,"25%,30'" // 12
          ,"50%,30'" // 13
          ,"75%,30'" // 14
          ,"20%,40'" // 15
          ,"40%,40'" // 16
          ,"60%,40'" // 17
          ,"80%,40'" // 18
          ,"20%,50'" // 19
          ,"40%,50'" // 20
          ,"60%,50'" // 21
          ,"80%,50'" // 22
          ,"20%,60'" // 23
        ]
      }

      ,classConfigs = [
        {
          name: "Acrobat"
          ,dual: []
          ,HDT: 6
          ,prefs: [3,4,0,1,5,2,6]
          ,saves: saves.Thief
          ,skills: acrobating
          ,thaco: thacos.Thief
        }

        ,{
          name: "Archer"
          ,dual: []
          ,HDT: 8
          ,prefs: [3,0,4,2,1,5,6]
          ,saves: saves.Cleric
          ,thaco: thacos.Cleric
        }

        ,{
          name: "Assassin"
          ,dual: []
          ,HDT: 6
          ,prefs: [5,3,1,4,0,2,6]
          ,saves: saves.Thief
          ,thaco: thacos.Thief
        }

        ,{
          name: "Barbarian"
          ,dual: []
          ,HDT: 12
          ,prefs: [0,4,3,5,1,6,2]
          ,saves: saves.Fighter
          ,thaco: thacos.Fighter
        }

        ,{
          name: "Bard"
          ,dual: []
          ,HDT: 12
          ,prefs: [5,0,1,4,3,6,2]
          ,saves: saves.Fighter
          ,spells: [
            //TODO: fill out these values...?
            //1 2 3 4 5 6 7  Spell level
             [0,0,0,0,0,0,0]  //  0th level character
            ,[0,0,0,0,0,0,0]  //  1
            ,[0,0,0,0,0,0,0]  //  2
            ,[0,0,0,0,0,0,0]  //  3
            ,[0,0,0,0,0,0,0]  //  4
            ,[0,0,0,0,0,0,0]  //  5
            ,[0,0,0,0,0,0,0]  //  6
            ,[0,0,0,0,0,0,0]  //  7
            ,[0,0,0,0,0,0,0]  //  8
            ,[0,0,0,0,0,0,0]  //  9
            ,[0,0,0,0,0,0,0]  // 10
            ,[0,0,0,0,0,0,0]  // 11
            ,[0,0,0,0,0,0,0]  // 12
            ,[0,0,0,0,0,0,0]  // 13
            ,[0,0,0,0,0,0,0]  // 14
            ,[0,0,0,0,0,0,0]  // 15
            ,[0,0,0,0,0,0,0]  // 16
            ,[0,0,0,0,0,0,0]  // 17
            ,[0,0,0,0,0,0,0]  // 18
            ,[0,0,0,0,0,0,0]  // 19
            ,[0,0,0,0,0,0,0]  // 20
            ,[0,0,0,0,0,0,0]  // 21
            ,[0,0,0,0,0,0,0]  // 22
            ,[0,0,0,0,0,0,0]  // 23
            ,[0,0,0,0,0,0,0]  // 24
            ,[0,0,0,0,0,0,0]  // 25
            ,[0,0,0,0,0,0,0]  // 26
            ,[0,0,0,0,0,0,0]  // 27
            ,[0,0,0,0,0,0,0]  // 28
            ,[0,0,0,0,0,0,0]  // 29
          ]
          ,thaco: thacos.Fighter
        }

        ,{
          name: "Cavalier"
          ,dual: []
          ,HDT: 10
          ,prefs: [0,3,4,1,5,6,2]
          ,saves: saves.Fighter
          ,thaco: thacos.Fighter
        }

        ,{
          name: "Cleric"
          ,dual: [
            "Fighter"
            ,"Illusionist"
            ,"Mage"
            ,"Thief"
          ]
          ,HDT: 8
          ,prefs: [2,4,0,3,1,5,6]
          ,saves: saves.Cleric
          ,spells: [
            //1 2 3 4 5 6 7  Spell level
             [0,0,0,0,0,0,0]  //  0th level character
            ,[1,0,0,0,0,0,0]  //  1
            ,[2,0,0,0,0,0,0]  //  2
            ,[2,1,0,0,0,0,0]  //  3
            ,[3,2,0,0,0,0,0]  //  4
            ,[3,3,1,0,0,0,0]  //  5
            ,[1,3,2,0,0,0,0]  //  6
            ,[1,3,2,1,0,0,0]  //  7
            ,[3,3,3,2,0,0,0]  //  8
            ,[4,4,3,2,1,0,0]  //  9
            ,[4,4,3,3,2,0,0]  // 10
            ,[5,4,4,3,2,1,0]  // 11
            ,[6,5,5,3,2,2,0]  // 12
            ,[6,6,6,4,2,2,0]  // 13
            ,[6,6,6,5,3,2,0]  // 14
            ,[7,7,7,5,4,2,0]  // 15
            ,[7,7,7,6,5,3,1]  // 16
            ,[8,8,8,6,5,3,1]  // 17
            ,[8,8,8,7,6,4,1]  // 18
            ,[9,9,9,7,6,4,2]  // 19
            ,[9,9,9,8,7,5,2]  // 20
            ,[9,9,9,9,8,6,2]  // 21
            ,[9,9,9,9,9,6,3]  // 22
            ,[9,9,9,9,9,7,3]  // 23
            ,[9,9,9,9,9,8,3]  // 24
            ,[9,9,9,9,9,8,4]  // 25
            ,[9,9,9,9,9,9,4]  // 26
            ,[9,9,9,9,9,9,5]  // 27
            ,[9,9,9,9,9,9,6]  // 28
            ,[9,9,9,9,9,9,7]  // 29
          ]
          ,thaco: thacos.Cleric
        }

        ,{
          name: "Druid"
          ,dual: [
            "Fighter"
            ,"Illusionist"
            ,"Mage"
            ,"Thief"
          ]
          ,HDT: 8
          ,prefs: [2,5,3,4,1,0,6]
          ,saves: saves.Cleric
          ,spells: [
            //1 2 3 4 5 6 7  Spell level
             [0,0,0,0,0,0,0]  //  0th level character
            ,[2,0,0,0,0,0,0]  //  1
            ,[2,1,0,0,0,0,0]  //  2
            ,[3,2,1,0,0,0,0]  //  3
            ,[4,2,2,0,0,0,0]  //  4
            ,[4,3,2,0,0,0,0]  //  5
            ,[4,3,2,1,0,0,0]  //  6
            ,[4,4,3,1,0,0,0]  //  7
            ,[4,4,3,2,0,0,0]  //  8
            ,[5,4,3,2,1,0,0]  //  9
            ,[5,4,3,3,2,0,0]  // 10
            ,[5,5,3,3,2,1,0]  // 11
            ,[5,5,4,4,3,2,1]  // 12
            ,[6,5,5,5,4,3,2]  // 13
            ,[6,5,6,5,4,3,3]  // 14
            ,[6,6,6,5,4,3,3]  // 15
            ,[6,6,6,5,4,3,3]  // 16
            ,[7,6,6,6,4,3,3]  // 17
            ,[7,6,6,6,5,4,4]  // 18
            ,[7,7,6,6,5,4,4]  // 19
            ,[7,7,6,6,5,4,4]  // 20
            ,[8,7,7,7,5,4,4]  // 21
            ,[8,7,7,7,5,4,4]  // 22
            ,[8,8,7,7,6,5,4]  // 23
            ,[8,8,8,7,6,5,4]  // 24
            ,[9,8,8,7,6,5,4]  // 25
            ,[9,8,8,8,6,5,4]  // 26
            ,[9,9,8,8,6,5,5]  // 27
            ,[9,9,8,8,7,6,5]  // 28
            ,[9,9,9,9,7,6,6]  // 29
          ]
          ,thaco: thacos.Cleric
        }

        ,{
          name: "Fighter"
          ,dual: [
            "Cleric"
            ,"Druid"
            ,"Illusionist"
            ,"Mage"
            ,"Thief"
          ]
          ,HDT: 10
          ,prefs: [0,5,6,2,1,3,4]
          ,saves: saves.Fighter
          ,thaco: thacos.Fighter
        }

        ,{
          name: "Illusionist"
          ,dual: [
            "Cleric"
            ,"Druid"
            ,"Fighter"
            ,"Thief"
          ]
          ,HDT: 4
          ,prefs: [1,3,6,5,4,2,0]
          ,saves: saves.Mage
          ,spells: [
            //1 2 3 4 5 6 7  Spell level
             [0,0,0,0,0,0,0]  //  0th level character
            ,[1,0,0,0,0,0,0]  //  1
            ,[2,0,0,0,0,0,0]  //  2
            ,[2,1,0,0,0,0,0]  //  3
            ,[3,2,0,0,0,0,0]  //  4
            ,[4,2,1,0,0,0,0]  //  5
            ,[4,3,1,0,0,0,0]  //  6
            ,[4,3,2,0,0,0,0]  //  7
            ,[4,3,2,1,0,0,0]  //  8
            ,[4,3,3,2,0,0,0]  //  9
            ,[5,4,3,2,1,0,0]  // 10
            ,[5,4,4,3,2,0,0]  // 11
            ,[5,5,4,3,2,1,0]  // 12
            ,[5,5,4,3,2,2,0]  // 13
            ,[5,5,4,3,2,2,1]  // 14
            ,[5,5,5,4,2,2,2]  // 15
            ,[5,5,5,4,3,2,2]  // 16
            ,[5,5,5,5,3,2,2]  // 17
            ,[5,5,5,5,3,3,2]  // 18
            ,[5,5,5,5,4,3,2]  // 19
            ,[5,5,5,5,4,3,3]  // 20
            ,[5,5,5,5,5,4,3]  // 21
            ,[5,5,5,5,5,5,4]  // 22
            ,[5,5,5,5,5,5,5]  // 23
            ,[6,6,6,6,5,5,5]  // 24
            ,[6,6,6,6,6,6,6]  // 25
            ,[7,7,7,7,6,6,6]  // 26
            ,[8,7,7,7,6,6,6]  // 27
            ,[9,8,7,7,6,6,6]  // 28
            ,[9,9,9,7,7,7,7]  // 29
          ]
          ,thaco: thacos.Mage
        }

        ,{
          name: "Mage"
          ,dual: [
            "Cleric"
            ,"Druid"
            ,"Fighter"
            ,"Thief"
          ]
          ,HDT: 4
          ,prefs: [1,3,5,2,4,6,0]
          ,saves: saves.Mage
          ,spells: [
            //1 2 3 4 5 6 7 8 9  Spell level
             [0,0,0,0,0,0,0,0,0]  //  0th level character
            ,[1,0,0,0,0,0,0,0,0]  //  1
            ,[2,0,0,0,0,0,0,0,0]  //  2
            ,[2,1,0,0,0,0,0,0,0]  //  3
            ,[3,2,0,0,0,0,0,0,0]  //  4
            ,[4,2,1,0,0,0,0,0,0]  //  5
            ,[4,2,2,0,0,0,0,0,0]  //  6
            ,[4,3,2,1,0,0,0,0,0]  //  7
            ,[4,3,3,2,0,0,0,0,0]  //  8
            ,[4,3,3,2,1,0,0,0,0]  //  9
            ,[4,4,3,2,2,0,0,0,0]  // 10
            ,[4,4,4,3,3,0,0,0,0]  // 11
            ,[4,4,4,4,4,1,0,0,0]  // 12
            ,[5,5,5,4,4,2,0,0,0]  // 13
            ,[5,5,5,4,4,2,1,0,0]  // 14
            ,[5,5,5,5,5,2,1,0,0]  // 15
            ,[5,5,5,5,5,3,2,1,0]  // 16
            ,[5,5,5,5,5,3,3,2,0]  // 17
            ,[5,5,5,5,5,3,3,2,1]  // 18
            ,[5,5,5,5,5,3,3,3,1]  // 19
            ,[5,5,5,5,5,4,3,3,2]  // 20
            ,[5,5,5,5,5,4,4,4,2]  // 21
            ,[5,5,5,5,5,5,4,4,3]  // 22
            ,[5,5,5,5,5,5,5,5,3]  // 23
            ,[5,5,5,5,5,5,5,5,4]  // 24
            ,[5,5,5,5,5,5,5,5,5]  // 25
            ,[6,6,6,6,5,5,5,5,5]  // 26
            ,[6,6,6,6,6,6,6,5,5]  // 27
            ,[6,6,6,6,6,6,6,6,6]  // 28
            ,[7,7,7,7,6,6,6,6,6]  // 29
          ]
          ,thaco: thacos.Mage
        }

        ,{
          name: "Monk"
          ,dual: []
          ,HDT: 4
          ,prefs: [3,4,2,1,0,5,6]
          ,saves: saves.Thief
          ,thaco: thacos.Cleric
        }

        ,{
          name: "Paladin"
          ,dual: []
          ,HDT: 10
          ,prefs: [0,4,3,5,1,6,2]
          ,saves: saves.Fighter
          ,spells: [
            //1 2 3 4  Spell level
             [0,0,0,0]  //  0th level character
            ,[0,0,0,0]  //  1
            ,[0,0,0,0]  //  2
            ,[0,0,0,0]  //  3
            ,[0,0,0,0]  //  4
            ,[0,0,0,0]  //  5
            ,[0,0,0,0]  //  6
            ,[0,0,0,0]  //  7
            ,[0,0,0,0]  //  8
            ,[1,0,0,0]  //  9
            ,[2,0,0,0]  // 10
            ,[2,1,0,0]  // 11
            ,[2,2,0,0]  // 12
            ,[2,2,1,0]  // 13
            ,[3,2,1,0]  // 14
            ,[3,2,1,1]  // 15
            ,[3,3,1,1]  // 16
            ,[3,3,2,1]  // 17
            ,[3,3,3,1]  // 18
            ,[4,3,3,2]  // 19
            ,[4,3,3,3]  // 20
            ,[4,3,3,3]  // 21
            ,[4,4,3,3]  // 22
            ,[4,4,3,3]  // 23
            ,[5,4,4,3]  // 24
            ,[5,4,4,3]  // 25
            ,[5,4,4,3]  // 26
            ,[5,5,5,4]  // 27
            ,[5,5,5,4]  // 28
            ,[6,5,5,4]  // 29
          ]
          ,thaco: thacos.Fighter
        }

        ,{
          name: "Ranger"
          ,dual: []
          ,HDT: 10
          ,prefs: [0,4,3,2,5,6,1]
          ,saves: saves.Fighter
          ,spells: [
            //1 2 3 4 5  Spell level
             [0,0,0,0,0]  //  0th level character
            ,[0,0,0,0,0]  //  1
            ,[0,0,0,0,0]  //  2
            ,[0,0,0,0,0]  //  3
            ,[0,0,0,0,0]  //  4
            ,[0,0,0,0,0]  //  5
            ,[0,0,0,0,0]  //  6
            ,[0,0,0,0,0]  //  7
            ,[1,0,0,0,0]  //  8
            ,[1,0,0,1,0]  //  9
            ,[2,0,0,1,0]  // 10
            ,[2,0,0,2,0]  // 11
            ,[2,1,0,2,0]  // 12
            ,[2,1,0,2,1]  // 13
            ,[2,2,0,2,1]  // 14
            ,[2,2,0,2,2]  // 15
            ,[2,2,1,2,2]  // 16
            ,[3,2,2,2,2]  // 17
            ,[3,2,2,2,2]  // 18
            ,[3,2,2,2,2]  // 19
            ,[3,3,2,2,2]  // 20
            ,[3,3,2,2,2]  // 21
            ,[3,3,2,2,2]  // 22
            ,[3,3,3,2,2]  // 23
            ,[3,3,3,2,2]  // 24
            ,[4,3,3,2,2]  // 25
            ,[4,4,3,3,2]  // 26
            ,[4,4,4,3,2]  // 27
            ,[4,4,4,3,2]  // 28
            ,[5,4,4,4,3]  // 29
          ]
          ,thaco: thacos.Fighter
        }

        ,{
          name: "Thief"
          ,dual: [
            "Cleric"
            ,"Fighter"
            ,"Druid"
            ,"Illusionist"
            ,"Mage"
          ]
          ,HDT: 6
          ,prefs: [3,1,5,4,0,2,6]
          ,saves: saves.Thief
          ,skills: thieving
          ,thaco: thacos.Thief
        }
      ];

  function Role (config) {
    if (!config.name) {
      throw new Error("No '.name' property given in config passed into Role constructor.");
    }

    if (!config.dual) {
      throw new Error("No '.dual' property given in config passed into Role constructor.");
    }

    if (!Util.isNumeric(config.HDT) || config.HDT < 4) {
      throw new Error("Invalid '.HDT' property given in config passed into Role constructor (" + config.HDT + ").");
    }

    if (config.prefs.length !== 7) {
      throw new Error("Invalid '.prefs' property given in config passed into Role constructor (" + config.prefs + ").");
    }

    if (config.saves.length !== 23) {
      throw new Error("Invalid '.saves' table-property given in config passed into Role constructor (" + config.saves + ").");
    }

    if (config.thaco.length !== 25) {
      throw new Error("Invalid '.thaco' table-property given in config passed into Role constructor (" + config.thaco + ").");
    }

    for (var attr in config) {
      this[attr] = config[attr];
    }
  }

  Role.prototype = {
    getType: function () {

      return "[object Class]";
    }

    ,toString: function () {

      return this.name;
    }
  };

  allClasses = new Collection()
    .add(classConfigs
      .map(function (config) {
        return new Role(config);
      }));

  allClasses.duals = function () {
    return new Collection().add(allClasses.filter(function (item) {
      return item.dual.length > 0;
    }));
  }.bind(allClasses);

  allClasses.merge = function (_a, _b) {
    if ((_b === undefined || _b === "") && !!allClasses.named(_a)) {
      return allClasses.named(_a);
    }

    if (_a === _b || _a === undefined || !allClasses.named(_a) || !allClasses.named(_b)) {
      throw new Error("Invalid arguments passed to Classes.merge(): " + [_a, _b]);
    }

    _a = allClasses.named(_a);
    _b = allClasses.named(_b);

    return new Role({
       name: _a.name + "/" + _b.name

      ,dual: []

      ,HDT: (_a.HDT + _b.HDT) / 2

      ,prefs: (function (a, b) {
        var  i = 0
            ,l = a.length
            ,result = [];

        for ( ; i < l; i++) {
          result.indexOf(a[i]) === -1 && result.push(a[i]);
          result.indexOf(b[i]) === -1 && result.push(b[i]);
        }

        return result;
      }(_a.prefs, _b.prefs))

      ,saves: (function (a, b) {
        var level = [],
            result = [];

        while (result.length < a.length) {
          level = [];

          while (level.length < a[0].length) {
            level.push(a[result.length][level.length] < b[result.length][level.length] ? a[result.length][level.length] : b[result.length][level.length]);
          }

          result.push(level);
        }

        return result;
      }(_a.saves, _b.saves))

      ,spells: (function (a, b) {
        if (a || b) {
          return [a, b];
        }
      }(_a.spells, _b.spells))

      ,thaco: (function (a, b) {
        var indx = 0,
            result = [];

        while (indx < a.length) {
          result.push(a[indx] < b[indx] ? a[indx] : b[indx]);
          indx++;
        }

        return result;
      }(_a.thaco, _b.thaco))
    });
  };

  return allClasses;
});
/*jshint laxcomma:true bitwise:false*/
/*global define*/

define('Races',["Collection", "Util"], function (Collection, Util) {
  

  var languages = [
        "burrowing mammal"
        ,"dwarven"
        ,"elvish"
        ,"gnoll"
        ,"gnome"
        ,"goblin"
        ,"halfling"
        ,"hobgoblin"
        ,"kobold"
        ,"orcish"
        ,"common"
      ]
    , racesConfigs =  [
        {
          name          : "Dwarf"
          ,infravision  : 60
          ,languages    : [4, 5, 8, 9]
          ,move         : 6
          ,notes        : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
          ,saves        : [1, 0, 1, 0, 1]
          ,stats        : [0, 0, 0, 0, 1, -1, 0]
          ,thieving     : [0, 10, 15, 0, 0, 0, -10, -5]
        }

        ,{
          name          : "Elf"
          ,infravision  : 60
          ,languages    : [3, 4, 5, 6, 7, 9]
          ,move         : 12
          ,notes        : ""
          ,saves        : [0, 0, 0, 0, 0]
          ,stats        : [0, 0, 0, 1, -1, 0, 0]
          ,thieving     : [5, -5, 0, 5, 10, 5, 0, 0]
        }

        ,{
          name          : "Gnome"
          ,infravision  : 60
          ,languages    : [0, 1, 6, 5, 8]
          ,move         : 6
          ,notes        : "+1 on saves(rsw, sp) for each 3 1/2 of con"
          ,saves        : [0, 0, 1, 0, 1]
          ,stats        : [-1, 0, 0, 1, 0, 0, 0]
          ,thieving     : [0, 5, 10, 5, 5, 10, 15, 0]
        }

        ,{
          name          : "Goblin"
          ,infravision  : 30
          ,languages    : [1, 3, 7, 8]
          ,move         : 8
          ,notes        : ""
          ,saves        : [0, 0, 0, 0, 0]
          ,stats        : [-1, 1, 0, 1, 0, -1, 0]
          ,thieving     : [ 0, 15, 10, 0, 0, 15, 0, 15]
        }

        ,{
          name          : "Half-Elf"
          ,infravision  : 60
          ,languages    : [3, 4, 5, 6, 7, 9]
          ,move         : 12
          ,notes        : ""
          ,saves        : [0, 0, 0, 0, 0]
          ,stats        : [0, 0, 0, 0, 0, 0, 0]
          ,thieving     : [10, 0, 0, 5, 0, 0, 0, 0]
        }

        ,{
          name          : "Half-Orc"
          ,infravision  : 60
          ,languages    : [9]
          ,move         : 12
          ,notes        : ""
          ,saves        : [0, 0, 0, 0, 0]
          ,stats        : [1, 0, 0, 0, 1, -1, 0]
          ,thieving     : [ -5, 5, 5, 0, 0, 5, 5, -10]
        }

        ,{
          name          : "Halfling"
          ,infravision  : 30
          ,languages    : [1, 2, 4, 5, 9]
          ,move         : 6
          ,notes        : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
          ,saves        : [1, 0, 1, 0, 1]
          ,stats        : [-1, 0, 0, 1, 0, 0, 0]
          ,thieving     : [ 5, 5, 5, 10, 15, 5, -15, -5]
        }

        ,{
          name          : "Human"
          ,infravision  : 0
          ,languages    : [10]
          ,move         : 12
          ,notes        : ""
          ,saves        : [0, 0, 0, 0, 0]
          ,stats        : [0, 0, 0, 0, 0, 0, 0]
          ,thieving     : [0, 0, 0, 0, 0, 0, 0, 0]
        }
      ];

  function pickLanguages (languages, ar) {

    return [languages[~~ar.shift()]]
      .concat(!ar.length ? [] : pickLanguages(languages, ar));
  }

  function Race (config) {
    if (!config.name
    || !Util.isNumeric(config.infravision)
    || !config.languages.length
    || config.saves.length !== 5
    || config.stats.length !== 7
    || config.thieving.length !== 8
    || !Util.isNumeric(config.move)) {
      throw new Error({
        args: arguments
        ,fn: "Race constructor"
      });
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

      return "Race";
    }
  };

  return new Collection(racesConfigs
    .map(function (config) {
      return new Race(config);
    }));
});
/*jshint laxcomma:true*/
/*global require define*/

require.config({
  basePath: "js"
  ,paths: {
    handlebars: "lib/handlebars"
    ,jquery: ["//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min", "lib/jquery"]
  }
  ,shim: {
    handlebars: {
      exports: "handlebars"
    }
  }
});

// UI setup
require([
  "jquery"
  ,"Castes"
  ,"Classes"
  ,"Races"
  ], function ($, Castes, Classes, Races) {
  

  var $caste        = $("#caste")
    , $class_alpha  = $("#class-alpha")
    , $class_beta   = $("#class-beta")
    , $dual         = $("#strictDual")
    , $level        = $("#level")
    , $race         = $("#race")
    , ui_elements   = "#caste, #class-alpha, #class-beta, #level, #race, #strictDual"
    ;

  function attemptPlayerCreation (event) {
  }

  function dualClassHandler (event) {
    var class_alphaValue      = $class_alpha.find("option:selected").val()
      , alpha_className       = $class_alpha.find("option:selected").text()
      , isClassAlphaDualable  = !$dual.is(":checked") || $dual.is(":checked") && Classes[+class_alphaValue].dual.length
      , isClassAlphaSelected  = class_alphaValue !== ""
      , isClassBetaEmpty      = $("#class-beta option").length === 1
      , isStrictDualEvent     = event.target === $dual[0]
      , isRepaintNeeded       = isClassBetaEmpty || isStrictDualEvent

      , list;
    // !BUG: when a beta is selected and strictDual is unchecked, selection is lost

    // add list of character classes to the beta dropdown
    if (isClassAlphaSelected && isClassAlphaDualable && isRepaintNeeded) {
      list = ($dual.is(":checked") ? Classes.duals() : Classes)
        .filter(function (item) {
          return item.name !== alpha_className;
        });

      $class_beta
        .empty()
        .append($class_alpha.children().first().clone())
        .append(list.map(selectOption));
    } else {
      $class_beta
        .empty()
        .append("<option></option>");
    }
  }

  function radioItem (prefix, item, indx) {
    return '<label for="{pre}-{name}"><input id="{pre}-{name}" name="{pre}" type="radio" value="{i}"> {name}</label>'
      .replace(/\{i\}/g, indx)
      .replace(/\{pre\}/g, prefix)
      .replace(/\{name\}/g, item.name);
  }

  function selectOption (item, indx) {
    return '<option value="{i}">{name}</option>'
      .replace(/\{i\}/g, indx)
      .replace(/\{name\}/g, item.name);
  }

  function statColumn (event) {
    if (!/label/i.test(event.target.nodeName)) {
      var column = Castes[event.target.value].column()//.join("\n")
        , target = $(event.target);

      target
        .parentsUntil("fieldset")
        .parent()
        .find("span")
        .remove();

      target
        .parent()
        .append($("<span>").text(column));
    }
  }

  $(document)
    .on("click", "#caste label", statColumn)
    .on("change", "#class-alpha, #class-alpha, #strictDual", dualClassHandler)
    .on("change", ui_elements, attemptPlayerCreation);
  
  $.fn.ready(function () {
    $caste
      .append(Castes.map(radioItem.bind(null, "caste")));

    $class_alpha
      .append(Classes.map(selectOption));

    $race
      .append(Races.map(selectOption));
  });
});

define("roll", [], function () {
  
  
  return function (num, faces, sum) {
    var result = [];

    if (!faces) {
      faces = num;
      num = 1;
    }

    while (num > result.length) {
      result.push(parseInt(Math.random() * faces, 10) + 1);
    }

    return num === 1 ? result[0] : (sum ? result.reduce(function (a, b) { return a + b; }) : result);
  };
});

define("js/main", function(){});