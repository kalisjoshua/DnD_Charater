//// ui.js

dnd.ui = (function () {
    var ui = {
         // check to see what fields are complete before attempting to render a player to the page
         changed: function (event) {
            var character_stats;

            if (ui.race.val() && ui.alpha.val() && ui.level.val()) {
                ui.caste.
                    show();

                character_stats = ui.stats
                    .serialize()
                    .match(/\d+/g);

                if (character_stats && character_stats.length === 7) {
                    character_stats = character_stats
                        .map(function (node, indx) {
                            return ~~node;
                        });

                    ui.update(Player({
                        "age"     : 1
                        ,"caste"  : Castes.is(ui.caste.find(":checked").val()) || "Player"
                        ,"height" : 1
                        ,"job"    : Classes.merge(ui.alpha.val(), ui.beta.val())
                        ,"level"  : ui.level.val() || 1
                        ,"name"   : ui.name.val()
                        ,"race"   : Races.is(ui.race.val())
                        ,"stats"  : stats(character_stats)
                        ,"title"  : ""
                        ,"weight" : 1
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

            this.alpha  = $("#alpha");
            this.beta   = $("#beta");
            this.caste  = $("#caste")//.hide();
            this.detail = $("#detail");
            this.level  = $("#level");
            this.name   = $("#name");
            this.race   = $("#race");
            this.stats  = $("#abilities").find("input");
            this.strict = $("#strictDual");

            $("input[disabled]")
                .addClass("disabled");

            $()
                .add(this.alpha)
                .add(this.beta)
                .add(this.caste)
                .add(this.race)
                .add(this.stats)
                .add(this.strict)
                .change(this.changed);

            $()
                .add(this.level)
                .keyup(this.changed);

            this.alpha
                .append(Classes.names().map(selectList))
                .change(updateBeta)
                .val("Fighter");

            this.beta
                .hide();

            this.caste
                .append(Castes.names().map(function (node) {
                    return $("<div/>")
                        .append($("<input/>", {
                            "id": "caste-" + node
                            ,"name": "caste"
                            ,"type": "radio"
                            ,"value": node
                        }))
                        .append($("<label/>", {
                            "for": "caste-" + node
                            ,"class": "labels"
                            ,"text": node
                        }))
                        .click(function (event) {
                            var caste = $(event.target)
                                ,gen;

                            if (caste.attr("name") === "caste"
                                && ui.race.val()
                                && ui.alpha.val()
                                && ui.level.val()
                            ) {
                                gen = stats(Castes.is(caste.val()).column(), Classes.merge(ui.alpha.val(), ui.beta.val()).prefs);
                                ui.stats
                                    .each(function (indx, node) {
                                        this.value = gen[indx];
                                    })
                            }
                        })[0];
                }));

            this.race
                .append(Races.names().map(selectList))
                .val("Human");

            this.strict
                .change(updateBeta);
        }

        // valid player information is in the form show the results to the user
        ,update: function (pc) {
            pc.hp();
        }
    };

    return ui;
}());