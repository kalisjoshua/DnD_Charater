//// classes.js

prv.classes = {
	"Acrobat": {
	    className: "Acrobat",
	    dual: false,
	    HDT: 6,
	    prefs: [3,4,0,1,5,2,6],
	    saves: prv.tables.saves.Thief,
	    thaco: prv.tables.thaco.Theif
	},
	
	"Archer": {
	    className: "Archer",
	    dual: false,
	    HDT: 8,
	    prefs: [3,0,4,2,1,5,6],
	    saves: prv.tables.saves.Cleric,
	    thaco: prv.tables.thaco.Cleric
	},
	
	"Assassin": {
	    className: "Assassin",
	    dual: false,
	    HDT: 6,
	    prefs: [5,3,1,4,0,2,6],
	    saves: prv.tables.saves.Thief,
	    thaco: prv.tables.thaco.Thief
	},
	
	"Barbarian": {
	    className: "Barbarian",
	    dual: false,
	    HDT: 12,
	    prefs: [0,4,3,5,1,6,2],
	    saves: prv.tables.saves.Fighter,
	    thaco: prv.tables.thaco.Fighter
	},
	
	"Bard": {
	    className: "Bard",
	    dual: false,
	    HDT: 12,
	    prefs: [5,0,1,4,3,6,2],
	    saves: prv.tables.saves.Fighter,
	    spells: [],
	    thaco: prv.tables.thaco.Fighter
	},
	
	"Cavalier": {
	    className: "Cavalier",
	    dual: false,
	    HDT: 10,
	    prefs: [0,3,4,1,5,6,2],
	    saves: prv.tables.saves.Fighter,
	    thaco: prv.tables.thaco.Fighter
	},
	
	"Cleric": {
	    className: "Cleric",
	    dual: true,
	    HDT: 8,
	    prefs: [2,4,0,3,1,5,6],
	    saves: prv.tables.saves.Cleric,
        spells: [
        //   1 2 3 4 5 6 7  Spell level
        	[0,0,0,0,0,0,0], //  0th level character
        	[1,0,0,0,0,0,0], //  1
        	[2,0,0,0,0,0,0], //  2
        	[2,1,0,0,0,0,0], //  3
        	[3,2,0,0,0,0,0], //  4
        	[3,3,1,0,0,0,0], //  5
        	[1,3,2,0,0,0,0], //  6
        	[1,3,2,1,0,0,0], //  7
        	[3,3,3,2,0,0,0], //  8
        	[4,4,3,2,1,0,0], //  9
        	[4,4,3,3,2,0,0], // 10
        	[5,4,4,3,2,1,0], // 11
        	[6,5,5,3,2,2,0], // 12
        	[6,6,6,4,2,2,0], // 13
        	[6,6,6,5,3,2,0], // 14
        	[7,7,7,5,4,2,0], // 15
        	[7,7,7,6,5,3,1], // 16
        	[8,8,8,6,5,3,1], // 17
        	[8,8,8,7,6,4,1], // 18
        	[9,9,9,7,6,4,2], // 19
        	[9,9,9,8,7,5,2], // 20
        	[9,9,9,9,8,6,2], // 21
        	[9,9,9,9,9,6,3], // 22
        	[9,9,9,9,9,7,3], // 23
        	[9,9,9,9,9,8,3], // 24
        	[9,9,9,9,9,8,4], // 25
        	[9,9,9,9,9,9,4], // 26
        	[9,9,9,9,9,9,5], // 27
        	[9,9,9,9,9,9,6], // 28
        	[9,9,9,9,9,9,7]  // 29
        ],
	    thaco: prv.tables.thaco.Cleric
	},
	
	"Druid": {
	    className: "Druid",
	    dual: true,
	    HDT: 8,
	    prefs: [2,5,3,4,1,0,6],
	    saves: prv.tables.saves.Cleric,
	    spells: [
        //   1 2 3 4 5 6 7  Spell level
        	[0,0,0,0,0,0,0], //  0th level character
        	[2,0,0,0,0,0,0], //  1
        	[2,1,0,0,0,0,0], //  2
        	[3,2,1,0,0,0,0], //  3
        	[4,2,2,0,0,0,0], //  4
        	[4,3,2,0,0,0,0], //  5
        	[4,3,2,1,0,0,0], //  6
        	[4,4,3,1,0,0,0], //  7
        	[4,4,3,2,0,0,0], //  8
        	[5,4,3,2,1,0,0], //  9
        	[5,4,3,3,2,0,0], // 10
        	[5,5,3,3,2,1,0], // 11
        	[5,5,4,4,3,2,1], // 12
        	[6,5,5,5,4,3,2], // 13
        	[6,6,6,6,5,4,3]  // 14
	    ],
	    thaco: prv.tables.thaco.Cleric
	},
	
	"Fighter": {
	    className: "Fighter",
	    dual: true,
	    HDT: 10,
	    prefs: [0,4,3,5,6,1,2],
	    saves: prv.tables.saves.Fighter,
	    thaco: prv.tables.thaco.Fighter
	},
	
	"Illusionist": {
	    className: "Illusionist",
	    dual: true,
	    HDT: 4,
	    prefs: [1,3,6,5,4,2,0],
	    saves: prv.tables.saves.Mage,
	    spells: [
        //   1 2 3 4 5 6 7  Spell level
        	[0,0,0,0,0,0,0], //  0th level character
        	[1,0,0,0,0,0,0], //  1
        	[2,0,0,0,0,0,0], //  2
        	[2,1,0,0,0,0,0], //  3
        	[3,2,0,0,0,0,0], //  4
        	[4,2,1,0,0,0,0], //  5
        	[4,3,1,0,0,0,0], //  6
        	[4,3,2,0,0,0,0], //  7
        	[4,3,2,1,0,0,0], //  8
        	[4,3,3,2,0,0,0], //  9
        	[5,4,3,2,1,0,0], // 10
        	[5,4,4,3,2,0,0], // 11
        	[5,5,4,3,2,1,0], // 12
        	[5,5,4,3,2,2,0], // 13
        	[5,5,4,3,2,2,1], // 14
        	[5,5,5,4,2,2,2], // 15
        	[5,5,5,4,3,2,2], // 16
        	[5,5,5,5,3,2,2], // 17
        	[5,5,5,5,3,3,2], // 18
        	[5,5,5,5,4,3,2], // 19
        	[5,5,5,5,4,3,3], // 20
        	[5,5,5,5,5,4,3], // 21
        	[5,5,5,5,5,5,4], // 22
        	[5,5,5,5,5,5,5], // 23
        	[6,6,6,6,5,5,5], // 24
        	[6,6,6,6,6,6,6], // 25
        	[7,7,7,7,6,6,6]  // 26
	    ],
	    thaco: prv.tables.thaco.Mage
	},
	
	"Mage": {
	    className: "Mage",
	    dual: true,
	    HDT: 4,
	    prefs: [1,3,5,2,4,6,0],
	    saves: prv.tables.saves.Mage,
	    spells: [
        //   1 2 3 4 5 6 7 8 9  Spell level
        	[0,0,0,0,0,0,0,0,0], //  0th level character
        	[1,0,0,0,0,0,0,0,0], //  1
        	[2,0,0,0,0,0,0,0,0], //  2
        	[2,1,0,0,0,0,0,0,0], //  3
        	[3,2,0,0,0,0,0,0,0], //  4
        	[4,2,1,0,0,0,0,0,0], //  5
        	[4,2,2,0,0,0,0,0,0], //  6
        	[4,3,2,1,0,0,0,0,0], //  7
        	[4,3,3,2,0,0,0,0,0], //  8
        	[4,3,3,2,1,0,0,0,0], //  9
        	[4,4,3,2,2,0,0,0,0], // 10
        	[4,4,4,3,3,0,0,0,0], // 11
        	[4,4,4,4,4,1,0,0,0], // 12
        	[5,5,5,4,4,2,0,0,0], // 13
        	[5,5,5,4,4,2,1,0,0], // 14
        	[5,5,5,5,5,2,1,0,0], // 15
        	[5,5,5,5,5,3,2,1,0], // 16
        	[5,5,5,5,5,3,3,2,0], // 17
        	[5,5,5,5,5,3,3,2,1], // 18
        	[5,5,5,5,5,3,3,3,1], // 19
        	[5,5,5,5,5,4,3,3,2], // 20
        	[5,5,5,5,5,4,4,4,2], // 21
        	[5,5,5,5,5,5,4,4,3], // 22
        	[5,5,5,5,5,5,5,5,3], // 23
        	[5,5,5,5,5,5,5,5,4], // 24
        	[5,5,5,5,5,5,5,5,5], // 25
        	[6,6,6,6,5,5,5,5,5], // 26
        	[6,6,6,6,6,6,6,5,5], // 27
        	[6,6,6,6,6,6,6,6,6], // 28
        	[7,7,7,7,6,6,6,6,6]  // 29
	    ],
	    thaco: prv.tables.thaco.Mage
	},
	
	"Monk": {
	    className: "Monk",
	    dual: false,
	    HDT: 4,
	    prefs: [3,4,2,1,0,5,6],
	    saves: prv.tables.saves.Thief,
	    thaco: prv.tables.thaco.Cleric
	},
	
	"Paladin": {
	    className: "Paladin",
	    dual: false,
	    HDT: 10,
	    prefs: [0,4,3,5,1,6,2],
	    saves: prv.tables.saves.Fighter,
	    spells: [
        //   1 2 3 4  Spell level
        	[0,0,0,0], //  0th level character
        	[0,0,0,0], //  1
        	[0,0,0,0], //  2
        	[0,0,0,0], //  3
        	[0,0,0,0], //  4
        	[0,0,0,0], //  5
        	[0,0,0,0], //  6
        	[0,0,0,0], //  7
        	[0,0,0,0], //  8
        	[1,0,0,0], //  9
        	[2,0,0,0], // 10
        	[2,1,0,0], // 11
        	[2,2,0,0], // 12
        	[2,2,1,0], // 13
        	[3,2,1,0], // 14
        	[3,2,1,1], // 15
        	[3,3,1,1], // 16
        	[3,3,2,1], // 17
        	[3,3,3,1], // 18
        	[3,3,3,2], // 19
        	[3,3,3,3]  // 20
	    ],
	    thaco: prv.tables.thaco.Fighter
	},
	
	"Ranger": {
	    className: "Ranger",
	    dual: false,
	    HDT: 10,
	    prefs: [0,4,3,2,5,6,1],
	    saves: prv.tables.saves.Fighter,
	    spells: [
        //   1 2 3 4 5  Spell level
        	[0,0,0,0,0], //  0th level character
        	[0,0,0,0,0], //  1
        	[0,0,0,0,0], //  2
        	[0,0,0,0,0], //  3
        	[0,0,0,0,0], //  4
        	[0,0,0,0,0], //  5
        	[0,0,0,0,0], //  6
        	[0,0,0,0,0], //  7
        	[1,0,0,0,0], //  8
        	[1,0,0,1,0], //  9
        	[2,0,0,1,0], // 10
        	[2,0,0,2,0], // 11
        	[2,1,0,2,0], // 12
        	[2,1,0,2,1], // 13
        	[2,2,0,2,1], // 14
        	[2,2,0,2,2], // 15
        	[2,2,1,2,2], // 16
        	[2,2,2,2,2]  // 17
	    ],
	    thaco: prv.tables.thaco.Fighter
	},
	
	"Thief": {
	    className: "Thief",
	    dual: true,
	    HDT: 6,
	    prefs: [3,1,5,4,0,2,6],
	    saves: prv.tables.saves.Thief,
	    thaco: prv.tables.thaco.Thief
	}
};

