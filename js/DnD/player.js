//// player.js

var Player = function (config) {
    return {
        "designation": (function (alpha, beta) {
            if (!beta) {
                return designation[alpha];
            }
            // dual class designation algorythm
            
        }(config.classPrimary || "", config.classSecondary || "")),
        
        "name": config.name || "Name, None",
        
        "race": Race[config.race]
    };
};

dnd.Player = function (config) {
    return Player(config);
};


// prv.dualClass = function (primary, secondary) {
//     var result = {
//             className: primary.className + " / " + secondary.className,
//             HDT: parseInt((primary.HDT + secondary.HDT) / 2, 10),
//             prefs: [],
//             saves: [],
//             spells: {},
//             thaco: []
//         },
//         
//         temp = [primary.prefs, secondary.prefs],
//         
//         // used is for removing duplicates in the dual-class prefs array
//         used = [0, 0, 0, 0, 0, 0, 0]; // 0 === false
//     
//     result.spells[primary.className] = primary.spells;
//     result.spells[secondary.className] = secondary.spells;
//     
//     // **** Stats preferences **** //
//     // weave the 2 prefs-lists together, ignoring the chances of duplicates
//     while (!!temp[0].length) {
//         result.prefs.push(temp[0].shift(), temp[1].shift());
//     }
//     
//     // reuse the temp variable as an indexer for removing duplicates in the final array
//     temp = 0;
//     
//     // remove the duplicates 
//     while (result.prefs.length > 7) {
//         if (!used[result.prefs[temp]]) {
//             used[result.prefs[temp]] = 1; // 1 === true
//         }
//         else {
//             result.prefs = result.prefs.slice(0, temp).concat(result.prefs.slice(temp + 1));
//             temp--;
//         }
//         
//         temp++;
//     }
//     
//     // **** THAC0 matrix **** //
//     while (result.thaco.length < primary.thaco.length) {
//         temp = result.thaco.length;
//         result.thaco.push((primary.thaco[temp] < secondary.thaco[temp]) ? primary.thaco[temp] : secondary.thaco[temp]);
//     }
//     
//     // **** Saves martix **** //
//     while (result.saves.length < primary.saves.length) {
//         temp = result.saves.length;
//         result.saves[temp] = [];
//         for (var i = 0; i < primary.saves[0].length; i++) {
//             result.saves[temp].push((primary.saves[temp][i] < secondary.saves[temp][i]) ? primary.saves[temp][i] : secondary.saves[temp][i]);
//         }
//     }
//     
//     return result;
// };

// Languages
// function (ar) {
//     var result = [];
//     do {
//         result.push(Reference.languages[ar.shift()]);
//     } while (ar.length);
// };