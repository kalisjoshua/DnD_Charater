//// ui.js

var UI = {
    form_wireup: function () {
        $(document).change(function () {
                // if all options are filled build the player's character
            });
        
        $("#classPrimary").change(function () {
                var secondary = {},
                    selected = $(this).val();
            
                prv.player.setClass(prv.classes[selected]);
                $("#classSecondary").empty();
            
                if (prv.classes[selected].dual) {
                    secondary = $("#classSecondary").append($("<option />"));
                
                    $.each(prv.classes, function (k, v) {
                        if (v.dual && k !== selected) {
                            secondary.
                                append($("<option />").
                                attr("value", k).
                                text(k));
                        }
                    });
                }
                else {
                    $("#classSecondary").
                        append($("<option />").
                            text("cannot dual class"));
                }
            });
        
        $("#classSecondary").change(function () {
                var selected = $(this).val();
            
                prv.player.setClass(prv.dualClass(prv.classes[$("#classPrimary").val()], prv.classes[selected]));
            });
        
        $("#race").change(function (e) {
                prv.player.setRace($(this).val());
            });
        
    },
    
    init: function () {
        var builder = $("#builder"),
            details = $("#detail"),
            node = {};
        
        // primary class select box
        node = $("#classPrimary");
        $.each(prv.classes, function (k, v) {
                node.append($("<option />").
                    attr("value", k).
                    text(k));
            });
        
        // race select box
        node = $("#race");
        $.each(prv.races, function (k, v) {
                node.append($("<option />").
                    attr("value", k).
                    text(k));
            });
        
        $("#level").val(1);
        $("#stats").val("");
        $("#strictDual").select();
        
        // links for generating stats
        node = $("#stats").parent()
        $.each(prv.util.echelons, function (k, v) {
            node.append($("<a></a>").
                attr("href", "#").
                addClass("echelons").
                click(function (event) {
                    event.preventDefault();
                    prv.player.obj.rawStats = $("#stats").val(prv.util.stats(k)).val();
                    this.blur();
                }).
                text(k));
        });
        
        prv.ui.form_wireup();
    }
};

