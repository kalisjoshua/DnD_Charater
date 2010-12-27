//// races.js
    
prv.races = {
    "Dwarf": {
    	abilities   : [0, 10, 15, 0, 0, 0, -10, -5],
    	infravision : 60,
    	languages   : prv.util.langs([4, 5, 8, 9]),
    	move        : 6,
    	raceName    : "Dwarf",
    	stats       : [0, 0, 0, 0, 1, -1, 0],
    	savesBonus  : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
    },
    
    "Elf": {
    	abilities   : [5, -5, 0, 5, 10, 5, 0, 0],
    	infravision : 60,
    	languages   : prv.util.langs([3, 4, 5, 6, 7, 9]),
    	move        : 12,
    	raceName    : "Elf",
    	stats       : [0, 0, 0, 1, -1, 0, 0],
    	savesBonus  : ""
    },
    
    "Gnome": {
    	abilities   : [0, 5, 10, 5, 5, 10, 15, 0],
    	infravision : 60,
    	languages   : prv.util.langs([0, 1, 6, 5, 8]),
    	move        : 6,
    	raceName    : "Gnome",
    	stats       : [-1, 0, 0, 1, 0, 0, 0],
    	savesBonus  : "+1 on saves(rsw, sp) for each 3 1/2 of con"
    },
    
    "Goblin": {
    	abilities   : [ 0, 15, 10, 0, 0, 15, 0, 15],
    	infravision : 30,
    	languages   : prv.util.langs([1, 3, 7, 8]),
    	move        : 8,
    	raceName    : "Goblin",
    	stats       : [-1, 1, 0, 1, 0, -1, 0],
    	savesBonus  : ""
    },
    
    "Half-Elf": {
    	abilities   : [10, 0, 0, 5, 0, 0, 0, 0],
    	infravision : 60,
    	languages   : prv.util.langs([3, 4, 5, 6, 7, 9]),
    	move        : 12,
    	raceName    : "Half-Elf",
    	stats       : [0, 0, 0, 0, 0, 0, 0],
    	savesBonus  : ""
    },
    
    "Half-Orc": {
    	abilities   : [ -5, 5, 5, 0, 0, 5, 5, -10],
    	infravision : 60,
    	languages   : prv.util.langs([9]),
    	move        : 12,
    	raceName    : "Half-Orc",
    	stats       : [1, 0, 0, 0, 1, -1, 0],
    	savesBonus  : ""
    },
    
    "Halfling": {
    	abilities   : [ 5, 5, 5, 10, 15, 5, -15, -5],
    	infravision : 30,
    	languages   : prv.util.langs([1, 2, 4, 5, 9]),
    	move        : 6,
    	raceName    : "Halfling",
    	stats       : [-1, 0, 0, 1, 0, 0, 0],
    	savesBonus  : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
    },
    
    "Human": {
    	abilities   : [0, 0, 0, 0, 0, 0, 0, 0],
    	infravision : 0,
    	languages   : prv.util.langs([]),
    	move        : 12,
    	raceName    : "Human",
    	stats       : [0, 0, 0, 0, 0, 0, 0],
    	savesBonus  : ""
    }
};

