module("classes.js");

(function () {
    var actual,
        temp;

    test("list checks", function () {
        deepEqual([
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
        ], allClasses, "Classes.listAll is correct");

        deepEqual([
            "Cleric",
            "Druid",
            "Fighter",
            "Illusionist",
            "Mage",
            "Thief"
        ], dualClasses, "Classes.listDual is correct");
    });
    
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
        (function (actual, temp) {
            test("Classes object initializations | " + actual[temp], function () {
                ok(Classes[actual[temp]], "Classes." + actual[temp] + " exists");
                deepEqual(Classes[actual[temp]].private(), Designations[temp], actual[temp] + " object");
            });
        }(actual, temp));
    }
    
    actual = [
        "Cleric",
        "Druid",
        "Fighter",
        "Illusionist",
        "Mage",
        "Thief"
    ];

    for (temp in actual) {
        (function (actual, temp) {
            test("Bases object initializations | " + actual[temp], function () {
                ok(Bases[actual[temp]], "Bases." + actual[temp] + " exists");
            });
        }(actual, temp));
    }
}());

test("self-dual-class detection", function () {
    raises(function () {
        Classes.Cleric.dual(Classes.Cleric);
    }, "attemptng self-dual-class should throw an error to help with debugging");
});

(function () {
    var a,
        b,
        x,
        y;

    test("dual-class objects | Cleric, Fighter", function () {
        a = Classes.Cleric.clone();
        b = Classes.Fighter.clone();
        x = a.dual(b);
        y = b.dual(a);

        deepEqual([16, 17, 18, 19, 19], x.get("saves")[0], "Saves for 0th level");
        notDeepEqual(x.get("saves"), a.get("saves"), "dual class saves are different than primary class saves");
        notDeepEqual(x.get("saves"), b.get("saves"), "dual class saves are different than secondary class saves");

        deepEqual([6, 9, 10, 9, 11], x.get("saves")[10], "Saves for 10th level");

        deepEqual([2, 0, 4, 3, 5, 1, 6], x.get("prefs"), "prefs for " + x.get("title"));
        deepEqual([0, 2, 4, 3, 5, 6, 1], y.get("prefs"), "prefs for " + y.get("title"));
        notDeepEqual(x.get("prefs"), y.get("prefs"), "prefs for " + x.get("title") + " differs from " + y.get("title"))
    });

    test("dual-class objects | Mage, Thief", function () {
        a = Classes.Mage.clone();
        b = Classes.Thief.clone();
        x = a.dual(b);
        y = b.dual(a);

        deepEqual([13, 12, 11, 15, 12], x.get("saves")[1], "Saves for 1th level");
        notDeepEqual(x.get("saves"), a.get("saves"), "dual class saves are different than primary class saves");
        notDeepEqual(x.get("saves"), b.get("saves"), "dual class saves are different than secondary class saves");

        deepEqual([11, 10, 9, 13, 10], x.get("saves")[10], "Saves for 10th level");

        deepEqual([1, 3, 5, 2, 4, 0, 6], x.get("prefs"), "prefs for " + x.get("title"));
        deepEqual([3, 1, 5, 4, 2, 0, 6], y.get("prefs"), "prefs for " + y.get("title"));
        notDeepEqual(x.get("prefs"), y.get("prefs"), "prefs for " + x.get("title") + " differs from " + y.get("title"))
    });
}());