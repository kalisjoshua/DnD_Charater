module("classes.js");

test("list checks", function () {
    equal(15, Classes.length, "correct number of classes");

    equal(6, Classes.dual().length, "correct number of dual classes");
});

test("dual-classes", function () {
    raises(function () {
        Classes.merge();
    }, "no arguments passed into merge");
    
    raises(function () {
        Classes.merge("Captain", "Awesome");
    }, "invalid arguments passed into merge");
    
    raises(function () {
        Classes.merge("Cleric", "Awesome");
    }, "invalid arguments passed into merge");
    
    raises(function () {
        Classes.merge("Captain", "Fighter");
    }, "invalid arguments passed into merge");
    
    raises(function () {
        Classes.merge(Classes.is("Cleric"), Classes.is("Fighter"));
    }, "objects passed into merge, seem like it should work but shouldn't");

    raises(function () {
        Classes.merge("Cleric", "Cleric");
    }, "attemptng self-dual-class");
});

test("dual-class objects | Cleric, Fighter", function () {
    var  a = Classes.is("Cleric")
        ,b = Classes.is("Fighter")
        ,x = Classes.merge("Cleric", "Fighter")
        ,y = Classes.merge("Fighter", "Cleric");

    deepEqual(x.saves, y.saves, "saves are the same regaurdless of primary and secondary classes");
    notDeepEqual(x.saves, a.saves, "saves are not the same as base classes");
    notDeepEqual(x.saves, b.saves, "saves are not the same as base classes");
    notDeepEqual(y.saves, a.saves, "saves are not the same as base classes");
    notDeepEqual(y.saves, b.saves, "saves are not the same as base classes");

    equal((a.HDT + b.HDT) / 2, x.HDT, "merged HDT should be correct");
    equal((a.HDT + b.HDT) / 2, y.HDT, "merged HDT should be correct");

    notDeepEqual(x.prefs, a.prefs, "prefs are not the same as base classes");
    notDeepEqual(x.prefs, b.prefs, "prefs are not the same as base classes");
    notDeepEqual(y.prefs, a.prefs, "prefs are not the same as base classes");
    notDeepEqual(y.prefs, b.prefs, "prefs are not the same as base classes");

    equal(undefined, x.spells[1], "classes without spells should not have any spells");
    equal(undefined, y.spells[0], "classes without spells should not have any spells");
});

test("dual-class objects | Fighter, Thief", function () {
    var  a = Classes.is("Fighter")
        ,b = Classes.is("Thief")
        ,x = Classes.merge("Fighter", "Thief")
        ,y = Classes.merge("Thief", "Fighter");

    deepEqual(x.saves, y.saves, "saves are the same regaurdless of primary and secondary classes");
    notDeepEqual(x.saves, a.saves, "saves are not the same as base classes");
    notDeepEqual(x.saves, b.saves, "saves are not the same as base classes");
    notDeepEqual(y.saves, a.saves, "saves are not the same as base classes");
    notDeepEqual(y.saves, b.saves, "saves are not the same as base classes");

    equal((a.HDT + b.HDT) / 2, x.HDT, "merged HDT should be correct");
    equal((a.HDT + b.HDT) / 2, y.HDT, "merged HDT should be correct");

    notDeepEqual(x.prefs, a.prefs, "prefs are not the same as base classes");
    notDeepEqual(x.prefs, b.prefs, "prefs are not the same as base classes");
    notDeepEqual(y.prefs, a.prefs, "prefs are not the same as base classes");
    notDeepEqual(y.prefs, b.prefs, "prefs are not the same as base classes");

    equal(undefined, a.spells, "classes without spells should not have any spells");
    equal(undefined, b.spells, "classes without spells should not have any spells");
    equal(undefined, x.spells, "classes without spells should not have any spells");
    equal(undefined, y.spells, "classes without spells should not have any spells");
});
