//// ref.js

var Reference = {
    languages: [
        "burrowing mammal",
        "dwarven",
        "elvish",
        "gnoll",
        "gnome",
        "goblin",
        "halfling",
        "hobgoblin",
        "kobold",
        "orcish"
    ],
    
    saves: {
        Cleric: [
        // ppd, pp, rsw, bw, sp
            [19,19,19,19,19], //  0th level charcter
            [10,13,14,16,15], //  1
            [10,13,14,16,15], //  2
            [10,13,14,16,15], //  3
            [09,12,13,15,14], //  4
            [09,12,13,15,14], //  5
            [09,12,13,15,14], //  6
            [07,10,11,13,12], //  7
            [07,10,11,13,12], //  8
            [07,10,11,13,12], //  9
            [06,09,10,12,11], // 10
            [06,09,10,12,11], // 11
            [06,09,10,12,11], // 12
            [05,08,09,11,10], // 13
            [05,08,09,11,10], // 14
            [05,08,09,11,10], // 15
            [04,07,08,10,09], // 16
            [04,07,08,10,09], // 17
            [04,07,08,10,09], // 18
            [02,05,06,08,07], // 19
            [02,05,06,08,07], // 20
            [02,05,06,08,07], // 21
            [01,03,04,06,05]  // 22
        ],
        
        Fighter: [
        // ppd, pp, rsw, bw, sp
            [16,17,18,20,19], //  0th level charcter
            [14,15,16,17,17], //  1
            [14,15,16,17,17], //  2
            [13,14,15,16,16], //  3
            [13,14,15,16,16], //  4
            [11,12,13,13,14], //  5
            [11,12,13,13,14], //  6
            [10,11,12,12,13], //  7
            [10,11,12,12,13], //  8
            [08,09,10,09,11], //  9
            [08,09,10,09,11], // 10
            [07,08,09,08,10], // 11
            [07,08,09,08,10], // 12
            [05,06,07,05,08], // 13
            [05,06,07,05,08], // 14
            [04,05,06,04,07], // 15
            [04,05,06,04,07], // 16
            [03,04,05,04,06], // 17
            [03,04,05,04,06], // 18
            [02,03,04,03,05], // 19
            [02,03,04,03,05], // 20
            [01,02,03,03,04], // 21
            [01,02,03,03,04]  // 22
        ],
        
        Mage: [
        // ppd, pp, rsw, bw, sp
            [19,19,19,19,19], //  0th level charcter
            [14,13,11,15,12], //  1
            [14,13,11,15,12], //  2
            [14,13,11,15,12], //  3
            [14,13,11,15,12], //  4
            [14,13,11,15,12], //  5
            [13,11,09,13,10], //  6
            [13,11,09,13,10], //  7
            [13,11,09,13,10], //  8
            [13,11,09,13,10], //  9
            [13,11,09,13,10], // 10
            [11,09,07,11,08], // 11
            [11,09,07,11,08], // 12
            [11,09,07,11,08], // 13
            [11,09,07,11,08], // 14
            [11,09,07,11,08], // 15
            [10,07,05,09,06], // 16
            [10,07,05,09,06], // 17
            [10,07,05,09,06], // 18
            [10,07,05,09,06], // 19
            [10,07,05,09,06], // 20
            [08,05,03,07,04], // 21
            [08,05,03,07,04]  // 22
        ],
        
        Theif: [
        // ppd, pp, rsw, bw, sp
            [19,19,19,19,19], //  0th level charcter
            [13,12,14,16,15], //  1
            [13,12,14,16,15], //  2
            [13,12,14,16,15], //  3
            [13,12,14,16,15], //  4
            [12,11,12,15,13], //  5
            [12,11,12,15,13], //  6
            [12,11,12,15,13], //  7
            [12,11,12,15,13], //  8
            [11,10,10,14,11], //  9
            [11,10,10,14,11], // 10
            [11,10,10,14,11], // 11
            [11,10,10,14,11], // 12
            [10,09,08,13,09], // 13
            [10,09,08,13,09], // 14
            [10,09,08,13,09], // 15
            [10,09,08,13,09], // 16
            [09,08,06,12,07], // 17
            [09,08,06,12,07], // 18
            [09,08,06,12,07], // 19
            [09,08,06,12,07], // 20
            [08,07,04,11,05], // 21
            [08,07,04,11,05]  // 22
        ]
    },
    
    thaco: {
        // level    0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22th level character
        Fighter : [20,20,18,18,16,16,14,14,12,12,10,10,08,08,06,06,04,04,04,02,02,00,00],
        Cleric  : [20,20,20,18,18,18,16,16,16,14,14,14,12,12,12,10,10,10,09,09,08,08,07],
        Mage    : [20,20,20,20,20,19,19,19,19,19,16,16,16,16,16,13,13,13,13,13,11,11,09],
        Thief   : [20,20,20,20,19,19,19,19,16,16,16,16,14,14,14,14,12,12,12,12,10,10,08]
    }
};

