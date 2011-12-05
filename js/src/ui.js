//// ui.js

dnd.ui = (function () {
    var ui = {
         // check to see what fields are complete before attempting to render a player to the page
         changed: function (event) {
            var _alpha
                ,_caste
                ,_job
                ,_level
                ,_race
                ,_stats;
            
            // detect if a Caste was clicked so update is only executed once
            if (/label/i.test(event.target.nodeName)) {
                return;
            }

            if (event.target.name === "level" && (event.keyCode === 38 || event.keyCode == 40)) {
                event.target.value = ~~event.target.value - ~~(event.keyCode - 39);
                event.target.value = event.target.value < 0 ? 0 : event.target.value;
            }

            if ((_alpha = ui.alpha.val())
            && (_caste  = ui.caste.find("input:checked").val() || "Player")
            && (_job    = Classes.merge(_alpha, ui.beta.val()))
            && (_level  = ui.level.val())
            && (_race   = ui.race.val())) {
                ui.caste
                    .show();

                // Detect the source of the changes:
                // - if the event was from the Castes then generate new stats
                // - else use the stats in the input fields
                _stats = event.target.type === "radio" && event.target.name === "caste"
                    ? ui.stats.val("") && Castes.named(_caste).column()
                    : ui.stats
                        .toArray()
                            .map(function (node, indx) { return ~~node.value; })
                            .filter(function (node, indx) { return node; });

                if (_stats && _stats.length === 7) {
                    ui.update(Player({
                        "age"     : 1
                        ,"caste"  : _caste
                        ,"height" : 1
                        ,"job"    : _job
                        ,"level"  : _level
                        ,"name"   : ui.name.val()
                        ,"race"   : _race
                        ,"stats"  : Stats(_stats, _job.prefs)
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
                // .add(this.caste) // handled by click event on each Caste
                .add(this.race)
                .add(this.stats)
                .add(this.strict)
                .change(this.changed);

            $()
                .add(this.level)
                .keyup(this.changed);

            this.alpha
                .append(Classes.getNames().map(selectList))
                .change(updateBetaOptions)
                .val("Fighter");

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
                .append(Races.getNames().map(selectList))
                .val("Human");

            this.strict
                .change(updateBetaOptions);
        }

        // valid player information is in the form show the results to the user
        ,update: function (pc) {
            var stats = pc.stats();

            $("#HP").val(pc.hp());
            $("#thaco").val(pc.thaco());

            ui.stats
                .each(function (indx, node) {
                    $(node)
                        .val(stats.get(node.name))
                            .next()
                            .html(stats.get(node.name, true));
                        
                })
        }
    };

    return ui;
}());