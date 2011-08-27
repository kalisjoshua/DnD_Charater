//// ui.js

dnd.ui = (function () {
    var ui = {
         changed: function (event) {
            $(this).trigger("updateField");

            var pc = Player({
                // alpha: Reference.Designations[ui.alpha.val()],
                // beta: Reference.Designations[ui.beta.val()],
                // level: ui.level.val(),
                // name: ui.name.val(),
                // Race: Reference.Races[ui.race.val()]
            });

            pc.valid && ui.update(pc);
        }

        ,setup: function () {
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
                add(ui.alpha).
                add(ui.beta).
                add(ui.caste).
                add(ui.race).
                add(ui.stats).
                add(ui.strict).
                change(ui.changed);

            $().
                add(ui.level).
                keyup(ui.changed);

            // this.alpha.
            //     append(ui.Designations.all).
            //     bind("updateField", function () {
            //         // hide/show secondary class select list based on primary class selection
            //         if ((ui.strict.is(":checked") && Reference.Designations[this.value].dual) || (!ui.strict.is(":checked") && this.value !== "")) {
            //             ui.beta.
            //                 show();
            //         } else {
            //             ui.beta.
            //                 hide().
            //                 val("");
            //         }

            //         if(ui.alpha.val() === ui.beta.val()) {
            //             ui.beta.val("");
            //         }
            //     });
            
            // add null option from beta select box to designations lists since the alpha list is static
            // Array.prototype.unshift.call(ui.Designations.dual, ui.beta.children().first().clone()[0]);
            // Array.prototype.unshift.call(ui.Designations.all, ui.beta.children().first().clone()[0]);

            // ui.beta.
            //     bind("updateField", function () {
            //         if (ui.alpha.val() === ui.beta.val()) {
            //             ui.beta.val("");
            //         }
            //     }).
            //     children().
            //         remove().
            //         end().
            //     append(ui.strict.is(":checked") ? ui.Designations.dual.clone() : ui.Designations.all.clone()).
            //     hide();

            // ui.caste.
            //     append(ui.Caste.clone());

            // ui.race.
            //     append(ui.Races.clone());

            // ui.strict.
            //     bind("updateField", function () {
            //         var selected = ui.beta.val(),
            //             strict = ui.strict.is(":checked");

            //         ui.beta.
            //             empty().
            //             append(strict ? ui.Designations.dual.clone() : ui.Designations.all.clone());
                    
            //         if (!strict && !ui.alpha.val() || 
            //             strict && !(Reference.Designations[ui.alpha.val()] || {}).dual
            //         ) {
            //             ui.beta.
            //                 hide();
            //         } else {
            //             ui.beta.
            //                 show();
            //         }
                    
            //         ui.beta.val(selected);
            //     });
        }

        ,update: function (pc) {
            console.clear();
            console.log(pc);

            $("#thaco").val(pc.Designation.thaco[pc.level]);
            $("#move").val(pc.Race.move);

            $.each($("#saves").find("input"), function (indx, obj) {
                obj.value = pc.Designation.saves[pc.level][indx] + pc.Race.statModifiers[indx];
            });
        }
    };

    return ui;
}());