prv.dualClass = function (primary, secondary) {
    var result = {
            className: primary.className + " / " + secondary.className,
            HDT: parseInt((primary.HDT + secondary.HDT) / 2, 10),
            prefs: [],
            saves: [],
            spells: {},
            thaco: []
        },
        
        temp = [primary.prefs, secondary.prefs],
        
        // used is for removing duplicates in the dual-class prefs array
        used = [0, 0, 0, 0, 0, 0, 0]; // 0 === false
    
    result.spells[primary.className] = primary.spells;
    result.spells[secondary.className] = secondary.spells;
    
    // **** Stats preferences **** //
    // weave the 2 prefs-lists together, ignoring the chances of duplicates
    while (!!temp[0].length) {
        result.prefs.push(temp[0].shift(), temp[1].shift());
    }
    
    // reuse the temp variable as an indexer for removing duplicates in the final array
    temp = 0;
    
    // remove the duplicates 
    while (result.prefs.length > 7) {
        if (!used[result.prefs[temp]]) {
            used[result.prefs[temp]] = 1; // 1 === true
        }
        else {
            result.prefs = result.prefs.slice(0, temp).concat(result.prefs.slice(temp + 1));
            temp--;
        }
        
        temp++;
    }
    
    // **** THAC0 matrix **** //
    while (result.thaco.length < primary.thaco.length) {
        temp = result.thaco.length;
        result.thaco.push((primary.thaco[temp] < secondary.thaco[temp]) ? primary.thaco[temp] : secondary.thaco[temp]);
    }
    
    // **** Saves martix **** //
    while (result.saves.length < primary.saves.length) {
        temp = result.saves.length;
        result.saves[temp] = [];
        for (var i = 0; i < primary.saves[0].length; i++) {
            result.saves[temp].push((primary.saves[temp][i] < secondary.saves[temp][i]) ? primary.saves[temp][i] : secondary.saves[temp][i]);
        }
    }
    
    return result;
};

