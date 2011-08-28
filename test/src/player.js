module("player.js");

(function () {
    var _= {
             age: 32
            ,caste: "Hero"
            ,job: Classes.is("Fighter")
            ,height: 1
            ,level: 8
            ,name: "Joshua"
            ,stats: Castes.is("Champion").column()
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
                temp = Castes.is("Pleb");
                equal(temp, o.caste(temp), "caste set to " + temp);

                temp = Castes.is("") || "";
                equal(temp, o.caste(temp), "caste set to " + temp);
                
            //* job
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
                temp = _.job;
                equal(temp, o.background(), "background retrieves " + temp + ", initial job");

            //* lineage
                temp = Castes.is(_.caste);
                equal(temp, o.lineage(), "lineage retrieves " + temp + ", initial caste");

            //* gender
                equal(_.gender, o.gender(), "gender retrieves " + o.gender());

            //* race
                equal(_.race, o.race(), "race retrieves " + o.race());

            }(actual[temp]));
        }
    });
}());