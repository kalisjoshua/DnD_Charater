//// player.js

var Player = function (config) {
    if (this === (function () {return this;}())) {
        return new Player(config);
    }
    
    var 
    // mutable properties
         _age
        ,_caste         // current Caste
        ,_height
        ,_job           // Fighter, Cleric, Mage/Thief, etc.
        ,_level
        ,_name
        ,_race
        ,_stats
        ,_title         // eg. Sir, Count, Lady, etc.
        ,_weight

    // immutable properties
        ,_background    // initial job
        ,_gender
        ,_lineage       // begining Caste
        ,_race

        ,initMethods = [
             "age"
            ,"caste"
            ,"height"
            ,"job"
            ,"level"
            ,"name"
            // ,"race" // not a setter method
            ,"stats"
            ,"title"
            ,"weight"
        ]

    // private methods
        ,invalidArgumentsError = function (fn) {
            return new Error("Invalid argument(s) passed into ." + fn + "() :: " + arguments[1]);
        }

        ,tooManyArgumentsError = function (fn) {
            return new Error("Too many arguments passed into ." + fn + "() :: " + arguments);
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
        if (arguments.length === 1) {
            delta = delta || "";
            if (delta === "" || 
                (delta && delta.getType && /\[object Caste/.test(delta.getType())) ||
                (Util.isString(delta) && (delta = Castes.is(delta)))
            ) {
                _caste = delta;
            } else {
                throw invalidArgumentsError("caste");
            }
        } else if (arguments.length > 1) {
            throw tooManyArgumentsError("job");
        }

        return _caste;
    };

    this.height = function (delta) {
        if (delta = validateInputNumber.apply("height", arguments)) {
            _height = delta;
        }

        return _height;
    };

    this.job = function (delta) {
        if (arguments.length === 1) {
            if (delta && (delta.getType && /\[object Class-/.test(delta.getType())) ||
                (Util.isString(delta) && (delta = Classes.is(delta)))
            ) {
                _job = delta;
            } else {
                throw invalidArgumentsError("job");
            }
        } else if (arguments.length > 1) {
            throw tooManyArgumentsError("job");
        }

        return _job;
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
            if (delta.getType && delta.getType() === "stats" && delta.length === 7) {
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

    this.lineage = function () {
        if (arguments.length > 0) {
            throw tooManyArgumentsError("heritage");
        }

        return _lineage;
    };

    this.race = function () {
        if (arguments.length > 0) {
            throw tooManyArgumentsError("race");
        }

        return _race;
    };

    for (var m in initMethods) {
        this[initMethods[m]](config[initMethods[m]]);
    }

    // immutable properties need to be initialized here as they do not have public set methods
    _background = _job;
    
    if (config.gender) {
        _gender = config.gender;
    }

    _lineage = _caste;

    if (config.race && (Races.is(config.race) || config.race.name)) {
        _race = Races.is(config.race) || config.race;
    }
};

Player.prototype = {
    getType: function () {
        return "Player";
    }

    ,hp: function () {
        return this.caste().dice * this.level();
    }

    ,isValid: function () {
        return this.job() &&
            this.level() &&
            this.stats() &&
            this.race();
    }

    ,move: function () {
        
    }

    ,thaco: function () {
        
    }

    ,toString: function () {
        return "[object Player]";
    }
};
