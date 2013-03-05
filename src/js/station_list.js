/*jshint laxcomma:true*/
/*global define*/

define([      "Collection", "Station"
  ], function (Collection,   Station) {
  "use strict";

  return new Collection([
       new Station({name: "Champion", dice: 6, min: 7})
      ,new Station({name: "Hero"    , dice: 4, min: 4})
      ,new Station({name: "npc"     , dice: 3, min: 4})
      ,new Station({name: "Player"  , dice: 3, min: 7})
      ,new Station({name: "Pleb"    , dice: 3, min: 3})
    ]);
});