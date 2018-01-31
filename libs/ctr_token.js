const md5 = require('md5');
function Ctr_token(){
    let MyDate = new Date();
    let timer = MyDate.getTime();
    return md5(timer);
}

module.exports = Ctr_token;

