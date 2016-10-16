var Mock = require('mockjs');
var data = function () {
    return Mock.mock({
        "isSuccess": true,
        "errorMessage":{}
    })
}
module.exports = data;