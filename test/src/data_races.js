module("races.js");

(function () {
    var actual,
        temp;

    actual = [
        "Dwarf",
        "Elf",
        "Gnome",
        "Goblin",
        "Half-Elf",
        "Half-Orc",
        "Halfling",
        "Human"
    ];

    for (temp in actual) {
        (function (actual, temp) {
            test("Races object initializations | " + actual[temp], function () {
                ok(Races[temp], "Races[" + actual[temp] + "] exists");
                ok(Races[temp].infravision >= 0, actual[temp] + ".infravision is >= 0");
                ok(Races[temp].languages.length > 0, actual[temp] + ".languages.length > 0");
                ok(Races[temp].move % 2 === 0, actual[temp] + ".move is even");
                ok(Races[temp].title  === actual[temp], ".title === " + actual[temp]);
                ok(Races[temp].modifiers.stats.length === 7, actual[temp] + ".statModifiers.length is 7");
                ok(Races[temp].modifiers.saves !== undefined, actual[temp] + ".savesBonus is a string");
                ok(Races[temp].modifiers.thieving.length === 8, actual[temp] + ".thiefSkills.length is 8");
            });
        }(actual, temp));
    }
}());