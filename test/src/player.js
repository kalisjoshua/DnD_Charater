module("player.js");

(function () {
    var _= {
             age: 32
            ,caste: "Hero"
            ,job: "Fighter"
            ,height: 1
            ,level: 8
            ,name: "Joshua"
            ,race: "Human"
            ,stats: Stats(Castes.named("Champion").column())
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
        equal("[object Player]", a.getType(), "getType() return the correct string value");
        equal("" + a, a.toString(), "toString() should be the same as when the inferred string value is returned");
    });

    test("instance methods - age", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                temp = 1;
                o.age(temp);
                equal(temp, o.age(), "age set to " + temp);

                temp = 10;
                o.age(temp);
                equal(temp, o.age(), "age set to " + temp);

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
                temp = Castes.named("Pleb");
                o.caste(temp);
                equal(temp, o.caste(), "caste set to " + temp);

                temp = "Hero";
                o.caste(temp);
                equal(Castes.named(temp), o.caste(), "caste set to " + temp);

                raises(function () {
                    o.caste("Couch");
                }, Error, "invalid string passed to .caste() throws an error.");
            }(actual[temp]));
        }
    });

    test("instance methods - job", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                temp = Classes.named("Fighter");
                o.job(temp)
                equal(temp, o.job(), "job set to " + temp);

                temp = "Fighter";
                o.job(temp);
                equal(Classes.named(temp), o.job(), "setting job using string name of job works");

                raises(function () {
                    o.job("Hello");
                }, Error, invalidArgsMsg);

                // raises(function () {
                //     o.job(Classes.named("Couch"));
                // }, Error, invalidArgsMsg);
            }(actual[temp]));
        }
    });

    test("instance methods - height", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                temp = 123;
                o.height(temp);
                equal(temp, o.height(), "height set to " + temp);

                temp = "321";
                o.height(temp);
                equal(temp, o.height(), "height set to " + temp);

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
                o.level(temp);
                equal(temp, o.level(), "level set to " + temp);

                temp = "321";
                o.level(temp)
                equal(temp, o.level(), "level set to " + temp);

                raises(function () {
                    o.level(-3);
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
                temp = "Duk of Earl";
                o.name(temp);
                equal(temp, o.name(), "name set to " + temp);

                temp = "";
                o.name(temp);
                equal(temp, o.name(), "name set to " + temp);

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
                temp = Stats([3,3,3,3,3,3,3]);
                o.stats(temp);
                equal(temp, o.stats(), "stats set to [" + temp + "]");

                raises(function () {
                    o.stats([]);
                }, Error, invalidArgsMsg);

                raises(function () {
                    o.Stats([1,2,3,4,5,6,7,8]);
                }, Error, invalidArgsMsg);

                raises(function () {
                    o.Stats("");
                }, Error, invalidArgsMsg);

                raises(function () {
                    o.Stats("invalid stats arg");
                }, Error, invalidArgsMsg);
            }(actual[temp]));
        }
    });

    test("instance methods - title", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                temp = "Duke of Earl";
                o.title(temp);
                equal(temp, o.title(), "title set to " + temp);

                temp = "";
                o.title(temp)
                equal(temp, o.title(), "title set to " + temp);

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
                o.weight(temp);
                equal(temp, o.weight(), "weight set to " + temp);

                temp = "321";
                o.weight(temp)
                equal(temp, o.weight(), "weight set to " + temp);

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
                equal(o.caste().name, o.lineage().name, "lineage retrieves " + temp + ", initial caste");
            }(actual[temp]));
        }
    });

    // test("instance methods - gender", function () {
    //     actual = [a, d];
    //     for (temp in actual) {
    //         (function (o, temp) {
    //             equal(_.gender, o.gender(), "gender retrieves " + o.gender());
    //         }(actual[temp]));
    //     }
    // });

    test("instance methods - race", function () {
        actual = [a, d];
        for (temp in actual) {
            (function (o, temp) {
                equal(_.race, o.race().name, "race retrieves " + o.race());
            }(actual[temp]));
        }

        _.job = "Fighter";
        _.race = "Human";
        a = new Player(_);
        equal(_.race, a.race().name, "");
    });

    test("lookup methdos", function () {
        ok(a.hp(), ".hp() should return something.");
    })
}());