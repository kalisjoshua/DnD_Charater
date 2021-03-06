//// ui.js

dnd.ui = (function () {
    var ui = {
         // check to see what fields are complete before attempting to render a player to the page
         changed: function (event) {
            var _alpha
                ,_caste = ui.caste.find("input:checked").val()
                ,_job
                ,_level
                ,_race
                ,_stats;
            
            // detect if a Caste was clicked so update is only executed once
            if (event && /label/i.test(event.target.nodeName)) {
                return;
            }

            if ((_alpha = ui.alpha.val())
            && (_job    = Classes.merge(_alpha, ui.beta.val()))
            && (_level  = ui.level.val())
            && (_race   = ui.race.val())) {
                ui.caste
                    .show();

                // Detect the source of the changes:
                if (event && event.target.name === "caste") {
                    // - if the event was from the Castes then generate new stats
                    _stats = Stats(Castes.named(_caste).column(), _job.prefs);
                } else {
                    // - else use the stats in the input fields
                    _stats = ui.stats
                        .map(function (indx, node) { return ~~node.value; })
                        .filter(function (indx, node) { return node > 2; });
                    
                    _stats = _stats.length === 7
                        ? dnd.player.stats() || Stats(_stats)
                        : undefined;
                }

                if (_stats) {
                    dnd.player = Player({
                            "age"     : 1
                            ,"caste"  : _caste
                            ,"height" : 1
                            ,"job"    : _job
                            ,"level"  : _level
                            ,"name"   : ui.name.val()
                            ,"race"   : _race
                            ,"stats"  : _stats
                            ,"title"  : ""
                            ,"weight" : 1
                        });
                    
                    ui.update(dnd.player);
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

                updateBetaOptions = function () {
                    var a = ui.alpha.val()
                        ,selected = ui.beta.val()
                        ,subs = ui.strict.is(":checked")
                            ? Classes.named(ui.alpha.val()).dual
                            : Classes.getNames();

                    if (!ui.strict.is(":checked") || (ui.strict.is(":checked") && Classes.named(ui.alpha.val()).dual.length)) {
                        subs = subs
                            .filter(function (node) {
                                return node !== a;
                            });

                        ui.beta
                            .empty()
                            .append("<option value=\"\"></option>")
                            .append(subs.map(selectList))
                            .val(selected)
                            .show();
                    } else {
                        ui.beta
                            .hide()
                            .val("");
                    }
                };

            this.alpha  = $("#alpha");
            this.beta   = $("#beta");
            this.caste  = $("#caste").hide();
            this.detail = $("#detail");
            this.level  = $("#level");
            this.name   = $("#name");
            this.race   = $("#race");
            this.skills = $("#skills").find("input");
            this.stats  = $("#abilities").find("input");
            this.strict = $("#strictDual");

            $("input[disabled]")
                .addClass("disabled");

            $()
                .add(this.alpha)
                .add(this.beta)
                // .add(this.caste) // handled by click event on each Caste
                .add(this.race)
                .add(this.stats)
                .add(this.strict)
                .change(this.changed);

            $()
                .add(this.stats)
                .add(this.level)
                .keyup(function (event) {
                    // using arrow keys to decrement/increment values
                    if ((event.target.name === "level" || /stat/i.test(event.target.className)) && (event.keyCode === 38 || event.keyCode == 40)) {
                        try {
                            event.target.value = ~~event.target.value - ~~(event.keyCode - 39);
                            event.target.value = event.target.value < 0 ? 0 : event.target.value;

                            // adjust the value of the stats free from racial bonus/penelty
                            if (/stat/i.test(event.target.className) && dnd.player && dnd.player.isValid()) {
                                dnd.player.stats().set(event.target.name, dnd.player.stats().get(event.target.name) - ~~(event.keyCode - 39));
                            }
                        } catch (e) {
                            dndError({
                                args: "<invalid_value>"
                                ,fn: "[level,stat].keyup()"
                                ,level: "warn"
                            });
                        }

                        ui.changed();
                    }
                });

            this.alpha
                .append(Classes.getNames().map(selectList))
                .change(updateBetaOptions);

            this.beta
                .hide();

            this.caste
                .append(Castes.getNames().map(function (node) {
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
                        .click(ui.changed)[0];
                }));

            this.race
                .append(Races.getNames().map(selectList));

            this.strict
                .change(updateBetaOptions);
            
            ui.test();
        }

        ,test: function () {
            ui.race
                .val("Human");
            
            ui.alpha
                .val("Fighter");
            
            ui.level
                .val(3);

            ui.caste
                .show();
            // ui.changed();
        }

        // valid player information is in the form show the results to the user
        ,update: function (pc) {
            var stats = pc.stats();

            $("#HP").val(pc.hp());
            $("#move").val(pc.move());
            $("#thaco").val(pc.thaco());

            $("input", "#saves")
                .each(function (indx, node) {
                    node.value = pc.saves()[indx];
                });
            
            ui.skills
                .val(0);

            ui.stats
                .each(function (indx, node) {
                    $(node)
                        .val(+stats.get(node.name))
                            .next()
                            .html(stats.get(node.name, true));
                        
                });
        }
    };

    return ui;
}());