//// races.js


var langs = function (ar) {
        var result = [];
    
        do {
            result.push(pub.languages[ar[0]]);
        } while (ar.shift());
    
        return result;
    };
    
prv.races = {
    "Dwarf": {
    	Abilities   : [0, 10, 15, 0, 0, 0, -10, -5],
    	Infravision : 60,
    	Languages   : langs([4, 5, 8, 9]),
    	Move        : 6,
    	Stats       : [0, 0, 0, 0, 1, -1, 0],
    	SavesBonus  : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
    },
    
    "Elf": {
    	Abilities   : [5, -5, 0, 5, 10, 5, 0, 0],
    	Infravision : 60,
    	Languages   : langs([3, 4, 5, 6, 7, 9]),
    	Move        : 12,
    	Stats       : [0, 0, 0, 1, -1, 0, 0],
    	SavesBonus  : ""
    },
    
    "Gnome": {
    	Abilities   : [0, 5, 10, 5, 5, 10, 15, 0],
    	Infravision : 60,
    	Languages   : langs([0, 1, 6, 5, 8]),
    	Move        : 6,
    	Stats       : [-1, 0, 0, 1, 0, 0, 0],
    	SavesBonus  : "+1 on saves(rsw, sp) for each 3 1/2 of con"
    },
    
    "Goblin": {
    	Abilities   : [ 0, 15, 10, 0, 0, 15, 0, 15],
    	Infravision : 30,
    	Languages   : langs([1, 3, 7, 8]),
    	Move        : 8,
    	Stats       : [-1, 1, 0, 1, 0, -1, 0],
    	SavesBonus  : ""
    },
    
    "Half-Elf": {
    	Abilities   : [10, 0, 0, 5, 0, 0, 0, 0],
    	Infravision : 60,
    	Languages   : langs([3, 4, 5, 6, 7, 9]),
    	Move        : 12,
    	Stats       : [0, 0, 0, 0, 0, 0, 0],
    	SavesBonus  : ""
    },
    
    "Half-Orc": {
    	Abilities   : [ -5, 5, 5, 0, 0, 5, 5, -10],
    	Infravision : 60,
    	Languages   : langs([9]),
    	Move        : 12,
    	Stats       : [1, 0, 0, 0, 1, -1, 0],
    	SavesBonus  : ""
    },
    
    "Halfling": {
    	Abilities   : [ 5, 5, 5, 10, 15, 5, -15, -5],
    	Infravision : 30,
    	Languages   : langs([1, 2, 4, 5, 9]),
    	Move        : 6,
    	Stats       : [-1, 0, 0, 1, 0, 0, 0],
    	SavesBonus  : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
    },
    
    "Human": {
    	Abilities   : [0, 0, 0, 0, 0, 0, 0, 0],
    	Infravision : 0,
    	Languages   : langs([]),
    	Move        : 12,
    	Stats       : [0, 0, 0, 0, 0, 0, 0],
    	SavesBonus  : ""
    }
};

pub.races = [];

for (var i in prv.races) {
    if (prv.races.hasOwnProperty(i)) {
        pub.races.push(i);
        pub.races[i] = i;
    }
}

