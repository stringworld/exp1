var Mock = require('mockjs');
var data = function() {
    return Mock.mock([{
            img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-menu.png',
            menuText: '操作菜单',
            level: [],
            roteUrl: 'main.page3',
            isShow: true
        }, {
            img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-task.png',
            menuText: '客户管理',
            level: ['我的客户', '所有客户', '公共名单', '客户分配', '项目设置'],
            roteUrl: 'main.page3',
            isShow: true
        }, {
            img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-fuwu.png',
            menuText: '客户服务',
            level: ['公共名单', '客户分配', '项目设置'],
            roteUrl: 'main.page4',
            isShow: true
        }
        // , {
        //     img: 'http://upyun.thedoc.cn/cdn/addService/tog/menu-tonghua.png',
        //     menuText: '通话明细',
        //     level: [],
        //     roteUrl: 'main.page3',
        //     isShow: true
        // }, {
        //     img: 'http://upyun.thedoc.cn/cdn/addService/tog/menu-quan.png',
        //     menuText: '问卷管理',
        //     level: [],
        //     roteUrl: 'main.page3',
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
        //     roteUrl: 'main.page3',
        //     isShow: true
        // }, {
        //     img: 'http://upyun.thedoc.cn/cdn/addService/tog/menu-ghuawu.png',
        //     menuText: '高级话务报表',
        //     level: [],
        //     roteUrl: 'main.page3',
        //     isShow: true
        // }
    ]);
}
module.exports = data;