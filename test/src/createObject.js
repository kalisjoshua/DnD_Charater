module("createObject.js");

(function () {
    createObject((function () {return this;}()), "Person", $.extend);
    var _ = {param: "setup", other: [1,2,3,4], deep: {title: "string"}},
        a =     Person(_),
        b =     Person(_),
        c = new Person(_),
        d = new Person(_),
        param = "param",
        temp = "";

    test("Objects created with the same configuration variable have the same information but are not linked to each other", function () {
        ok(a);
        temp = "apple";
        equal(a.set(param, temp), temp, "value passed in should be returned");
        notEqual(a.get(param), b.get(param), "value changed on a does not effect b | " + a.get(param) + ", " + b.get(param));
        notEqual(a.get(param), c.get(param), "value changed on a does not effect c | " + a.get(param) + ", " + c.get(param));
        notEqual(a.get(param), d.get(param), "value changed on a does not effect d | " + a.get(param) + ", " + d.get(param));

        raises(function () {
            a.set(param);
        }, Error, "not enough parameters passed into .set() - throw an error to help with bug tracking");
        raises(function () {
            a.get();
        }, Error, "member identifier not passed into .get() - throw an error to help with bug tracking");
        
        temp = "bananna";
        a.state()[param] = temp;
        notEqual(a.get(param), temp, "object returned by .state() returns a copy and not the actual state of the object | " + a.get(param) + ", " + temp);
        
        ok(b);
        temp = "boat";
        equal(b.set(param, temp), temp, "value passed in should be returned");
        notEqual(b.get(param), a.get(param), "value changed on b does not effect a | " + b.get(param) + ", " + a.get(param));
        notEqual(b.get(param), c.get(param), "value changed on b does not effect c | " + b.get(param) + ", " + c.get(param));
        notEqual(b.get(param), d.get(param), "value changed on b does not effect d | " + b.get(param) + ", " + d.get(param));

        ok(c);
        temp = "cat";
        equal(c.set(param, temp), temp, "value passed in should be returned");
        notEqual(c.get(param), a.get(param), "value changed on c does not effect a | " + c.get(param) + ", " + a.get(param));
        notEqual(c.get(param), b.get(param), "value changed on c does not effect b | " + c.get(param) + ", " + b.get(param));
        notEqual(c.get(param), d.get(param), "value changed on c does not effect d | " + c.get(param) + ", " + d.get(param));

        ok(d);
        temp = "dog";
        equal(d.set(param, temp), temp, "value passed in should be returned");
        notEqual(d.get(param), a.get(param), "value changed on d does not effect a | " + d.get(param) + ", " + a.get(param));
        notEqual(d.get(param), b.get(param), "value changed on d does not effect b | " + d.get(param) + ", " + b.get(param));
        notEqual(d.get(param), c.get(param), "value changed on d does not effect c | " + d.get(param) + ", " + c.get(param));
    });

    test("Cloned objects are truely separate: cloned object initialized WITHOUT 'new' keyword", function () {
        c = a.clone();

        ok(c);
        temp = "sheep";
        equal(c.set(param, temp), temp, "value passed in should be returned");
        notEqual(c.get(param), a.get(param), "value changed on c does not effect a | " + c.get(param) + ", " + a.get(param));
        notEqual(c.get(param), b.get(param), "value changed on c does not effect b | " + c.get(param) + ", " + b.get(param));
        notEqual(c.get(param), d.get(param), "value changed on c does not effect d | " + c.get(param) + ", " + d.get(param));
    });

    test("Cloned objects are truely separate: cloned object initialized WITH 'new' keyword", function () {
        b = d.clone();

        ok(b);
        temp = "cow";
        equal(b.set(param, temp), temp, "value passed in should be returned");
        notEqual(b.get(param), a.get(param), "value changed on b does not effect a | " + b.get(param) + ", " + a.get(param));
        notEqual(b.get(param), c.get(param), "value changed on b does not effect c | " + b.get(param) + ", " + c.get(param));
        notEqual(b.get(param), d.get(param), "value changed on b does not effect d | " + b.get(param) + ", " + d.get(param));
    });

    test("(object).extend({...})", function () {
        _ = {
            first: "Joshua",
            last: "Kalis"
        }
        var z = new Person(_);
        
        z.extend({
            firstName: function () {
                return this.get("first") || "(none given)";
            },
            fullName: function () {
                return this.firstName() + " " + this.lastName();
            },
            lastName: function () {
                return this.get("last") || "(none given)";
            },
            toString: function () {
                return this.lastName() + ", " + this.firstName();
            }
        });

        ok(z);
        ok(z.firstName && z.lastName && z.fullName && z.toString, "functions added with extend should be valid | .firstName(), .lastName(), .fullName(), .toString()");
        equal(_.first, z.firstName(), "retrieved value should match initialized value: first | " + _.first + ", " + z.firstName());
        equal(_.last, z.lastName(), "retrieved value should match initialized value: last | " + _.first + ", " + z.lastName());
    });

    test("(object).extend({...})", function () {
        _ = {
            first: "Joshua",
            last: "Kalis"
        }
        var z = new Person(_, {
            firstName: function () {
                return this.get("first") || "(none given)";
            },
            fullName: function () {
                return this.firstName() + " " + this.lastName();
            },
            lastName: function () {
                return this.get("last") || "(none given)";
            },
            toString: function () {
                return this.lastName() + ", " + this.firstName();
            }
        });

        ok(z);
        ok(z.firstName && z.lastName && z.fullName && z.toString, "functions added with extend should be valid | .firstName(), .lastName(), .fullName(), .toString()");
        equal(_.first, z.firstName(), "retrieved value should match initialized value: first | " + _.first + ", " + z.firstName());
        equal(_.last, z.lastName(), "retrieved value should match initialized value: last | " + _.first + ", " + z.lastName());
    });

    test("(object).extend({...})", function () {
        Person.extend({
            hack: function () {
                return this.get("first");
            }
        });

        var x = Person(_);
        ok(x);
        x.hack();
    });
}());