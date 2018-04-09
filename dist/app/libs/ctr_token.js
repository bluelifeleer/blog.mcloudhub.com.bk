'use strict';

var md5 = require('md5');

function Ctr_token() {
    var MyDate = new Date();
    var timer = MyDate.getTime();
    return md5(timer);
}

module.exports = Ctr_token;
//# sourceMappingURL=ctr_token.js.map