var Mock = require('mockjs');
var data = function () {
    return Mock.mock({
        "isSuccess": false,
        "errorMessage":{'dgjoh'}
    })
}
module.exports = data;