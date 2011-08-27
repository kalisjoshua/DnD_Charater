var augment = (function (extend) {
        var act = function (list, ext) {
                this.add(list);

                extend(this, ext);
            }

            ,create = function (list, ext) {
                return new act(list, ext);
            };

        // make the new object behaive like an array with all the array functions
        act.fn = act.prototype = new Array();


        // add custom functionality to make working with the list(s) easier

        act.fn.add = function (args) {
            this.push.apply(this, args);

            return this;
        };

        act.fn.each = function (fn) {
            this.forEach(function (node) {
                fn.call(node);
            });

            return this;
        };

        act.fn.find = function (fn) {
            var result = this.filter(function (node, indx) {
                return fn.call(node);
            });

            return create(result);
        };

        act.fn.is = function (key) {
            return this.filter(function (node) {
                return node.name === key;
            })[0];
        };

        act.fn.names = function () {
            return this.map(function (node) {
                return node.name;
            });
        };

        return create;
    }($.extend));
