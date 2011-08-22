var createObject = function (scope, name, extend) {
    var 
        _class = function (members, behaviors) {
            // for holding private members
            var _state = extend(true, {}, members);

            this.extend = function (ext) {
                extend(this, ext);
            };

            // run this before we initialize necessary functions
            behaviors && this.extend(behaviors);

            //*/ these are vital methods on the _class for proper operations
            this.get = function (member) {
                if (!member) {
                    throw new Error("Member identifier to be retrieved was not passed in to set()");
                }
                return _state[member];
            };

            this.set = function (member, value) {
                if (arguments.length < 2) {
                    throw new Error("Expected exactly two (2) arguments to be passed in to set()");
                }
                return _state[member] = value;
            };

            this.state = function () {
                return extend({}, _state);
            };
        };
    
    _class.prototype.clone = function () {
        return new _class(this.state());
    };

    _class.prototype.toString = function () {
        return "[object " + name + "]";
    };

    scope[name] = function (members, behaviors) {
        return new _class(members, behaviors);
    };

    scope[name].extend = function (config) {
        extend(_class.prototype, config);
    };

    return scope[name];
};