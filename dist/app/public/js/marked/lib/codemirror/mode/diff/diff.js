"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) == "object") // CommonJS
    mod(require("../../lib/codemirror"));else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  CodeMirror.defineMode("diff", function () {

    var TOKEN_NAMES = {
      '+': 'positive',
      '-': 'negative',
      '@': 'meta'
    };

    return {
      token: function token(stream) {
        var tw_pos = stream.string.search(/[\t ]+?$/);

        if (!stream.sol() || tw_pos === 0) {
          stream.skipToEnd();
          return ("error " + (TOKEN_NAMES[stream.string.charAt(0)] || '')).replace(/ $/, '');
        }

        var token_name = TOKEN_NAMES[stream.peek()] || stream.skipToEnd();

        if (tw_pos === -1) {
          stream.skipToEnd();
        } else {
          stream.pos = tw_pos;
        }

        return token_name;
      }
    };
  });

  CodeMirror.defineMIME("text/x-diff", "diff");
});
//# sourceMappingURL=diff.js.map