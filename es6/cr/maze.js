/* 功能：解二维迷宫
 * 制作：Vilien
 * 日期：2013.10.25
 *
 * @usage new Maze(maze, x, y, epx, epy)
 *
 * @param maze
 * > 二维迷宫，必须，类型为二维数组
 * > 0表示可通过，1表示不可通过
 *
 * @param x
 * > 迷宫起点横坐标，可选，缺省为0，从左顶点计算起
 *
 * @param y
 * > 迷宫起点纵坐标，可选，缺省为0，从左顶点计算起
 *
 * @param epx
 * > 迷宫终点横坐标，可选，缺省为最大横坐标，从左顶点计算起
 *
 * @param epy
 * > 迷宫终点纵坐标，可选，缺省为最大纵坐标，从左顶点计算起
 *
 * @eg
 * > var maze = [
 * >    [ 0, 0, 0, 0, 1, 0, 0, 0 ],
 * >    [ 0, 1, 1, 1, 1, 0, 1, 0 ],
 * >    [ 0, 0, 0, 0, 1, 0, 1, 0 ],
 * >    [ 0, 1, 0, 0, 0, 0, 1, 0 ],
 * >    [ 0, 1, 0, 1, 1, 0, 1, 0 ],
 * >    [ 0, 1, 0, 0, 1, 0, 1, 0 ],
 * >    [ 0, 1, 0, 0, 1, 0, 0, 0 ],
 * >    [ 0, 1, 1, 1, 1, 1, 1, 0 ]
 * > ];
 * > var m = new Maze(maze, 0, 0, 7, 7);
 * > m.echo();
 */
function Maze(maze, x, y, epx, epy) {
    this.ways = []; // 总线路
    this.bestWay = []; // 最优线路
    this.badWay = []; // 最差线路
    this.length = 0; // 解集数

    var x = x || 0,
        y = y || 0,
        epx = epx || maze[maze.length - 1].length - 1,
        epy = epy || maze.length - 1,
        dx = [-1, 1, 0, 0], // 左右
        dy = [0, 0, 1, -1], // 下上
        m = clone(maze),
        _self = this;

    // run
    (function(x, y) {
        var nx, ny;
        m[y][x] = '*'; // 到此一游
        for (var i = 0; i < 4; i++) {
            nx = x + dx[i];
            ny = y + dy[i];
            if (ny >= 0 && ny < m.length && nx >= 0 && nx < m[ny].length && m[ny][nx] === 0) {
                if (nx === epx && ny === epy) {
                    _self.ways.push(clone(m));
                } else {
                    arguments.callee(nx, ny);
                }
            }
        }
        m[y][x] = 0; // 此路不通，请绕路
    })(x, y);

    // 结果处理
    this.length = this.ways.length;
    this.bestWay.step = Number.MAX_VALUE;
    this.badWay.step = 0;
    for (var i = 0; i < this.length; i++) {
        this.ways[i].step = this.ways[i].join(',').replace(/,|1|0/g, '').length;
        this.ways[i][epy][epx] = '*'; // 终点标记
        this.bestWay.step > this.ways[i].step ? this.bestWay = this.ways[i] : 0;
        this.badWay.step < this.ways[i].step ? this.badWay = this.ways[i] : 0;
    }

    // 拷贝maze
    function clone(maze) {
        var a = [];
        for (var i = 0; i < maze.length; i++) {
            a[i] = maze[i].slice();
        }
        return a;
    }
}

// 输出方法，需浏览器console支持，删除该方法不影响本迷宫类
Maze.prototype.echo = function(sch) {
    switch (sch) {
        case 1: // 全部解法
            var w = this.ways;
            for (var i = 0; i < w.length; i++) {
                console.log('The way ' + i + ' , step:' + w[i].step);
                console.log(w[i].join('\n').replace(/,/g, ' '));
            }
            break;
        case 2: // 最差解法
            console.log('The bad way, step:' + this.badWay.step);
            console.log(this.badWay.join('\n').replace(/,/g, ' '));
            break;
        default: //最优解法
            console.log('The best way, step:' + this.bestWay.step);
            console.log(this.bestWay.join('\n').replace(/,/g, ' '));
    }
};

//调用
var levels = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
];
var maze = [
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0]
];

var m = new Maze(maze, 0, 0, 7, 7);
m.echo(3);