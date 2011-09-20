module("player.js");

(function () {
    var _= {
             age: 32
            ,caste: "Hero"
            ,job: Classes.is("Fighter")
            ,height: 1
            ,level: 8
            ,name: "Joshua"
            ,race: Races.is("Human")
            ,stats: stats(Castes.is("Champion").column())
            ,title: "Sir"
            ,weight: 290
        }
        ,a =     Player(_)
        ,b =     Player(_)
        ,c = new Player(_)
        ,d = new Player(_)
        ,actual
        ,invalidArgsMsg = "passing invalid arg should throw an error to help with debugging"
        ,temp;

    test("Player object initialization", function () {
        ok(Player, "Player object is available");
        ok(a.isValid, ".isValid() method is available to Player instances");
        equal("Player", a.getType(), "getType() return the correct string value");
        equal("" + a, a.toString(), "toString() should be the same as when the inferred string value is returned");
    });

    test("instance methods - age", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
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
            }(actual[temp]));
        }
    });

    test("instance methods - caste", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                temp = Castes.is("Pleb");
                equal(temp, o.caste(temp), "caste set to " + temp);

                temp = Castes.is("") || "";
                equal(temp, o.caste(temp), "caste set to " + temp);
            }(actual[temp]));
        }
    });

    test("instance methods - job", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                temp = Classes.is("Fighter");
                equal(temp, o.job(temp), "job set to " + temp);

                temp = "Fighter";
                equal(Classes.is(temp), o.job(temp), "setting job using string name of job works");

                raises(function () {
                    o.job("Hello");
                }, Error, invalidArgsMsg);

                raises(function () {
                    o.job(Classes.Hello);
                }, Error, invalidArgsMsg);
            }(actual[temp]));
        }
    });

    test("instance methods - height", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
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
            }(actual[temp]));
        }
    });

    test("instance methods - level", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
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
            }(actual[temp]));
        }
    });

    test("instance methods - name", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                temp = "Duke";
                equal(temp, o.name(temp), "name set to " + temp);

                temp = "";
                equal(temp, o.name(temp), "name set to " + temp);

                raises(function () {
                    o.name(10);
                }, Error, invalidArgsMsg);
            }(actual[temp]));
        }
    });

    test("instance methods - stats", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                temp = stats([3,3,3,3,3,3,3]);
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
            }(actual[temp]));
        }
    });

    test("instance methods - title", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                temp = "Duke";
                equal(temp, o.title(temp), "title set to " + temp);

                temp = "";
                equal(temp, o.title(temp), "title set to " + temp);

                raises(function () {
                    o.title(10);
                }, Error, invalidArgsMsg);
            }(actual[temp]));
        }
    });

    test("instance methods - weight", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
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
            }(actual[temp]));
        }
    });

    test("instance methods - background", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                temp = _.job;
                equal(temp, o.background(), "background retrieves " + temp + ", initial job");
            }(actual[temp]));
        }
    });

    test("instance methods - lineage", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                temp = Castes.is(_.caste);
                equal(temp, o.lineage(), "lineage retrieves " + temp + ", initial caste");
            }(actual[temp]));
        }
    });

    test("instance methods - gender", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                equal(_.gender, o.gender(), "gender retrieves " + o.gender());
            }(actual[temp]));
        }
    });

    test("instance methods - race", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                equal(_.race, o.race(), "race retrieves " + o.race());
            }(actual[temp]));
        }

        _.job = "Fighter";
        _.race = "Human";
        a = new Player(_);
        equal(Races.is(_.race), a.race(), "");
    });

    test("lookup methdos", function () {
        ok(a.hp());
    })
}());