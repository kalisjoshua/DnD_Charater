//// ref_races.js

var Races = (function () {
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

        ,list = function (ar) {
            var result = [];

            ar.forEach(function (n) {
                result.push(languages[n]);
            });

            return result;
        };

    return [
            {
                name         : "Dwarf",
                infravision   : 60,
                languages     : list([4, 5, 8, 9]),
                modifiers     : {
                              // pd, pp, rw, bw, sp
                    saves     : [0,  0,  0,  0,  0],
                    stats     : [0, 0, 0, 0, 1, -1, 0],
                    thieving  : [0, 10, 15, 0, 0, 0, -10, -5]
                },
                move          : 6,
                notes         : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
            },
            
            {
                name         : "Elf",
                infravision   : 60,
                languages     : list([3, 4, 5, 6, 7, 9]),
                modifiers     : {
                              // pd, pp, rw, bw, sp
                    saves     : [0,  0,  0,  0,  0],
                    stats     : [0, 0, 0, 1, -1, 0, 0],
                    thieving  : [5, -5, 0, 5, 10, 5, 0, 0]
                },
                move          : 12,
                notes         : ""
            },
            
            {
                name         : "Gnome",
                infravision   : 60,
                languages     : list([0, 1, 6, 5, 8]),
                modifiers     : {
                              // pd, pp, rw, bw, sp
                    saves     : [0,  0,  0,  0,  0],
                    stats     : [-1, 0, 0, 1, 0, 0, 0],
                    thieving  : [0, 5, 10, 5, 5, 10, 15, 0]
                },
                move          : 6,
                notes         : "+1 on saves(rsw, sp) for each 3 1/2 of con"
            },
            
            {
                name         : "Goblin",
                infravision   : 30,
                languages     : list([1, 3, 7, 8]),
                modifiers     : {
                              // pd, pp, rw, bw, sp
                    saves     : [0,  0,  0,  0,  0],
                    stats     : [-1, 1, 0, 1, 0, -1, 0],
                    thieving  : [ 0, 15, 10, 0, 0, 15, 0, 15]
                },
                move          : 8,
                notes         : ""
            },
            
            {
                name         : "Half-Elf",
                infravision   : 60,
                languages     : list([3, 4, 5, 6, 7, 9]),
                modifiers     : {
                              // pd, pp, rw, bw, sp
                    saves     : [0,  0,  0,  0,  0],
                    stats     : [0, 0, 0, 0, 0, 0, 0],
                    thieving  : [10, 0, 0, 5, 0, 0, 0, 0]
                },
                move          : 12,
                notes         : ""
            },
            
            {
                name         : "Half-Orc",
                infravision   : 60,
                languages     : list([9]),
                modifiers     : {
                              // pd, pp, rw, bw, sp
                    saves     : [0,  0,  0,  0,  0],
                    stats     : [1, 0, 0, 0, 1, -1, 0],
                    thieving  : [ -5, 5, 5, 0, 0, 5, 5, -10]
                },
                move          : 12,
                notes         : ""
            },
            
            {
                name         : "Halfling",
                infravision   : 30,
                languages     : list([1, 2, 4, 5, 9]),
                modifiers     : {
                              // pd, pp, rw, bw, sp
                    saves     : [0,  0,  0,  0,  0],
                    stats     : [-1, 0, 0, 1, 0, 0, 0],
                    thieving  : [ 5, 5, 5, 10, 15, 5, -15, -5]
                },
                move          : 6,
                notes         : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
            },
            
            {
                name         : "Human",
                infravision   : 0,
                languages     : list([10]),
                modifiers     : {
                              // pd, pp, rw, bw, sp
                    saves     : [0,  0,  0,  0,  0],
                    stats     : [0, 0, 0, 0, 0, 0, 0],
                    thieving  : [0, 0, 0, 0, 0, 0, 0, 0]
                },
                move          : 12,
                notes         : ""
            }
        ];
}());
