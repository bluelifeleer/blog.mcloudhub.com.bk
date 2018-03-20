const ctr_token = require('./ctr_token');

function Salt(num = 8) {
    let tmp = '',
        i = 0,
        token = ctr_token();
    for (i; i < num; i++) {
        tmp += token.substr(Math.random() * num, 1);
    }
    return tmp;
}

module.exports = Salt;