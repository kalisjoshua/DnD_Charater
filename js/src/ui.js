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

    ui.changed = function (event) {
        // event.preventDefault();
        $(this).trigger("updateField");

        var pc = Player({
            alpha: Reference.Designations[ui.elements.alpha.val()],
            beta: Reference.Designations[ui.elements.beta.val()],
            level: ui.elements.level.val(),
            name: ui.elements.name.val(),
            Race: Reference.Races[ui.elements.race.val()]
        });

        pc.valid && ui.update(pc);
    };

    ui.setup = function () {

        ui.elements = {
            alpha: $("#alpha"),
            beta: $("#beta"),
            builder: $("#builder"),
            caste: $("#caste").parent().hide().end(),
            detail: $("#detail"),
            generated_stats: $("#generated_stats").parent().hide().end(),
            level: $("#level"),
            name: $("#name"),
            race: $("#race"),
            stats: $("#abilities").find("input"),
            strict: $("#strictDual")
        };

        $("input[disabled]").
            addClass("disabled");

        $().
            add(ui.elements.alpha).
            add(ui.elements.beta).
            add(ui.elements.caste).
            add(ui.elements.race).
            add(ui.elements.stats).
            add(ui.elements.strict).
            change(ui.changed);

        $().
            add(ui.elements.level).
            keyup(ui.changed);

        ui.elements.alpha.
            append(ui.Designations.all).
            bind("updateField", function () {
                // hide/show secondary class select list based on primary class selection
                if ((ui.elements.strict.is(":checked") && Reference.Designations[this.value].dual) || (!ui.elements.strict.is(":checked") && this.value !== "")) {
                    ui.elements.beta.
                        show();
                } else {
                    ui.elements.beta.
                        hide().
                        val("");
                }

                if(ui.elements.alpha.val() === ui.elements.beta.val()) {
                    ui.elements.beta.val("");
                }
            });
        
        // add null option from beta select box to designations lists since the alpha list is static
        Array.prototype.unshift.call(ui.Designations.dual, ui.elements.beta.children().first().clone()[0]);
        Array.prototype.unshift.call(ui.Designations.all, ui.elements.beta.children().first().clone()[0]);

        ui.elements.beta.
            bind("updateField", function () {
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
            append(ui.Caste.clone());

        ui.elements.race.
            append(ui.Races.clone());

        ui.elements.strict.
            bind("updateField", function () {
                var selected = ui.elements.beta.val(),
                    strict = ui.elements.strict.is(":checked");

                ui.elements.beta.
                    empty().
                    append(strict ? ui.Designations.dual.clone() : ui.Designations.all.clone());
                
                if (!strict && !ui.elements.alpha.val() || 
                    strict && !(Reference.Designations[ui.elements.alpha.val()] || {}).dual
                ) {
                    ui.elements.beta.
                        hide();
                } else {
                    ui.elements.beta.
                        show();
                }
                
                ui.elements.beta.val(selected);
            });
    };

    ui.update = function (pc) {
        console.clear();
        console.log(pc);

        $("#thaco").val(pc.Designation.thaco[pc.level]);
        $("#move").val(pc.Race.move);

        $.each($("#saves").find("input"), function (indx, obj) {
            obj.value = pc.Designation.saves[pc.level][indx] + pc.Race.statModifiers[indx];
        });
    };

    return ui;
}());