/*(function () {
    var priv = {
            roll: function (num, faces) {
                if (faces === undefined) {
                    faces = num;
                    num = 1;
                }
                var result = [];
                while (num--) {
                    result.push(parseInt(Math.random() * faces, 10) + 1);
                }
                return result;
            }
        },
        pub = window.dnd = {
            roll: function () {
                return priv.roll.apply(null, arguments);
            }
        };
}());