var Mock = require('mockjs');
var data = function () {
    return Mock.mock({
        "isSuccess": false,
        "errorMessage":{'message':'dsgjdogh'}
    })
}
module.exports = data;