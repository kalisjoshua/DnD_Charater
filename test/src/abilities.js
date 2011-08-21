module("abilities.js");

(function () {
    var actual,
        temp;
        
    test("Abilities", function () {
        ok(Abilities, "Abilities defined");
    });

    test("Abilities.Charisma", function () {
        ok(Abilities.Charisma, "Abilities.Charisma defined");

        deepEqual(Abilities.Charisma( 3), [ 1, -30, -25,  -5], "Ability level  3 of Charisma");
        deepEqual(Abilities.Charisma(10), [ 4,   0,   0,   0], "Ability level 10 of Charisma");
        deepEqual(Abilities.Charisma(24), [35,  97,  86,  12], "Ability level 24 of Charisma");

        raises(function () {
            Abilities.Charisma(2);
        }, Error, "Throws error when values are not valid - too low");

        raises(function () {
            Abilities.Charisma(25);
        }, Error, "Throws error when values are not valid - too high");
    });

    test("Abilities.Constitution", function () {
        ok(Abilities.Constitution, "Abilities.Constitution defined");

        deepEqual(Abilities.Constitution( 3), [-2,  35,  40,  0], "Ability level  3 of Constitution");
        deepEqual(Abilities.Constitution(10), [ 0,  70,  75,  0], "Ability level 10 of Constitution");
        deepEqual(Abilities.Constitution(24), [10, 100, 100,  0], "Ability level 24 of Constitution");

        raises(function () {
            Abilities.Constitution(2);
        }, Error, "Throws error when values are not valid - too low");

        raises(function () {
            Abilities.Constitution(25);
        }, Error, "Throws error when values are not valid - too high");
    });

    test("Abilities.Comeliness", function () {
        ok(Abilities.Comeliness, "Abilities.Comeliness defined");

        deepEqual(Abilities.Comeliness( 3), ['', '', ''], "Ability level  3 of Comeliness");
        deepEqual(Abilities.Comeliness(10), ['', '', ''], "Ability level 10 of Comeliness");
        deepEqual(Abilities.Comeliness(24), ['', '', ''], "Ability level 24 of Comeliness");

        raises(function () {
            Abilities.Comeliness(2);
        }, Error, "Throws error when values are not valid - too low");

        raises(function () {
            Abilities.Comeliness(25);
        }, Error, "Throws error when values are not valid - too high");
    });

    test("Abilities.Dexterity", function () {
        ok(Abilities.Dexterity, "Abilities.Dexterity defined");

        deepEqual(Abilities.Dexterity( 3), [-3, -3,  4], "Ability level  3 of Dexterity");
        deepEqual(Abilities.Dexterity(10), [ 0,  0,  0], "Ability level 10 of Dexterity");
        deepEqual(Abilities.Dexterity(24), [ 7,  7, -8], "Ability level 24 of Dexterity");

        raises(function () {
            Abilities.Dexterity(2);
        }, Error, "Throws error when values are not valid - too low");

        raises(function () {
            Abilities.Dexterity(25);
        }, Error, "Throws error when values are not valid - too high");
    });

    test("Abilities.Intelligence", function () {
        ok(Abilities.Intelligence, "Abilities.Intelligence defined");

        deepEqual(Abilities.Intelligence( 3), [ 0,  0,  0,  0], "Ability level  3 of Intelligence");
        deepEqual(Abilities.Intelligence(10), [ 2, 45,  5,  7], "Ability level 10 of Intelligence");
        deepEqual(Abilities.Intelligence(24), [12, 98, 14, 99], "Ability level 24 of Intelligence");

        raises(function () {
            Abilities.Intelligence(2);
        }, Error, "Throws error when values are not valid - too low");

        raises(function () {
            Abilities.Intelligence(25);
        }, Error, "Throws error when values are not valid - too high");
    });

    test("Abilities.Strength", function () {
        ok(Abilities.Strength, "Abilities.Strength defined");

        deepEqual(Abilities.Strength( 3     ), [-3, -1, -350,   '1/6',  0], "Ability level  3 of Strength");
        deepEqual(Abilities.Strength(10     ), [ 0,  0,    0,   '2/6',  2], "Ability level 10 of Strength");

        deepEqual(Abilities.Strength(18,   0), [ 1,  2,  750,   '3/6', 16], "Ability level 18/0 of Strength");
        deepEqual(Abilities.Strength(18,  -1), [ 1,  2,  750,   '3/6', 16], "Ability level 18/01-50 of Strength; negative values as second args will work fine");

        deepEqual(Abilities.Strength(18,   1), [ 1,  3, 1000,   '3/6', 20], "Ability level 18/01-50 of Strength");
        deepEqual(Abilities.Strength(18,  50), [ 1,  3, 1000,   '3/6', 20], "Ability level 18/01-50 of Strength");

        deepEqual(Abilities.Strength(18,  51), [ 2,  3, 1250,   '4/6', 25], "Ability level 18/51-75 of Strength");
        deepEqual(Abilities.Strength(18,  75), [ 2,  3, 1250,   '4/6', 25], "Ability level 18/51-75 of Strength");

        deepEqual(Abilities.Strength(18,  76), [ 2,  4, 1500,   '4/6', 30], "Ability level 18/76-90 of Strength");
        deepEqual(Abilities.Strength(18,  90), [ 2,  4, 1500,   '4/6', 30], "Ability level 18/76-90 of Strength");

        deepEqual(Abilities.Strength(18,  91), [ 2,  5, 2000,   '4/6', 35], "Ability level 18/91-99 of Strength");
        deepEqual(Abilities.Strength(18,  99), [ 2,  5, 2000,   '4/6', 35], "Ability level 18/91-99 of Strength");

        deepEqual(Abilities.Strength(18, 100), [ 3,  6, 3000,   '5/6', 40], "Ability level 18/100+ of Strength");
        deepEqual(Abilities.Strength(18, 234), [ 3,  6, 3000,   '5/6', 40], "Ability level 18/100+ of Strength; second arg only needs to be a positive number");

        deepEqual(Abilities.Strength(24     ), [ 6, 12, 3600, '19/20', 82], "Ability level 24 of Strength");

        deepEqual(Abilities.Strength( 3, 100), [-3, -1, -350,   '1/6',  0], "Ability level  3/100 of Strength; second arg only applies if first arg is 18");
        deepEqual(Abilities.Strength(19, 100), [ 3,  7, 1250,   '7/8', 25], "Ability level 19/100 of Strength; second arg only applies if first arg is 18");

        notDeepEqual(Abilities.Strength( 3, 100), [ 3,  6, 3000,   '5/6', 40], "Ability level  3/100 of Strength");
        notDeepEqual(Abilities.Strength(19, 100), [ 3,  6, 3000,   '5/6', 40], "Ability level 19/100 of Strength");

        raises(function () {
            Abilities.Strength(2);
        }, Error, "Throws error when values are not valid - too low");

        raises(function () {
            Abilities.Strength(25);
        }, Error, "Throws error when values are not valid - too high");

        raises(function () {
            Abilities.Strength(18, "abc");
        }, Error, "Throws error when values are not valid - second arg is not valid");

        raises(function () {
            Abilities.Strength(18, null);
        }, Error, "Throws error when values are not valid - second arg is not valid");

        raises(function () {
            Abilities.Strength(18, []);
        }, Error, "Throws error when values are not valid - second arg is not valid");

        raises(function () {
            Abilities.Strength(18, {});
        }, Error, "Throws error when values are not valid - second arg is not valid");
    });

    test("Abilities.Wisdom", function () {
        ok(Abilities.Wisdom, "Abilities.Wisdom defined");

        deepEqual(Abilities.Wisdom( 3), [-3, 100, ""], "Ability level  3 of Wisdom");
        deepEqual(Abilities.Wisdom(10), [ 0,  15, ""], "Ability level 10 of Wisdom");
        deepEqual(Abilities.Wisdom(24), [ 6,   0, "1,1,1,1,2,2,2,2,3,3,3,4,4,4,5,6,7"], "Ability level 24 of Wisdom");

        raises(function () {
            Abilities.Wisdom(2);
        }, Error, "Throws error when values are not valid - too low");

        raises(function () {
            Abilities.Wisdom(25);
        }, Error, "Throws error when values are not valid - too high");
    });
}());