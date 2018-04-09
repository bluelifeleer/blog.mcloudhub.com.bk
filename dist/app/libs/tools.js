"use strict";

function Tools() {}
Tools.prototype.in_array = function (params, array) {
    var BF = false;
    for (i = 0; i < array.length; i++) {
        if (array[i].id == params) {
            BF = true;
            continue;
        }
    }
    return BF;
};
module.exports = new Tools();
//# sourceMappingURL=tools.js.map