"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Test plugin for Editor.md
 *
 * @file        test-plugin.js
 * @author      pandao
 * @version     1.2.0
 * @updateTime  2015-03-07
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function () {

	var factory = function factory(exports) {

		var $ = jQuery; // if using module loader(Require.js/Sea.js).

		exports.testPlugin = function () {
			alert("testPlugin");
		};

		exports.fn.testPluginMethodA = function () {
			/*
   var _this       = this; // this == the current instance object of Editor.md
   var lang        = _this.lang;
   var settings    = _this.settings;
   var editor      = this.editor;
   var cursor      = cm.getCursor();
   var selection   = cm.getSelection();
   var classPrefix = this.classPrefix;
   		cm.focus();
   */
			//....

			alert("testPluginMethodA");
		};
	};

	// CommonJS/Node.js
	if (typeof require === "function" && (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") {
		module.exports = factory;
	} else if (typeof define === "function") // AMD/CMD/Sea.js
		{
			if (define.amd) {
				// for Require.js

				define(["editormd"], function (editormd) {
					factory(editormd);
				});
			} else {
				// for Sea.js
				define(function (require) {
					var editormd = require("./../../editormd");
					factory(editormd);
				});
			}
		} else {
		factory(window.editormd);
	}
})();
//# sourceMappingURL=test-plugin.js.map