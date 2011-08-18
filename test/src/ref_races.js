module("ref_races.js");

test("ref_races.js", function () {
    ok(Reference.Races, "Reference.Races defined");

    test_obj = [
        "Dwarf",
        "Elf",
        "Gnome",
        "Goblin",
        "Half-Elf",
        "Half-Orc",
        "Halfling",
        "Human"
    ];

    while (test_obj.length) {
        ok(Reference.Races[test_obj[0]], "Reference.Races[" + test_obj[0] + "] exists");
        ok(Reference.Races[test_obj[0]].infravision >= 0, test_obj[0] + ".infravision is >= 0");
        ok(Reference.Races[test_obj[0]].languages.length > 0, test_obj[0] + ".languages.length > 0");
        ok(Reference.Races[test_obj[0]].move % 2 === 0, test_obj[0] + ".move is even");
        ok(Reference.Races[test_obj[0]].raceName  === test_obj[0], ".raceName === " + test_obj[0]);
        ok(Reference.Races[test_obj[0]].statModifiers.length === 7, test_obj[0] + ".statModifiers.length is 7");
        ok(Reference.Races[test_obj[0]].savesBonus !== undefined, test_obj[0] + ".savesBonus is a string");
        ok(Reference.Races[test_obj[0]].thiefSkills.length === 8, test_obj[0] + ".thiefSkills.length is 8");
        test_obj.shift();
    }
});