/*jshint laxcomma:true*/
/*global define*/

define([      "Collection", "Station"
  ], function (Collection,   Station) {
  "use strict";

  return new Collection([
       {name: "Champion", dice: 6, min: 7}
      ,{name: "Hero"    , dice: 4, min: 4}
      ,{name: "Player"  , dice: 3, min: 7}
      ,{name: "npc"     , dice: 3, min: 4}
      ,{name: "Pleb"    , dice: 3, min: 3}
    ].map(Station));
});