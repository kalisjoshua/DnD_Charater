var activeList = (function () {
        var act = function (list) {
                for (var n in list) {
                    list.hasOwnProperty(n) && this.push(list[n]);
                }
            }

            ,create = function (list) {
                return new act(list);
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
        };

        act.fn.find = function (fn) {
            var result = this.filter(function (node, indx) {
                return fn.call(node);
            });

            return create(result);
        };

        return create;
    }())