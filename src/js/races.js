/*jshint laxcomma:true*/
/*global define*/

define([      "Collection", "Race"
  ], function (Collection,   Race) {
  "use strict";

  function pickLanguages (languages, ar) {

    return [languages[~~ar.shift()]]
      .concat(!ar.length ? [] : pickLanguages(languages, ar));
  }

  var list
    , languages = [
        // standard languages
          "burrowing mammal"
        , "dwarven"
        , "elvish"
        , "gnoll"
        , "gnome"
        , "goblin"
        , "halfling"
        , "hobgoblin"
        , "kobold"
        , "orcish"
        , "common"
      ]

    , racesConfigs =  [
        {
            name        : "Dwarf"
          , infravision : 60
          , languages   : pickLanguages(languages, [4, 5, 8, 9])
          , move        : 6
          , notes       : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
          , saves       : [1, 0, 1, 0, 1]
          , stats       : [0, 0, 0, 0, 1, -1, 0]
          , thieving    : [0, 10, 15, 0, 0, 0, -10, -5]
        }

        , {
            name        : "Elf"
          , infravision : 60
          , languages   : pickLanguages(languages, [3, 4, 5, 6, 7, 9])
          , move        : 12
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [0, 0, 0, 1, -1, 0, 0]
          , thieving    : [5, -5, 0, 5, 10, 5, 0, 0]
        }

        , {
            name        : "Gnome"
          , infravision : 60
          , languages   : pickLanguages(languages, [0, 1, 6, 5, 8])
          , move        : 6
          , notes       : "+1 on saves(rsw, sp) for each 3 1/2 of con"
          , saves       : [0, 0, 1, 0, 1]
          , stats       : [-1, 0, 0, 1, 0, 0, 0]
          , thieving    : [0, 5, 10, 5, 5, 10, 15, 0]
        }

        , {
            name        : "Goblin"
          , infravision : 30
          , languages   : pickLanguages(languages, [1, 3, 7, 8])
          , move        : 8
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [-1, 1, 0, 1, 0, -1, 0]
          , thieving    : [ 0, 15, 10, 0, 0, 15, 0, 15]
        }

        , {
            name        : "Half-Elf"
          , infravision : 60
          , languages   : pickLanguages(languages, [3, 4, 5, 6, 7, 9])
          , move        : 12
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [0, 0, 0, 0, 0, 0, 0]
          , thieving    : [10, 0, 0, 5, 0, 0, 0, 0]
        }

        , {
            name        : "Half-Orc"
          , infravision : 60
          , languages   : pickLanguages(languages, [9])
          , move        : 12
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [1, 0, 0, 0, 1, -1, 0]
          , thieving    : [ -5, 5, 5, 0, 0, 5, 5, -10]
        }

        , {
            name        : "Halfling"
          , infravision : 30
          , languages   : pickLanguages(languages, [1, 2, 4, 5, 9])
          , move        : 6
          , notes       : "+1 on saves(rsw, sp, poison) for each 3 1/2 of con"
          , saves       : [1, 0, 1, 0, 1]
          , stats       : [-1, 0, 0, 1, 0, 0, 0]
          , thieving    : [ 5, 5, 5, 10, 15, 5, -15, -5]
        }

        , {
            name        : "Human"
          , infravision : 0
          , languages   : pickLanguages(languages, [10])
          , move        : 12
          , notes       : ""
          , saves       : [0, 0, 0, 0, 0]
          , stats       : [0, 0, 0, 0, 0, 0, 0]
          , thieving    : [0, 0, 0, 0, 0, 0, 0, 0]
        }
      ];

  list = new Collection(racesConfigs.map(Race));

  list.languages = languages.slice(0);

  return list;
});