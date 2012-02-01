module("races.js");

(function () {
    var actual,
        temp;
    
    test("Table of Race objects", function () {
        ok(Races, "Races is defined");
        ok(8 === Races.length, "8 Races defined");

        temp = "Dwarf";
        equal(temp, Races.named(temp).name, temp + " is defined in Races");

        temp = "Dragon";
        notEqual(temp, Races.named(temp), temp + " is NOT defined in Races");

        equal("common", Races.named("Human").languages[0], "");
    });
}());