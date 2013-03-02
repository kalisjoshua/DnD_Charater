module("classes.js");

test("list checks", function () {
    equal(15, Classes.length, "correct number of classes");

    equal(6, Classes.duals().length, "correct number of dual classes");
});

test("dual-classes", function () {
    raises(function () {
        Classes.merge();
    }, "no arguments passed into merge");

    ok(Classes.merge("Cleric"), "Passing in only one class to Classes.merge() should simply return the class passed in.");
    
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
        Classes.merge(Classes.named("Cleric"), Classes.named("Fighter"));
    }, "objects passed into merge, seem like it should work but shouldn't");

    raises(function () {
        Classes.merge("Cleric", "Cleric");
    }, "attemptng self-dual-class");
});

test("dual-class objects | Cleric, Fighter", function () {
    var  cleric  = Classes.named("Cleric")
        ,fighter = Classes.named("Fighter")
        ,clericfighter = Classes.merge("Cleric", "Fighter")
        ,fightercleric = Classes.merge("Fighter", "Cleric");

    deepEqual(clericfighter.saves.join(), fightercleric.saves.join(), "saves are the same regaurdless of primary and secondary classes");
    notDeepEqual(clericfighter.saves.join(), cleric.saves.join(), "saves are not the same as base classes");
    notDeepEqual(clericfighter.saves.join(), fighter.saves.join(), "saves are not the same as base classes");
    notDeepEqual(fightercleric.saves.join(), cleric.saves.join(), "saves are not the same as base classes");
    notDeepEqual(fightercleric.saves.join(), fighter.saves.join(), "saves are not the same as base classes");

    equal((cleric.HDT + fighter.HDT) / 2, clericfighter.HDT, "merged HDT should be correct");
    equal((cleric.HDT + fighter.HDT) / 2, fightercleric.HDT, "merged HDT should be correct");

    notDeepEqual(clericfighter.prefs.join(), cleric.prefs.join(), "prefs are not the same as base classes");
    notDeepEqual(clericfighter.prefs.join(), fighter.prefs.join(), "prefs are not the same as base classes");
    notDeepEqual(fightercleric.prefs.join(), cleric.prefs.join(), "prefs are not the same as base classes");
    notDeepEqual(fightercleric.prefs.join(), fighter.prefs.join(), "prefs are not the same as base classes");

    equal(undefined, clericfighter.spells[1], "classes without spells should not have any spells");
    equal(undefined, fightercleric.spells[0], "classes without spells should not have any spells");
});
