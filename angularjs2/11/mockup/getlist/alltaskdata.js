var Mock = require('mockjs');
var data = function() {
    return Mock.mock([{
        'tableTitle': ['选择', '编号', '电话号码', '姓名', '地区', '居委', '签约医院', '签约医生', '详情'],
        'rowCollection|1-100': [
            { 'isSelected|1': false, 'numId|+1': 900, 'numTel': '021-9999999', 'userName': '@name', 'address': '上海市', 'committee': '杨浦居委会', 'signHos': '上海市长海医院', 'signDoc': '@name', 'details': 'http://www.baidu.com/' }
        ]
    }]);
}
module.exports = data;