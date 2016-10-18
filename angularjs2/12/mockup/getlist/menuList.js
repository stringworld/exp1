var Mock = require('mockjs');
var data = function () {
    return Mock.mock([{
        img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-task.png',
        menuText: '任务管理',
        level: [{
            levelTxt: '任务分配',
            levelRoute: 'main.task'
        },
            {
                levelTxt: '所有任务',
                levelRoute: 'main.alltask'
            },
            {
                levelTxt: '我的任务',
                levelRoute: 'main.mytask'
            }],
        roteUrl: 'main.taskDetails',
        isShow: true
    }, {
        img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-fuwu.png',
        menuText: '录音管理',
        level: [{levelTxt: '所有录音', levelRoute: 'main.taskDetails'}, {levelTxt: '我的录音', levelRoute: 'main.taskDetails'}],
        roteUrl: 'main.page4',
        isShow: true
    }, {
        img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-task.png',
        menuText: '坐席管理',
        level: [{
            levelTxt: '状态监控',
            levelRoute: 'main.taskDetails'
        },
            {
                levelTxt: '所有回访结果',
                levelRoute: 'main.taskDetails'
            },
            {
                levelTxt: '我的回访结果',
                levelRoute: 'main.taskDetails'
            },
            {
                levelTxt: '服务统计',
                levelRoute: 'main.taskDetails'
            }],
        roteUrl: 'main.page4',
        isShow: true
    }, {
        img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-mes.png',
        menuText: '问卷管理',
        level: [],
        roteUrl: 'main.taskDetails',
        isShow: true
    }, {
        img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-fuwu.png',
        menuText: '项目管理',
        level: [],
        roteUrl: 'main.page4',
        isShow: true
    }, {
        img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-syset.png',
        menuText: '系统设置',
        level: [{
            levelTxt: '帐号管理',
            levelRoute: 'main.taskDetails'
        },
            {
                levelTxt: '角色管理',
                levelRoute: 'main.taskDetails'
            },
            {
                levelTxt: '系统参数',
                levelRoute: 'main.taskDetails'
            }],
        roteUrl: 'main.page4',
        isShow: true
    }
        // , {
        //     img: 'http://upyun.thedoc.cn/cdn/addService/tog/menu-tonghua.png',
        //     menuText: '通话明细',
        //     level: [],
        //     roteUrl: 'main.taskDetails',
        //     isShow: true
        // }, {
        //     img: 'http://upyun.thedoc.cn/cdn/addService/tog/menu-quan.png',
        //     menuText: '问卷管理',
        //     level: [],
        //     roteUrl: 'main.taskDetails',
        //     isShow: true
        // }, {
        //     img: 'http://upyun.thedoc.cn/cdn/addService/tog/menu-huawu.png',
        //     menuText: '话务报表',
        //     level: [],
        //     roteUrl: 'main.page4',
        //     isShow: true
        // }, {
        //     img: 'http://upyun.thedoc.cn/cdn/addService/tog/menu-waihu.png',
        //     menuText: '自动外呼',
        //     level: [],
        //     roteUrl: 'main.taskDetails',
        //     isShow: true
        // }, {
        //     img: 'http://upyun.thedoc.cn/cdn/addService/tog/menu-ghuawu.png',
        //     menuText: '高级话务报表',
        //     level: [],
        //     roteUrl: 'main.taskDetails',
        //     isShow: true
        // }
    ]);
}
module.exports = data;