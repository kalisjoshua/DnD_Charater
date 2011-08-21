//// ref_races.js

var Races = [
        {
            title         : "Dwarf",
            infravision   : 60,
            languages     : [4, 5, 8, 9],
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
            title         : "Elf",
            infravision   : 60,
            languages     : [3, 4, 5, 6, 7, 9],
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
            title         : "Gnome",
            infravision   : 60,
            languages     : [0, 1, 6, 5, 8],
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
            title         : "Goblin",
            infravision   : 30,
            languages     : [1, 3, 7, 8],
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
            title         : "Half-Elf",
            infravision   : 60,
            languages     : [3, 4, 5, 6, 7, 9],
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
            title         : "Half-Orc",
            infravision   : 60,
            languages     : [9],
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
            title         : "Halfling",
            infravision   : 30,
            languages     : [1, 2, 4, 5, 9],
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
            title         : "Human",
            infravision   : 0,
            languages     : [10],
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
