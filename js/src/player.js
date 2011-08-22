//// player.js

var Player = (function () {
    var
        Player = function (config) {
            var 
            // mutable properties
                 _age = 15
                ,_caste                                 // current Caste
                ,_designation
                ,_height
                ,_level = 0
                ,_name = "gi Venn Oname"
                ,_stats = []
                ,_title                                 // eg. Sir, Count, Lady, etc.
                ,_weight

            // immutable properties
                ,_background = config.background || ""  // initial class
                ,_heritage = config.heritage || ""      // begining Caste
                ,_gender = config.gender || "Gender"
                ,_race = config.race || "Race"

                ,methods = [
                    "age",
                    "caste",
                    "designation",
                    "height",
                    "level",
                    "name",
                    "stats",
                    "title",
                    "weight",
                    "background",
                    "heritage",
                    "gender",
                    "race"
                ]

            // private methods
                ,increment = function (d, max) {
                    return Util.isNumeric(d) && d > 0 ? parseInt(d, 10) : 1;
                }
            ;

            this.age = function (delta) {
                delta = increment(delta, _age);

                if (arguments.length === 1 && delta) {
                    _age = delta;
                }

                return _age;
            };

            this.caste = function (delta) {
                if (arguments.length === 1 && delta || delta === "") {
                    _caste = delta.toString();
                }

                return _caste;
            };

            this.designation = function (delta) {
                if (arguments.length === 1 && delta || delta === "") {
                    _designation = delta;
                }

                return _designation;
            };

            this.height = function (delta) {
                delta = increment(delta, _height);

                if (arguments.length === 1 && delta) {
                    _height = delta;
                }

                return _height;
            };

            this.level = function (delta) {
                delta = increment(delta, _level);

                if (arguments.length === 1 && delta) {
                    _level = delta;
                }

                return _level;
            };

            this.name = function (delta) {
                if (arguments.length === 1 && delta || delta === "") {
                    _name = delta;
                }
                
                return _name;
            };

            this.stats = function (delta) {
                if (arguments.length === 1 && delta && Util.isArray(delta) && delta.length === 7) {
                    _stats = delta;
                }

                return _stats;
            };

            this.title = function (delta) {
                if (arguments.length === 1 && delta || delta === "") {
                    _title = delta;
                }
                
                return _title;
            };

            this.weight = function (delta) {
                delta = increment(delta, _weight);

                if (arguments.length === 1 && delta) {
                    _weight = delta;
                }

                return _weight;
            };

            this.background = function () {
                return _background;
            };

            this.heritage = function () {
                return _heritage;
            };

            this.gender = function () {
                return _gender;
            };

            this.race = function () {
                return _race;
            };

            for (var m in methods) {
                this[methods[m]](config[methods[m]]);
            }
        },

        fn = Player.prototype;

    // Player.Castes = {...};

    // Player.create = function (config) {
    //     return new Player(config);
    // };

    return Player;
}());
