var g_Interval = 100;
var g_PersonCount = 55; //参加抽奖人数
var g_Timer;
var running = false;
var g_PersonName = [
    "孟祥凯",
    "赵博",
    "辛明玲",
    "王绿洲",
    "王文军",
    "冮悉樊",
    "孟令超",
    "樊猛",
    "宋新萍",
    "李明",
    "殷化平",
    "刘凤军",
    "赵帅",
    "熊克晗",
    "李志辉",
    "刘晓龙",
    "翟巍",
    "崔波",
    "刘海波",
    "魏玉卫",
    "叶永红",
    "田茂林",
    "李鼎文",
    "王纪红",
    "刘书森",
    "田云锁",
    "苏彦明",
    "陈元平",
    "田满喜",
    "王朝辉",
    "王焕霞",
    "毕福生",
    "冯建新",
    "赵丹",
    "周建华",
    "杜云志",
    "王泉",
    "牛宝新",
    "孟金龙",
    "陈月锋",
    "康保胜",
    "陈六五",
    "牛世杰",
    "范克杰",
    "杨立",
    "于钦江",
    "周泽斌",
    "何妮",
    "任云飞",
    "张霞",
    "庞瑞俭",
    "张美玲",
    "陈志刚",
    "伍占锋",
    "高诗良"
]

function beginRndNum(trigger) {
    if (running) {
        running = false;
        clearTimeout(g_Timer);
        $(trigger).val("开始");
        $('#ResultNum').css('color', 'red');
    } else {
        running = true;
        $('#ResultNum').css('color', 'black');
        $(trigger).val("停止");
        beginTimer();
    }
}

function updateRndNum() {
    var num = Math.floor(Math.random() * g_PersonCount + 1);
    $('#ResultNum').html(g_PersonName[num]);
}

function beginTimer() {
    g_Timer = setTimeout(beat, g_Interval);
}

function beat() {
    g_Timer = setTimeout(beat, g_Interval);
    updateRndNum();
}