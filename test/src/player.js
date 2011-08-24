module("player.js");

(function () {
    var _= {
            age: 32,
            caste: "Hero",
            designation: Classes.Fighter,
            height: 1,
            level: 8,
            name: "Joshua",
            stats: [1,1,1,1,1,1,1],
            title: "",
            weight: 290,

            ignoredProperty: "not initiailized in object",

            background: Classes.Fighter,
            gender: "male",
            heritage: "Hero",
            race: Races[0]
        },
        a =     Player(_),
        b =     Player(_),
        c = new Player(_),
        d = new Player(_),
        actual,
        invalidArgsMsg = "passing invalid arg should throw an error to help with debugging",
        temp;
    
    test("Player object initialization", function () {
        ok(Player, "Player object is available");
        ok(a.isValid, ".isValid() method is available to Player instances");
        equal("[object Player]", Player.getType(), "getType() return the correct string value");
    });

    test("instance methods", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
            
            //* age
                temp = 1;
                equal(temp, o.age(temp), "age set to " + temp);

                temp = 10;
                equal(temp, o.age(temp), "age set to " + temp);

                raises(function () {
                    o.age(0);
                }, Error, invalidArgsMsg);

                raises(function () {
                    o.age(-1);
                }, Error, invalidArgsMsg);

            //* caste
                temp = "Duke";
                equal(temp, o.caste(temp), "caste set to " + temp);

                temp = "";
                equal(temp, o.caste(temp), "caste set to " + temp);

                raises(function () {
                    o.caste(10);
                }, Error, invalidArgsMsg);
                
            //* designation
                temp = Classes.Fighter;
                equal(temp, o.designation(temp), "designation set to " + temp);

                equal(Classes.Cleric, o.designation("Cleric"), "setting designation using string name of class works");
                raises(function () {
                    o.designation("Hello");
                }, Error, invalidArgsMsg);

                raises(function () {
                    o.designation(Classes.Hello);
                }, Error, invalidArgsMsg);
            
            //* height
                temp = 123;
                equal(temp, o.height(temp), "height set to " + temp);

                temp = "321";
                equal(temp, o.height(temp), "height set to " + temp);

                raises(function () {
                    o.height(0);
                }, Error, invalidArgsMsg);

                raises(function () {
                    o.height("abc");
                }, Error, invalidArgsMsg);

            //* level
                temp = 123;
                equal(temp, o.level(temp), "level set to " + temp);

                temp = "321";
                equal(temp, o.level(temp), "level set to " + temp);

                raises(function () {
                    o.level(0);
                }, Error, invalidArgsMsg);

                raises(function () {
                    o.level("abc");
                }, Error, invalidArgsMsg);

            //* name
                temp = "Duke";
                equal(temp, o.name(temp), "name set to " + temp);

                temp = "";
                equal(temp, o.name(temp), "name set to " + temp);

                raises(function () {
                    o.name(10);
                }, Error, invalidArgsMsg);

            //* stats
                temp = [1,2,3,4,5,6,7];
                equal(temp, o.stats(temp), "stats set to [" + temp + "]");

                raises(function () {
                    o.stats([]);
                }, Error, invalidArgsMsg);

                raises(function () {
                    o.stats([1,2,3,4,5,6,7,8]);
                }, Error, invalidArgsMsg);

                raises(function () {
                    o.stats("");
                }, Error, invalidArgsMsg);

                raises(function () {
                    o.stats("invalid stats arg");
                }, Error, invalidArgsMsg);

            //* title
                temp = "Duke";
                equal(temp, o.title(temp), "title set to " + temp);

                temp = "";
                equal(temp, o.title(temp), "title set to " + temp);

                raises(function () {
                    o.title(10);
                }, Error, invalidArgsMsg);

            //* weight
                temp = 123;
                equal(temp, o.weight(temp), "weight set to " + temp);

                temp = "321";
                equal(temp, o.weight(temp), "weight set to " + temp);

                raises(function () {
                    o.weight(0);
                }, Error, invalidArgsMsg);

                raises(function () {
                    o.weight("abc");
                }, Error, invalidArgsMsg);

            //* background
                temp = _.designation;
                equal(temp, o.background(), "background retrieves " + temp + ", initial designation");

            //* heritage
                temp = _.caste;
                equal(temp, o.heritage(), "heritage retrieves " + temp + ", initial caste");

            //* gender
                equal(_.gender, o.gender(), "gender retrieves " + o.gender());

            //* race
                equal(_.race, o.race(), "race retrieves " + o.race());

            }(actual[temp]));
        }
    });

    test("instance methods return values passed into the constructor", function () {
        ok(Player, "Player object defined");
        equal(Player.getType(), a.getType(), a.name() + ".getType() return correct string value");

        actual = b;
        for (temp in actual) {
            if (b.hasOwnProperty(temp)) {
                (function (o, m) {
                    equal(_[m], o[m](), m);
                
                    raises(function () {
                        o[m]("too", "many", "arguments", "for", "any", "instance", "methods");
                    }, Error, "too many args passed to ." + m + "() should throw an error to help with debugging");
                }(actual, temp));
            }
        }
    });
}());