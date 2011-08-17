module("ref_designation.js");

test("Reference.Designation", function () {
    ok(Reference.Designations, "Reference.Designations defined");

    test_obj = [
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

    while (test_obj.length) {
        ok(Reference.Designations[test_obj[0]], "Reference.Designations[" + test_obj[0] + "]");
        ok(Reference.Designations[test_obj[0]].dual !== undefined, test_obj[0] + ".dual is defined");
        ok(Reference.Designations[test_obj[0]].HDT !== undefined, test_obj[0] + ".HDT exists");
        ok(Reference.Designations[test_obj[0]].prefs.length === 7, test_obj[0] + ".prefs has 7 elements");
        ok(Reference.Designations[test_obj[0]].saves !== undefined, test_obj[0] + ".saves exists");
        ok(Reference.Designations[test_obj[0]].thaco !== undefined, test_obj[0] + ".thaco exists");
        ok(Reference.Designations[test_obj[0]].title === test_obj[0], test_obj[0] + ".title matches Designation string");
        test_obj.shift();
    }

    test_obj = [
        "Bard",
        "Cleric",
        "Druid",
        "Illusionist",
        "Mage",
        "Paladin",
        "Ranger"
    ];

    while (test_obj.length) {
        ok(Reference.Designations[test_obj[0]].spells.length, test_obj[0] + ".spells has length");
        test_obj.shift();
    }
});