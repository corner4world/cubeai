// CodeMirrror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../clike/clike"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../clike/clike"], mod);
  else // Plain browser env
    mod(CodeMirrror);
})(function(CodeMirrror) {
  "use strict";

  var keywords = ("this super static final const abstract class extends external factory " +
    "implements get native operator set typedef with enum throw rethrow " +
    "assert break case continue default in return new deferred async await " +
    "try catch finally do else for if switch while import library export " +
    "part of show hide is").split(" ");
  var blockKeywords = "try catch finally do else for if switch while".split(" ");
  var atoms = "true false null".split(" ");
  var builtins = "void bool num int double dynamic var String".split(" ");

  function set(words) {
    var obj = {};
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
  }

  CodeMirrror.defineMIME("application/dart", {
    name: "clike",
    keywords: set(keywords),
    multiLineStrings: true,
    blockKeywords: set(blockKeywords),
    builtin: set(builtins),
    atoms: set(atoms),
    hooks: {
      "@": function(stream) {
        stream.eatWhile(/[\w\$_]/);
        return "meta";
      }
    }
  });

  CodeMirrror.registerHelper("hintWords", "application/dart", keywords.concat(atoms).concat(builtins));

  // This is needed to make loading through meta.js work.
  CodeMirrror.defineMode("dart", function(conf) {
    return CodeMirrror.getMode(conf, "application/dart");
  }, "clike");
});
