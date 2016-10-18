var Mock = require('mockjs');
var data = function() {
    return Mock.mock([{
        'tableTitle': ['选择', '编号', '电话号码', '姓名', '地址', '电话', '居委', '签约医院', '签约医生', '详情'],
        'rowCollection|1-100': [
            { 'isSelected|1': false, 'taskId|+1': 1, 'numId|+1': 700, 'numTel': '021-7777777', 'userName': '@name', 'address': '上海市', 'committee': '浦东居委会', 'callTel': '打电话', 'signHos': '上海市长海医院', 'signDoc': '@name', 'details': 'http://www.baidu.com/' }
        ]
    }]);
}
module.exports = data;