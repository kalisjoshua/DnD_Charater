//// stats.js

var stats = (function (table) {
    var 
        obj = function (a) {
            this.push.apply(this, a);
        }

        ,Exceptional

        ,create = function (ar, resequence) {
            if (!ar || !Util.isArray(ar) || ar.length !== 7 || !ar.every(isValid) || ar.join(",").split(",").length !== ar.length) {
                throw new Error("Invalid array passed into stats constructor: " + ar);
            }

            return resequence && Util.isArray(resequence) ? obj.fn.resequence(ar, resequence) : new obj(ar);
        }

        isValid = function (v, a) {
            if (v !== parseInt(v, 10) || v < 3 || v > 24) {
                throw new Error("Invalid value passed to stats.set(" + a + "): " + v);
            }

            return true;
        }

        ,range = function (e) {
            return [50, 75, 90, 99].filter(function (n) {
                return n < e;
            }).length;
        }

        ,render = function (template, data){
            for(var property in data) {
                template = template.replace(new RegExp("{[" + property + "]}", "g"), data[property]);
            }

            return template;
        }

        ,skillNames = [];
    
    obj.fn = obj.prototype = new Array();

    obj.fn.details = function (ability) {
        var result = [],
            self = this;

        ability = !ability ? skillNames : Util.isArray(ability) ? ability : [ability];

        ability.forEach(function (node, indx, orig) {
            result.push(render(obj.fn.matrix[skillNames.indexOf(node)].detail, table[node][self[indx]]));
        });

        if (ability.indexOf("Strength") >= 0 && self[5] === 18 && self.getExceptional()) {
            result[ability.indexOf("Strength")] = render(obj.fn.matrix[5].detail, table.Exceptional[range(self.getExceptional())]);
        }

        return result;
    };

    obj.fn.matrix = [
         {name: "Charisma"      ,detail: "Max Henchment: {0}, Base Loyalty: {1}, Reaction Adjustment: {2}"}
        ,{name: "Comeliness"    ,detail: "Response: {0}, Charisma Bonus: {1}"}
        ,{name: "Constitution"  ,detail: "HP Adjustment: {0}, System Shock: {1}, Raise Survival: {2}, Number of times Raised: {3}"}
        ,{name: "Dexterity"     ,detail: "Reaction Adjustment: {0}, Missile Adjustment: {1}, Defensive Adjustment: {2}"}
        ,{name: "Intelligence"  ,detail: "Additional Languages: {0}, Know Spell: {1}, Minimum Spells: {2}, Maximum Spells: {3}"}
        ,{name: "Strength"      ,detail: "THAC0 Adjustment: {0}, Damage Adjustment: {1}, Weight Adjustment: {2}, Open Doors: {3}, Bend Bars: {4}"}
        ,{name: "Wisdom"        ,detail: "Magic Adjustment: {0}, Spell Failure: {1}, Bonus Spells: {2}"}
    ];
    skillNames = obj.fn.matrix.map(function (n) {
        return n.name;
    });

    obj.fn.resequence = function (orig, pref) {
        if (!pref && this.getType && this.getType() === "stats") {
            pref = orig;
            orig = ([]).slice.call(this);
        }

        orig.sort(function (a, b) {return a - b});
        orig = orig.reverse();
        
        return create([
             orig[pref[0]]
            ,orig[pref[1]]
            ,orig[pref[2]]
            ,orig[pref[3]]
            ,orig[pref[4]]
            ,orig[pref[5]]
            ,orig[pref[6]]
        ]);
    };

    obj.fn.get = function (ability) {
        return this[skillNames.indexOf(ability)];
    };

    obj.fn.set = function (ability, v) {
        if (v && isValid(v, ability)) {
            this[skillNames.indexOf(ability)] = v;
        }

        return v;
    };

    obj.fn.getExceptional = function (e) {
        return Exceptional;
    };

    obj.fn.setExceptional = function (e) {
        if (e && e === parseInt(e, 10) && e >= 0) {
            if (this[5] === 18) {
                Exceptional = e;
            } else {
                throw new Error("Attempting to set Exceptional Strength when base strength is not 18");
            }
        } else {
            throw new Error("Invalid value passed to skills.setExceptional(): " + e);
        }

        return e;
    };

    obj.fn.getType = function () {
        return "stats";
    };

    obj.fn.toString = function () {
        return "[object Stats]";
    };
    
    return create;
}({
    Charisma: [
         [],[],[] // tables start at ability score 3
        ,[ 1, -30, -25,  -5] //  3
        ,[ 1, -25, -20,  -3] //  4
        ,[ 2, -20,  15,  -3] //  5
        ,[ 2, -15, -10,  -1] //  6
        ,[ 3, -10,  -5,  -1] //  7
        ,[ 3,  -5,   0,  -1] //  8
        ,[ 4,   0,   0,   0] //  9
        ,[ 4,   0,   0,   0] // 10
        ,[ 4,   0,   0,   0] // 11
        ,[ 5,   0,   0,   0] // 12
        ,[ 5,   0,   5,   1] // 13
        ,[ 6,   5,  10,   1] // 14
        ,[ 7,  15,  15,   1] // 15
        ,[ 8,  20,  25,   2] // 16
        ,[10,  30,  30,   2] // 17
        ,[15,  40,  35,   3] // 18
        ,[18,  55,  45,   5] // 19
        ,[24,  75,  65,   5] // 20
        ,[27,  85,  75,   7] // 21
        ,[30,  89,  80,  10] // 22
        ,[32,  93,  83,  11] // 23
        ,[35,  97,  86,  12] // 24
    ]

    ,Constitution: [
         [],[],[] // tables start at ability score 3
        ,[-2,  35,  40,  0] //  3
        ,[-1,  40,  45,  0] //  4
        ,[-1,  45,  50,  0] //  5
        ,[-1,  50,  55,  0] //  6
        ,[ 0,  55,  60,  0] //  7
        ,[ 0,  60,  65,  0] //  8
        ,[ 0,  65,  70,  0] //  9
        ,[ 0,  70,  75,  0] // 10
        ,[ 0,  75,  80,  0] // 11
        ,[ 0,  80,  85,  0] // 12
        ,[ 0,  85,  90,  0] // 13
        ,[ 0,  88,  92,  0] // 14
        ,[ 1,  91,  94,  0] // 15
        ,[ 2,  95,  96,  0] // 16
        ,[ 3,  97,  98,  0] // 17
        ,[ 4,  99, 100,  0] // 18
        ,[ 4, 100, 100,  0] // 19
        ,[ 5, 100, 100,  0] // 20
        ,[ 5, 100, 100,  0] // 21
        ,[ 6, 100, 100,  0] // 22
        ,[ 7, 100, 100,  0] // 23
        ,[10, 100, 100,  0] // 24
    ]

    ,Comeliness: [
         [],[],[] // tables start at ability score 3
        ,['', '', ''] //  3
        ,['', '', ''] //  4
        ,['', '', ''] //  5
        ,['', '', ''] //  6
        ,['', '', ''] //  7
        ,['', '', ''] //  8
        ,['', '', ''] //  9
        ,['', '', ''] // 10
        ,['', '', ''] // 11
        ,['', '', ''] // 12
        ,['', '', ''] // 13
        ,['', '', ''] // 14
        ,['', '', ''] // 15
        ,['', '', ''] // 16
        ,['', '', ''] // 17
        ,['', '', ''] // 18
        ,['', '', ''] // 19
        ,['', '', ''] // 20
        ,['', '', ''] // 21
        ,['', '', ''] // 22
        ,['', '', ''] // 23
        ,['', '', ''] // 24
    ]

    ,Dexterity: [
         [],[],[] // tables start at ability score 3
        ,[-3, -3,  4] //  3
        ,[-2, -2,  3] //  4
        ,[-1, -1,  2] //  5
        ,[ 0,  0,  1] //  6
        ,[ 0,  0,  0] //  7
        ,[ 0,  0,  0] //  8
        ,[ 0,  0,  0] //  9
        ,[ 0,  0,  0] // 10
        ,[ 0,  0,  0] // 11
        ,[ 0,  0,  0] // 12
        ,[ 0,  0,  0] // 13
        ,[ 0,  0,  0] // 14
        ,[ 0,  0, -1] // 15
        ,[ 1,  1, -2] // 16
        ,[ 2,  2, -3] // 17
        ,[ 3,  3, -4] // 18
        ,[ 4,  4, -5] // 19
        ,[ 5,  5, -6] // 20
        ,[ 6,  6, -6] // 21
        ,[ 6,  6, -7] // 22
        ,[ 6,  7, -7] // 23
        ,[ 7,  7, -8] // 24
    ]

    ,Intelligence: [
         [],[],[] // tables start at ability score 3
        ,[ 0,  0,  0,  0] //  3
        ,[ 0,  0,  0,  0] //  4
        ,[ 0,  0,  0,  0] //  5
        ,[ 0,  0,  0,  0] //  6
        ,[ 0,  0,  0,  0] //  7
        ,[ 1,  0,  0,  0] //  8
        ,[ 1, 35,  4,  6] //  9
        ,[ 2, 45,  5,  7] // 10
        ,[ 2, 45,  5,  7] // 11
        ,[ 3, 45,  5,  7] // 12
        ,[ 3, 55,  6,  9] // 13
        ,[ 4, 55,  6,  9] // 14
        ,[ 4, 65,  7, 11] // 15
        ,[ 5, 65,  7, 11] // 16
        ,[ 6, 75,  8, 14] // 17
        ,[ 7, 85,  9, 18] // 18
        ,[ 8, 95, 10, 99] // 19
        ,[ 9, 98, 11, 99] // 20
        ,[10, 98, 12, 99] // 21
        ,[11, 98, 13, 99] // 22
        ,[12, 98, 13, 99] // 23
        ,[12, 98, 14, 99] // 24
    ]

    ,Strength: [
         [],[],[] // tables start at ability score 3
        ,[-3, -1, -350,   '1/6',  0] //  3 
        ,[-2, -1, -250,   '1/6',  0] //  4
        ,[-2, -1, -250,   '1/6',  0] //  5
        ,[-1,  0, -150,   '1/6',  0] //  6
        ,[-1,  0, -150,   '1/6',  0] //  7
        ,[ 0,  0,    0,   '2/6',  1] //  8
        ,[ 0,  0,    0,   '2/6',  1] //  9
        ,[ 0,  0,    0,   '2/6',  2] // 10
        ,[ 0,  0,    0,   '2/6',  2] // 11
        ,[ 0,  0,  100,   '2/6',  4] // 12
        ,[ 0,  0,  100,   '2/6',  4] // 13
        ,[ 0,  0,  200,   '2/6',  7] // 14
        ,[ 0,  0,  200,   '2/6',  7] // 15
        ,[ 0,  1,  350,   '3/6', 10] // 16
        ,[ 1,  1,  500,   '3/6', 13] // 17
        ,[ 1,  2,  750,   '3/6', 16] // 18
        ,[ 3,  7, 1250,   '7/8', 25] // 19
        ,[ 3,  8, 1750,   '7/8', 38] // 20
        ,[ 4,  9, 2250,  '9/10', 50] // 21
        ,[ 4, 10, 2750, '11/12', 65] // 22
        ,[ 5, 11, 3250, '11/12', 73] // 23
        ,[ 6, 12, 3600, '19/20', 82] // 24
    ]

    ,Exceptional: [
         [ 1,  3, 1000,   '3/6', 20] // 18 /  1-50
        ,[ 2,  3, 1250,   '4/6', 25] // 18 / 51-75
        ,[ 2,  4, 1500,   '4/6', 30] // 18 / 76-90
        ,[ 2,  5, 2000,   '4/6', 35] // 18 / 91-99
        ,[ 3,  6, 3000,   '5/6', 40] // 18 / 100+
    ]

    ,Wisdom: [
         [],[],[] // tables start at ability score 3
        ,[-3, 100, ""] //  3
        ,[-2, 100, ""] //  4
        ,[-1, 100, ""] //  5
        ,[-1, 100, ""] //  6
        ,[-1, 100, ""] //  7
        ,[ 0, 100, ""] //  8
        ,[ 0,  20, ""] //  9
        ,[ 0,  15, ""] // 10
        ,[ 0,  10, ""] // 11
        ,[ 0,   5, ""] // 12
        ,[ 0,   0, "1"] // 13
        ,[ 0,   0, "1,1"] // 14
        ,[ 1,   0, "1,1,2"] // 15
        ,[ 2,   0, "1,1,2,2"] // 16
        ,[ 3,   0, "1,1,2,2,3"] // 17
        ,[ 4,   0, "1,1,2,2,3,4"] // 18
        ,[ 5,   0, "1,1,2,2,3,4,5"] // 19
        ,[ 6,   0, "1,1,2,2,3,4,5,6"] // 20
        ,[ 6,   0, "1,1,1,2,2,2,3,3,4,5,6"] // 21
        ,[ 6,   0, "1,1,1,2,2,2,3,3,4,4,5,6"] // 22
        ,[ 6,   0, "1,1,1,1,2,2,2,2,3,3,3,4,4,5,6"] // 23
        ,[ 6,   0, "1,1,1,1,2,2,2,2,3,3,3,4,4,4,5,6,7"] // 24
    ]
}));
