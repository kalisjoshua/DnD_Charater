//// ui.js

dnd.ui = (function () {
    var ui = {
         // check to see what fields are complete before attempting to render a player to the page
         changed: function (event) {
            var entered_stats;

            if (ui.race.val() && ui.alpha.val() && ui.level.val()) {
                ui.caste.
                    parent().
                        show();

                entered_stats = ui.stats.serialize().match(/\d+/g);

                if (entered_stats && entered_stats.length === 7) {
                    ui.update(Player({
                         age    : 1
                        ,caste  : Castes.is(ui.caste.val())
                        ,height : 1
                        ,job    : Classes.merge(ui.alpha.val(), ui.beta.val())
                        ,level  : ui.level.val()
                        ,name   : ui.name.val()
                        ,race   : Races.is(ui.race.val())
                        ,stats  : stats(entered_stats, true)
                        ,title  : ""
                        ,weight : 1
                    }));
                }
            }
        }

        // add the values to the select-lists and add behaviors for updating
        ,setup: function () {
            var selectList = function (node) {
                    return $("<option/>", {
                         text: node
                        ,value: node
                    })[0];
                }

                updateBeta = function () {
                    var a = ui.alpha.val()
                        ,selected = ui.beta.val()
                        ,subs = ui.strict.is(":checked") ? Classes.is(ui.alpha.val()).dual : Classes.names();

                    if (!ui.strict.is(":checked") || (ui.strict.is(":checked") && Classes.is(ui.alpha.val()).dual.length)) {
                        subs = subs.
                            filter(function (node) {
                                return node !== a;
                            });

                        ui.beta.
                            empty().
                            append("<option value=\"\"></option>").
                            append(subs.map(selectList)).
                            val(selected).
                            show();
                    } else {
                        ui.beta.
                            hide().
                            val("");
                    }
                };

            this.alpha = $("#alpha");
            this.beta = $("#beta");
            this.builder = $("#builder");
            this.caste = $("#caste").parent().hide().end();
            this.detail = $("#detail");
            this.generated_stats = $("#generated_stats").parent().hide().end();
            this.level = $("#level");
            this.name = $("#name");
            this.race = $("#race");
            this.stats = $("#abilities").find("input");
            this.strict = $("#strictDual");

            $("input[disabled]").
                addClass("disabled");

            $().
                add(this.alpha).
                add(this.beta).
                add(this.caste).
                add(this.race).
                add(this.stats).
                add(this.strict).
                change(this.changed);

            $().
                add(this.level).
                keyup(this.changed);

            this.alpha.
                append(Classes.names().map(selectList)).
                change(updateBeta);

            this.beta.
                hide();

            this.caste.
                append(Castes.names().map(selectList)).
                change(function () {
                    console.log(Castes.is(ui.caste.val()).column());
                });

            this.race.
                append(Races.names().map(selectList));

            this.strict.
                change(updateBeta);
        }

        // valid player information is in the form show the results to the user
        ,update: function (pc) {
            console.clear();
            console.log(pc);

            // $("#thaco").val(pc.Designation.thaco[pc.level]);
            // $("#move").val(pc.Race.move);

            // $.each($("#saves").find("input"), function (indx, obj) {
            //     obj.value = pc.Designation.saves[pc.level][indx] + pc.Race.statModifiers[indx];
            // });
        }
    };

    return ui;
}());