"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../javascript/javascript"));else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../javascript/javascript"], mod);else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  CodeMirror.defineMode("pegjs", function (config) {
    var jsMode = CodeMirror.getMode(config, "javascript");

    function identifier(stream) {
      return stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    }

    return {
      startState: function startState() {
        return {
          inString: false,
          stringType: null,
          inComment: false,
          inChracterClass: false,
          braced: 0,
          lhs: true,
          localState: null
        };
      },
      token: function token(stream, state) {
        if (stream)

          //check for state changes
          if (!state.inString && !state.inComment && (stream.peek() == '"' || stream.peek() == "'")) {
            state.stringType = stream.peek();
            stream.next(); // Skip quote
            state.inString = true; // Update state
          }
        if (!state.inString && !state.inComment && stream.match(/^\/\*/)) {
          state.inComment = true;
        }

        //return state
        if (state.inString) {
          while (state.inString && !stream.eol()) {
            if (stream.peek() === state.stringType) {
              stream.next(); // Skip quote
              state.inString = false; // Clear flag
            } else if (stream.peek() === '\\') {
              stream.next();
              stream.next();
            } else {
              stream.match(/^.[^\\\"\']*/);
            }
          }
          return state.lhs ? "property string" : "string"; // Token style
        } else if (state.inComment) {
          while (state.inComment && !stream.eol()) {
            if (stream.match(/\*\//)) {
              state.inComment = false; // Clear flag
            } else {
              stream.match(/^.[^\*]*/);
            }
          }
          return "comment";
        } else if (state.inChracterClass) {
          while (state.inChracterClass && !stream.eol()) {
            if (!(stream.match(/^[^\]\\]+/) || stream.match(/^\\./))) {
              state.inChracterClass = false;
            }
          }
        } else if (stream.peek() === '[') {
          stream.next();
          state.inChracterClass = true;
          return 'bracket';
        } else if (stream.match(/^\/\//)) {
          stream.skipToEnd();
          return "comment";
        } else if (state.braced || stream.peek() === '{') {
          if (state.localState === null) {
            state.localState = jsMode.startState();
          }
          var token = jsMode.token(stream, state.localState);
          var text = stream.current();
          if (!token) {
            for (var i = 0; i < text.length; i++) {
              if (text[i] === '{') {
                state.braced++;
              } else if (text[i] === '}') {
                state.braced--;
              }
            };
          }
          return token;
        } else if (identifier(stream)) {
          if (stream.peek() === ':') {
            return 'variable';
          }
          return 'variable-2';
        } else if (['[', ']', '(', ')'].indexOf(stream.peek()) != -1) {
          stream.next();
          return 'bracket';
        } else if (!stream.eatSpace()) {
          stream.next();
        }
        return null;
      }
    };
  }, "javascript");
});
//# sourceMappingURL=pegjs.js.map