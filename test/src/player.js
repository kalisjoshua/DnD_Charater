module("player.js");

(function () {
    var _= {
            age: 32,
            caste: "",
            designation: "",
            height: 1,
            level: 8,
            name: "Joshua",
            stats: [1,1,1,1,1,1,1],
            title: "",
            weight: 290,

            background: "",
            heritage: "",
            gender: "male",
            race: "Human"
        },
        a,
        b,
        c,
        d,
        actual,
        temp;

    test("Player creation", function () {
        ok(Player, "Player object defined");

        a = new Player(_);

        for (temp in a) {
            (function (m) {
                equal(_[m], a[m](), m);
            }(temp));
        }
    });
}());