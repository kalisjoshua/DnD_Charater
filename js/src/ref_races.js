//// ref_races.js
    
Reference.Races = {
    "Dwarf": {
        infravision   : 60,
        languages     : Util.languages([4, 5, 8, 9]),
        move          : 6,
        raceName      : "Dwarf",
        statModifiers : [0, 0, 0, 0, 1, -1, 0],
        savesBonus    : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con",
        thiefSkills   : [0, 10, 15, 0, 0, 0, -10, -5]
    },
    
    "Elf": {
        infravision   : 60,
        languages     : Util.languages([3, 4, 5, 6, 7, 9]),
        move          : 12,
        raceName      : "Elf",
        statModifiers : [0, 0, 0, 1, -1, 0, 0],
        savesBonus    : "",
        thiefSkills   : [5, -5, 0, 5, 10, 5, 0, 0]
    },
    
    "Gnome": {
        infravision   : 60,
        languages     : Util.languages([0, 1, 6, 5, 8]),
        move          : 6,
        raceName      : "Gnome",
        statModifiers : [-1, 0, 0, 1, 0, 0, 0],
        savesBonus    : "+1 on saves(rsw, sp) for each 3 1/2 of con",
        thiefSkills   : [0, 5, 10, 5, 5, 10, 15, 0]
    },
    
    "Goblin": {
        infravision   : 30,
        languages     : Util.languages([1, 3, 7, 8]),
        move          : 8,
        raceName      : "Goblin",
        statModifiers : [-1, 1, 0, 1, 0, -1, 0],
        savesBonus    : "",
        thiefSkills   : [ 0, 15, 10, 0, 0, 15, 0, 15]
    },
    
    "Half-Elf": {
        infravision   : 60,
        languages     : Util.languages([3, 4, 5, 6, 7, 9]),
        move          : 12,
        raceName      : "Half-Elf",
        statModifiers : [0, 0, 0, 0, 0, 0, 0],
        savesBonus    : "",
        thiefSkills   : [10, 0, 0, 5, 0, 0, 0, 0]
    },
    
    "Half-Orc": {
        infravision   : 60,
        languages     : Util.languages([9]),
        move          : 12,
        raceName      : "Half-Orc",
        statModifiers : [1, 0, 0, 0, 1, -1, 0],
        savesBonus    : "",
        thiefSkills   : [ -5, 5, 5, 0, 0, 5, 5, -10]
    },
    
    "Halfling": {
        infravision   : 30,
        languages     : Util.languages([1, 2, 4, 5, 9]),
        move          : 6,
        raceName      : "Halfling",
        statModifiers : [-1, 0, 0, 1, 0, 0, 0],
        savesBonus    : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con",
        thiefSkills   : [ 5, 5, 5, 10, 15, 5, -15, -5]
    },
    
    "Human": {
        infravision   : 0,
        languages     : Util.languages([10]),
        move          : 12,
        raceName      : "Human",
        statModifiers : [0, 0, 0, 0, 0, 0, 0],
        savesBonus    : "",
        thiefSkills   : [0, 0, 0, 0, 0, 0, 0, 0]
    }
};

