//// classes.js

createObject(dnd, "_Class", $.extend);

var Bases = {},
    Classes = {},
    allClasses = [],
    dualClasses = [];

(function () {
    var n,
        addToBases = function (c) {
            Bases[c.get("title")] = c;
        };

    dnd._Class.extend({
        dual: function (sub) {
            if (this.get("title") === sub.get("title")) {
                throw new Error("Sub class is the same as Primary class in .dual()");
            }

            var _this = this,
                config = {
                    title: _this.get("title") + "/" + sub.get("title"),

                    dual: [],

                    HDT: (_this.get("HDT") + sub.get("HDT")) / 2,

                    prefs: (function (a, b) {
                        var indx = 0,
                            result = [];

                        while (indx < a.length + b.length) {
                            result.push(a[indx], b[indx]);
                            indx++;
                        }

                        return Util.array.unique(result);
                    }(_this.get("prefs"), sub.get("prefs"))),

                    saves: (function (a, b) {
                        var level = [],
                            result = [];

                        while (result.length < a.length) {
                            level = [];

                            while (level.length < a[0].length) {
                                level.push(a[result.length][level.length] < b[result.length][level.length] ? a[result.length][level.length] : b[result.length][level.length]);
                            }

                            result.push(level);
                        }

                        return result;
                    }(_this.get("saves"), sub.get("saves"))),

                    thaco: (function (a, b) {
                        var indx = 0,
                            result = [];

                        while (indx < a.length) {
                            result.push(a[indx] < b[indx] ? a[indx] : b[indx]);
                            indx++;
                        }

                        return result;
                    }(_this.get("thaco"), sub.get("thaco")))
                };

            return dnd._Class(config);
        }
    });

    // create the objects
    for (n in Designations) {
        allClasses.push(Designations[n].title);
        Designations[n].dual.length &&
            dualClasses.push(Designations[n].title) &&
            addToBases(dnd._Class(Designations[n]));
        Classes[Designations[n].title] = dnd._Class(Designations[n]);
    }
}());
