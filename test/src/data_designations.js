module("designations.js");

(function () {
    var actual,
        temp;

    test("all", function () {
        ok(Designations, "Designations defined");

        actual = [
            "Acrobat",
            "Archer",
            "Assassin",
            "Barbarian",
            "Bard",
            "Cavalier",
            "Cleric",
            "Druid",
            "Fighter",
            "Illusionist",
            "Mage",
            "Monk",
            "Paladin",
            "Ranger",
            "Thief"
        ];

        for (temp in actual) {
            ok(Util.isArray(Designations[temp].prefs) && 
                Designations[temp].prefs.length === 7,    actual[temp] + ".prefs is an array and has 7 elements");
            ok(Util.isArray(Designations[temp].dual),     actual[temp] + ".dual is an array");
            ok(Util.isNumeric(Designations[temp].HDT),    actual[temp] + ".HDT exists and is a number");
            ok(Util.isArray(Designations[temp].saves),    actual[temp] + ".saves is an array");
            ok(Util.isArray(Designations[temp].thaco),    actual[temp] + ".thaco is an array");
            ok(Designations[temp].title === actual[temp], actual[temp] + ".title matches string");
        }
    });

    test("spellcasters", function () {
        actual = [
            "",
            "",
            "",
            "",
            "Bard",
            "",
            "Cleric",
            "Druid",
            "",
            "Illusionist",
            "Mage",
            "",
            "Paladin",
            "Ranger",
            ""
        ];

        for (temp in actual) {
            actual[temp] && ok(Util.isArray(Designations[temp].spells) &&
                Designations[temp].spells.length === 30, actual[temp] + ".spells is an array");
        }
    });
}());