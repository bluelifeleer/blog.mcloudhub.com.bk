'use strict';

var ctr_token = require('./ctr_token');

function Salt() {
    var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

    var tmp = '',
        i = 0,
        token = ctr_token();
    for (i; i < num; i++) {
        tmp += token.substr(Math.random() * num, 1);
    }
    return tmp;
}

module.exports = Salt;
//# sourceMappingURL=salt.js.map