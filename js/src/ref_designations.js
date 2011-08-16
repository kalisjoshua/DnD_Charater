//// ref_designation.js

Reference.designation = {
	"Acrobat": {
	    dual: false,
	    HDT: 6,
	    prefs: [3,4,0,1,5,2,6],
	    saves: Reference.saves.Thief,
	    thaco: Reference.thaco.Theif,
	    title: "Acrobat"
	},

	"Archer": {
	    dual: false,
	    HDT: 8,
	    prefs: [3,0,4,2,1,5,6],
	    saves: Reference.saves.Cleric,
	    thaco: Reference.thaco.Cleric,
	    title: "Archer"
	},

	"Assassin": {
	    dual: false,
	    HDT: 6,
	    prefs: [5,3,1,4,0,2,6],
	    saves: Reference.saves.Thief,
	    thaco: Reference.thaco.Thief,
	    title: "Assassin"
	},

	"Barbarian": {
	    dual: false,
	    HDT: 12,
	    prefs: [0,4,3,5,1,6,2],
	    saves: Reference.saves.Fighter,
	    thaco: Reference.thaco.Fighter,
	    title: "Barbarian"
	},

	"Bard": {
	    dual: false,
	    HDT: 12,
	    prefs: [5,0,1,4,3,6,2],
	    saves: Reference.saves.Fighter,
	    spells: [],
	    thaco: Reference.thaco.Fighter,
	    title: "Bard"
	},

	"Cavalier": {
	    dual: false,
	    HDT: 10,
	    prefs: [0,3,4,1,5,6,2],
	    saves: Reference.saves.Fighter,
	    thaco: Reference.thaco.Fighter,
	    title: "Cavalier"
	},

	"Cleric": {
	    dual: true,
	    HDT: 8,
	    prefs: [2,4,0,3,1,5,6],
	    saves: Reference.saves.Cleric,
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
	    thaco: Reference.thaco.Cleric,
	    title: "Cleric"
	},

	"Druid": {
	    dual: true,
	    HDT: 8,
	    prefs: [2,5,3,4,1,0,6],
	    saves: Reference.saves.Cleric,
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
	    thaco: Reference.thaco.Cleric,
	    title: "Druid"
	},

	"Fighter": {
	    dual: true,
	    HDT: 10,
	    prefs: [0,4,3,5,6,1,2],
	    saves: Reference.saves.Fighter,
	    thaco: Reference.thaco.Fighter,
	    title: "Fighter"
	},

	"Illusionist": {
	    dual: true,
	    HDT: 4,
	    prefs: [1,3,6,5,4,2,0],
	    saves: Reference.saves.Mage,
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
	    thaco: Reference.thaco.Mage,
	    title: "Illusionist"
	},

	"Mage": {
	    dual: true,
	    HDT: 4,
	    prefs: [1,3,5,2,4,6,0],
	    saves: Reference.saves.Mage,
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
	    thaco: Reference.thaco.Mage,
	    title: "Mage"
	},

	"Monk": {
	    dual: false,
	    HDT: 4,
	    prefs: [3,4,2,1,0,5,6],
	    saves: Reference.saves.Thief,
	    thaco: Reference.thaco.Cleric,
	    title: "Monk"
	},

	"Paladin": {
	    dual: false,
	    HDT: 10,
	    prefs: [0,4,3,5,1,6,2],
	    saves: Reference.saves.Fighter,
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
	    thaco: Reference.thaco.Fighter,
	    title: "Paladin"
	},

	"Ranger": {
	    dual: false,
	    HDT: 10,
	    prefs: [0,4,3,2,5,6,1],
	    saves: Reference.saves.Fighter,
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
	    thaco: Reference.thaco.Fighter,
	    title: "Ranger"
	},

	"Thief": {
	    dual: true,
	    HDT: 6,
	    prefs: [3,1,5,4,0,2,6],
	    saves: Reference.saves.Thief,
	    thaco: Reference.thaco.Thief,
	    title: "Thief"
	}
};

