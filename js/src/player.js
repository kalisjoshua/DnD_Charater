//// player.js

var Player = function (config) {
        if (this === (function () {return this;}())) {
            return new Player(config);
        }
        
        var 
        // mutable properties
             _age
            ,_caste         // current Caste
            ,_designation   // Fighter, Cleric, Mage/Thief, etc.
            ,_height
            ,_level
            ,_name
            ,_stats
            ,_title         // eg. Sir, Count, Lady, etc.
            ,_weight

        // immutable properties
            ,_background   // initial class
            ,_gender
            ,_heritage     // begining Caste
            ,_race

            ,initializationMethods = [
                "age",
                "caste",
                "designation",
                "height",
                "level",
                "name",
                "stats",
                "title",
                "weight"
            ]

        // private methods
            ,invalidArgumentsError = function (fn) {
                // console.log(fn, ([]).slice.call(arguments, 1)[0]);
                return new Error("Invalid argument(s) passed into ." + fn + "() :: " + arguments[1]);
            }

            ,tooManyArgumentsError = function (fn) {
                // console.log(fn, ([]).slice.call(arguments, 1)[0]);
                return new Error("Too many arguments passed into ." + fn + "() :: " + ([]).slice.call(arguments, 1)[0].toString());
            }

            ,validateInputNumber = function (delta) {
                if (arguments.length === 1) {
                    if (Util.isNumeric(delta) && (delta = parseInt(delta, 10)) > 0 && delta) {
                        return delta;
                    } else {
                        throw invalidArgumentsError(this, arguments);
                    }
                } else if (arguments.length > 1) {
                    throw tooManyArgumentsError(this, arguments);
                }
                return false; // fallthrough fail-safe
            }

            ,validateInputString = function (delta) {
                if (arguments.length === 1) {
                    if (Util.isString(delta)) {
                        return delta;
                    } else {
                        throw invalidArgumentsError(this, arguments);
                    }
                } else if (arguments.length > 1) {
                    throw tooManyArgumentsError(this, arguments);
                }
                return false; // fallthrough fail-safe
            }
        ;

        this.age = function (delta) {
            if (delta = validateInputNumber.apply("age", arguments)) {
                _age = delta;
            }

            return _age;
        };

        this.caste = function (delta) {
            if (delta === "" || (delta = validateInputString.apply("caste", arguments))) {
                _caste = delta;
            }

            return _caste;
        };

        this.designation = function (delta) {
            if (arguments.length === 1) {
                if (delta && delta.getType && /dnd\._Class/.test(delta.getType()) ||
                    Util.isString(delta) && (delta = Classes[delta])
                ) {
                    _designation = delta;
                } else {
                    throw invalidArgumentsError("designation");
                }
            } else if (arguments.length > 1) {
                throw tooManyArgumentsError("designation");
            }

            return _designation;
        };

        this.height = function (delta) {
            if (delta = validateInputNumber.apply("height", arguments)) {
                _height = delta;
            }

            return _height;
        };

        this.level = function (delta) {
            if (delta = validateInputNumber.apply("level", arguments)) {
                _level = delta;
            }

            return _level;
        };

        this.name = function (delta) {
            if (delta === "" || (delta = validateInputString.apply("name", arguments))) {
                _name = delta;
            }
            return _name;
        };

        this.stats = function (delta) {
            if (arguments.length === 1) {
                if (Util.isArray(delta) && delta.length === 7) {
                    _stats = delta;
                } else {
                    throw invalidArgumentsError("stats");
                }
            } else if (arguments.length > 1) {
                throw tooManyArgumentsError("stats");
            }

            return _stats;
        };

        this.title = function (delta) {
            if (delta === "" || (delta = validateInputString.apply("title", arguments))) {
                _title = delta;
            }
            
            return _title;
        };

        this.weight = function (delta) {
            if (delta = validateInputNumber.apply("weight", arguments)) {
                _weight = delta;
            }

            return _weight;
        };

        this.background = function () {
            if (arguments.length > 0) {
                throw tooManyArgumentsError("background");
            }
            return _background;
        };

        this.gender = function () {
            if (arguments.length > 0) {
                throw tooManyArgumentsError("gender");
            }
            return _gender;
        };

        this.heritage = function () {
            if (arguments.length > 0) {
                throw tooManyArgumentsError("heritage");
            }
            return _heritage;
        };

        this.race = function () {
            if (arguments.length > 0) {
                throw tooManyArgumentsError("race");
            }
            return _race;
        };

        for (var m in initializationMethods) {
            this[initializationMethods[m]](config[initializationMethods[m]]);
        }

        // immutable properties need to be initialized here as they do not have public set methods
        _background = _designation;
        
        if (config.gender) {
            _gender = config.gender;
        }
        
        _heritage = _caste;

        if (config.race && (Races[config.race] || config.race.title)) {
            _race = Races[config.race] || config.race;
        }
    };

// Player.default_config = {
//         age: 32,
//         caste: "Hero",
//         designation: Classes.Fighter,
//         height: 1,
//         level: 8,
//         name: "Joshua",
//         stats: [1,1,1,1,1,1,1],
//         title: "Sir",
//         weight: 290,

//         ignoredProperty: "not initiailized in object",

//         background: Classes.Fighter,
//         gender: "male",
//         heritage: "Hero",
//         race: Races[0]
//     };
// Player.sample = Player(Player.default_config);

Player.getType = function (obj) {
    return Player.prototype.getType.call(obj);
};

Player.prototype.getType = function () {
    return "[object Player]";
};

Player.prototype.isValid = function () {
    return true &&
        // comments are fields we aren't validating against to start off with

        // Util.isNumeric(this.age()) && this.age()) > 0 &&
        // Util.isString(this.caste()) &&
        this.designation() &&
        // Util.isNumeric(this.height()) && this.height() > 0 &&
        this.level() &&
        // this.name() &&
        this.stats() &&
        // Util.isString(this.title()) &&
        // Util.isNumeric(this.weight()) && this.weight() > 0 &&

        // this.background() &&
        // this.heritage() &&
        // this.gender() &&
        this.race() &&
        true; // here only to allow all lines to end in &&
};

Player.prototype.toString = function () {
    return ((_title) ? (_title + " ") : ("")) + _name;
};
