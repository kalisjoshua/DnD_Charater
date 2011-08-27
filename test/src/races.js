module("races.js");

(function () {
    var actual,
        temp;
    
    test("just an array of object literals", function () {
        ok(Races, "Races is defined");
        ok(8 === Races.map(function (n) {n.name}).length, "6 Races defined");

        temp = "Dwarf";
        ok(Races.map(function (n) {n.name}).indexOf(temp), temp + " is defined in Races");

        temp = "Gnome";
        ok(Races.map(function (n) {n.name}).indexOf(temp), temp + " is defined in Races");
        
        temp = "Dragon";
        ok(-1 === Races.map(function (n) {n.name}).indexOf(temp), temp + " is NOT defined in Races");

        equal("common", Races.filter(function (n) {return n.name === "Human"})[0].languages[0], "");
    });
}());