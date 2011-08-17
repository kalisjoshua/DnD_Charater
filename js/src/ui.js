//// ui.js

var UI = (function () {
    var ui = {
            Caste: $(),

            Designations: {
                all: $(),
                dual: $()
            },

            elements: {},

            Races: $()
        };

    $.each(Util.Caste, function (key, value) {
        var node = $("<option/>", {
                text: key,
                value: key
            });
        ui.Caste.push(node.clone()[0]);
    });

    $.each(Reference.Designations, function () {
        var node = $("<option/>", {
                text: this.title,
                value: this.title
            });
        ui.Designations.all.push(node.clone()[0]);
        this.dual && ui.Designations.dual.push(node.clone()[0]);
    });

    $.each(Reference.Races, function () {
        var node = $("<option/>", {
                text: this.raceName,
                value: this.raceName
            });
        ui.Races.push(node.clone()[0]);
    });

    ui.changed = function () {
        console.log("attempt player build");
    };

    ui.setup = function () {

        ui.elements = {
            alpha: $("#alpha"),
            beta: $("#beta"),
            builder: $("#builder"),
            caste: $("#caste"),
            detail: $("#detail"),
            race: $("#race"),
            stats: $("#stats").parent().hide().end(),
            strict: $("#strictDual")
        };

        $().
            add(ui.elements.alpha).
            add(ui.elements.beta).
            add(ui.elements.caste).
            add(ui.elements.race).
            add(ui.elements.strict).
            change(ui.changed);

        ui.elements.alpha.
            append(ui.Designations.all).
            change(function () {
                // hide/show secondary class select list based on primary class selection
                if ((ui.elements.strict.is(":checked") && Reference.Designations[this.value].dual) || (!ui.elements.strict.is(":checked") && this.value !== "")) {
                    ui.elements.beta.
                        show();
                } else {
                    ui.elements.beta.
                        hide().
                        val("");
                }
            });
        
        // add null option from beta select box to designations lists since the alpha list is static
        Array.prototype.unshift.call(ui.Designations.dual, ui.elements.beta.children().first().clone()[0]);
        Array.prototype.unshift.call(ui.Designations.all, ui.elements.beta.children().first().clone()[0]);

        ui.elements.beta.
            change(function () {
                if (ui.elements.alpha.val() === ui.elements.beta.val()) {
                    ui.elements.beta.val("");
                }
            }).
            children().
                remove().
                end().
            append(ui.elements.strict.is(":checked") ? ui.Designations.dual.clone() : ui.Designations.all.clone()).
            hide();

        ui.elements.caste.
            append(ui.Caste.clone()).
            change(function () {

            });

        ui.elements.race.
            append(ui.Races.clone()).
            change(function () {

            });

        ui.elements.strict.
            change(function () {
                var selected = ui.elements.beta.val(),
                    strict = ui.elements.strict.is(":checked");

                ui.elements.beta.
                    empty().
                    append(strict ? ui.Designations.dual.clone() : ui.Designations.all.clone());
                
                if (strict && !(Reference.Designations[ui.elements.alpha.val()] || {}).dual) {
                    ui.elements.beta.
                        hide();
                } else {
                    ui.elements.beta.
                        show();
                }
                
                ui.elements.beta.val(selected);
            });
    };

    return ui;
}());