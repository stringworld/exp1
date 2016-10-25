var Mock = require('mockjs');
var data = function () {
    return Mock.mock({
        "isSuccess":true,
        "data":{
            "taskList":[
                {
                    "id":"编号",
                    "seatno":"坐席号",
                    "dldh":"电话号码",
                    "jmxm":"姓名",
                    "zz":"地址",
                    "szjw":"居委",
                    "xb":"性別",
                    "qyyy":"签约医院",
                    "qyysxm":"签约医生",
                    "wjid":"1",
                    "wjms":"",
                    "wjmc":"米喜问卷",
                    "problems":[
                        {
                            "tmid":"0",
                            "tmlx":"2",
                            "tmnr":"请问您对xx社区卫生服务中心满意吗",
                            "cjz":"米喜",
                            "cjsj":1474885973000,
                            "gxsj":1474885977000,
                            "sfbsy":"1",
                            "sfky":"1",
                            "options":[
                                {
                                    "xxid":"1",
                                    "tmid":"1",
                                    "xxnr":"是",
                                    "xxbz":"",
                                    "xxsx":1,
                                    "sfky":"1"
                                },
                                {
                                    "xxid":"2",
                                    "tmid":"1",
                                    "xxnr":"否",
                                    "xxbz":"",
                                    "xxsx":2,
                                    "sfky":"1"
                                }
                            ]
                        },
                        {
                            "tmid":"1",
                            "tmlx":"1",
                            "tmnr":"请问您是xx街道xx居委会",
                            "cjz":"米喜",
                            "cjsj":1474885973000,
                            "gxsj":1474885977000,
                            "sfbsy":"1",
                            "sfky":"1",
                            "options":[
                                {
                                    "xxid":"3",
                                    "tmid":"1",
                                    "xxnr":"是",
                                    "xxbz":"",
                                    "xxsx":1,
                                    "sfky":"1",
                                    "name":"committee"
                                },
                                {
                                    "xxid":"4",
                                    "tmid":"1",
                                    "xxnr":"否",
                                    "xxbz":"",
                                    "xxsx":2,
                                    "sfky":"1",
                                    "name":"committee"
                                }
                            ]
                        },
                        {
                            "tmid":"2",
                            "tmlx":"1",
                            "tmnr":"请问您有健康问题是否会优先选择家庭医生呢：",
                            "cjz":"米喜",
                            "cjsj":1474885973000,
                            "gxsj":1474885977000,
                            "sfbsy":"1",
                            "sfky":"1",
                            "options":[
                                {
                                    "xxid":"5",
                                    "tmid":"1",
                                    "xxnr":"是",
                                    "xxbz":"",
                                    "xxsx":1,
                                    "sfky":"1",
                                    "name":"priority"
                                },
                                {
                                    "xxid":"6",
                                    "tmid":"1",
                                    "xxnr":"否",
                                    "xxbz":"",
                                    "xxsx":2,
                                    "sfky":"1",
                                    "name":"priority"
                                }
                            ]
                        },
                        {
                            "tmid":"3",
                            "tmlx":"2",
                            "tmnr":"请问您对xx社区卫生服务中心满意吗",
                            "cjz":"米喜",
                            "cjsj":1474885973000,
                            "gxsj":1474885977000,
                            "sfbsy":"1",
                            "sfky":"1",
                            "options":[
                                {
                                    "xxid":"7",
                                    "tmid":"1",
                                    "xxnr":"是",
                                    "xxbz":"",
                                    "xxsx":1,
                                    "sfky":"1"
                                },
                                {
                                    "xxid":"8",
                                    "tmid":"1",
                                    "xxnr":"否",
                                    "xxbz":"",
                                    "xxsx":2,
                                    "sfky":"1"
                                }
                            ]
                        },
                        {
                            "tmid":"4",
                            "tmlx":"1",
                            "tmnr":"请问您签约医生是xx街道社区",
                            "cjz":"米喜",
                            "cjsj":1474885973000,
                            "gxsj":1474885977000,
                            "sfbsy":"1",
                            "sfky":"1",
                            "options":[
                                {
                                    "xxid":"9",
                                    "tmid":"1",
                                    "xxnr":"满意",
                                    "xxbz":"",
                                    "xxsx":1,
                                    "sfky":"1",
                                    "name":"community"
                                },
                                {
                                    "xxid":"10",
                                    "tmid":"1",
                                    "xxnr":"不满意",
                                    "xxbz":"",
                                    "xxsx":2,
                                    "sfky":"1",
                                    "name":"community"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    })
}
module.exports = data;