//// player.js

// Player Factory
var Player = (function () {
    var execute = function (config, attr, tests, args) {
            var result = true;

            // shortcut to returning the requested value because the rest of the validations don't need to be executed
            if (args[0] === undefined && args.length === 0) {
                return config[attr];
            }

            // throw an error if too many arguments were passed into the validate functino
            arguments.length !== 4 && dndError({
                args: arguments
                ,fn: "execute"
            });

            // make the arguments, passed into the original function, into an actual array
            args = ([]).slice.call(args, 0);

            // throw an error if too many arguments were passed into the original function
            args.length > 1 && dndError({
                args: args
                ,fn: attr
            });

            args = args[0];
            if (args || args === 0 || args === "") {
                // run all the specified tests on the first value passed into the original function
                while (tests.length && (result = (tests.shift())(args)));

                // throw an error if the input fails any of the validations specified
                !result && dndError({
                    args: args
                    ,fn: attr
                });

                config[attr] = args;
            }

            // return the object to allow chaining
            return this;
        }

        ,fixObject = function (str, collection) {
            var result;

            if (str) {
                if (str.getType) {
                    result = str;
                } else if (Util.isString(str) && collection.named(str)) {
                    result = collection.named(str);
                } else {
                    dndError({
                        args: str
                        ,fn: "fixObject - " + collection
                    });
                }
            }

            return result;
        }

        ,Player = function (config) {
            config = Util.clone(config);

            this.age = function (delta) {

                return execute.call(this, config, "age", [Util.isNumeric, function (d) { return ~~d > 0; }], arguments);
            };

            this.background = function () {
                
                return config.background || "This character's background is unknown.";
            };

            this.caste = function (delta) {
                arguments[0] = fixObject(delta, Castes);

                return execute.call(this, config, "caste", [function (d) { return Util.isType(d, "Caste") }], arguments);
            };

            this.height = function (delta) {

                return execute.call(this, config, "height", [Util.isNumeric, function (d) { return ~~d > 0; }], arguments);
            };

            this.job = function (delta) {
                arguments[0] = fixObject(delta, Classes);

                return execute.call(this, config, "job", [function (d) { return Util.isType(d, "Class") }], arguments);
            };

            this.level = function (delta) {

                return execute.call(this, config, "level", [Util.isNumeric, function (d) { return ~~d > -3; }], arguments);
            };

            this.lineage = function () {
                
                return config.lineage || "No one knows where this character comes from."
            };

            this.name = function (delta) {

                return execute.call(this, config, "name", [Util.isString], arguments);
            };

            this.race = function (delta) {
                arguments[0] = fixObject(delta, Races);

                return execute.call(this, config, "race", [function (d) { return Util.isType(d, "Race") }], arguments);
            };

            this.stats = function (delta) {
                arguments[0] = fixObject(delta, Stats);

                return execute.call(this, config, "stats", [function (d) { return Util.isType(d, "Stats") }], arguments);
            };

            this.title = function (delta) {

                return execute.call(this, config, "title", [Util.isString], arguments);
            };

            this.weight = function (delta) {

                return execute.call(this, config, "weight", [Util.isNumeric, function (d) { return ~~d > 0; }], arguments);
            };

            // for the values passed in to run through their setters so that they can be massaged into the correct form(s)
            for (var i in config) {
                this[i] && this[i](config[i]);
            }

            !this.isValid() && dndError({
                args: config
                ,fn: "Player constructor"
                ,level: "warn"
            });

            config.background = this.job();
            config.lineage = this.caste();
        };
    
    Player.prototype = {
        getType: function () {

            return "[object Player]";
        }

        ,hp: function () {
            var adjust  = this.stats().adjustHP()
                ,dice   = this.caste().dice
                ,level  = this.level()
                ,result = []
                ,temp   = 0;

            while (level > 0) {
                temp = adjust + roll(dice);

                temp > 1 && result.push(temp) && level--;
            }

            return result
                .reduce(function (a, b) {
                    return a + b;
                });
        }

        ,isValid: function () {

            return Util.isType(this.job(), "Class")
                && this.level() >= 0
                && Util.isType(this.race(), "Race")
                && Util.isType(this.stats(), "Stats");
        }

        ,move: function () {

            return this.race().move;
        }

        ,optimize: function () {
            
        }

        ,saves: function () {
            
            return this.job().saves[this.level()];
        }

        ,skills: function () {
            
            return ;
        }

        ,thaco: function () {

            return this.job().thaco[this.level()] + this.stats().adjustTHAC0();
        }

        ,toString: function () {

            return "Player" + (this.name() ? " - " + this.name() : "");
        }
    };
    
    // factory pattern constructor
    return function (c) {

        return new Player(c || {});
    }
}());