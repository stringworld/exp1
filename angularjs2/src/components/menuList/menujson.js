var data = [{
    img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-task.png',
    text: '任务管理',
    route: 'main.',
    menuIcoClass: 'menu-task-manage',
    level: [{
            text: '任务分配',
            route: 'taskallocation',
            role: ['manager'],
            isShow: true
        },
        {
            text: '所有任务',
            route: 'taskall',
            role: ['manager'],
            isShow: true
        },
        {
            text: '我的任务',
            route: 'taskmine',
            role: ['customerService'],
            isShow: true
        }
    ],
    role: ['customerService', 'manager'],
    isShow: true
}, {
    img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-fuwu.png',
    text: '录音管理',
    route: 'main.',
    menuIcoClass: 'menu-record-manage',
    level: [{
        text: '所有录音',
        route: 'record',
        role: ['manager'],
        isShow: true
    }, {
        text: '我的录音',
        route: 'recordmine',
        role: ['customerService'],
        isShow: true
    }],
    role: ['customerService', 'manager'],
    isShow: true
}, {
    img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-task.png',
    text: '坐席管理',
    route: 'main.',
    menuIcoClass: 'menu-seat-manage',
    level: [{
            text: '状态监控',
            route: 'returnvisit',
        role: ['manager'],
        isShow: true
        },
        {
            text: '所有回访结果',
            route: 'returnvisit',
            role: ['manager'],
            isShow: true
        },
        {
            text: '我的回访结果',
            route: 'returnvisitmine',
            role: ['customerService'],
            isShow: true
        },
        {
            text: '服务统计',
            route: 'returnvisit',
            role: ['manager'],
            isShow: true
        }
    ],
    role: ['customerService', 'manager'],
    isShow: true
}, {
    img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-mes.png',
    text: '问卷管理',
    route: 'main.questionnaire',
    menuIcoClass: 'menu-questionnaire-m',
    level: [{
        text:null,
        route:null,
        role: ['webadmin'],
        isShow: true
    }],
    role: ['webadmin'],
    isShow: true
}, {
    img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-fuwu.png',
    text: '项目管理',
    route: 'main.question',
    menuIcoClass: 'menu-project-manage',
    level: [{
        text:null,
        route:null,
        role: ['webadmin'],
        isShow: true
    }],
    role: ['webadmin'],
    isShow: true
}, {
    img: 'http://7xso1h.com1.z0.glb.clouddn.com/menu-syset.png',
    text: '系统设置',
    route: 'main',
    menuIcoClass: 'menu-sys-set',
    level: [{
            text: '帐号管理',
            route: 'taskDetails',
            role: ['webadmin'],
            isShow: true
        },
        {
            text: '角色管理',
            route: 'taskDetails',
            role: ['webadmin'],
            isShow: true
        },
        {
            text: '系统参数',
            route: 'taskDetails',
            role: ['webadmin'],
            isShow: true
        }
    ],
    role: ['webadmin'],
    isShow: true
}];
module.exports = data;