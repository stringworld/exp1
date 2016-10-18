var Mock = require('mockjs');
var data = function() {
    return Mock.mock([{
        'tableTitle': ['选择', '编号', '电话号码', '姓名', '地址', '居委', '签约医院', '签约医生'],
        'rowCollection|1-100': [
            { 'isSelected|1': false, 'taskId|+1': 1, 'numId|+1': 800, 'numTel': '021-8888888', 'userName': '@name', 'address': '上海市', 'committee': '虹口居委会', 'signHos': '上海市长海医院', 'signDoc': '@name' }
        ]
    }]);
}
module.exports = data;