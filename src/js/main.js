/*jshint laxcomma:true*/
/*global require define*/

require.config({
  basePath: "js"
  ,paths: {
    jquery        : ["//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min", "lib/jquery"]
    // ,handlebars   : "lib/handlebars"
  }
  // ,shim: {
  //   handlebars: {
  //     exports: "handlebars"
  //   }
  // }
});

// ready the UI
require(["ui_builder"]);
require(["ui_detail"]);