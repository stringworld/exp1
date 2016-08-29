// let [foo, [[bar], baz]] = [1, [[2], 3 ]];

// console.log(foo)
// console.log(bar)
// console.log(baz)

// let [, , third] = ["foo", "bar", "baz"];
// console.log(third)

// let [head, ...tail] = [1, 2, 3, 4];

// console.log(head)
// console.log(tail)

// let [x, y, z] = new Set(["a", "b", "c"]);

// console.log(x)


// function * fibs() {
//     var a = 0;
//     var b = 1;
//     while (true) {
//         yield a;
//         [a, b] = [b, a + b];
//     }
// }

// var [first, second, third, fourth, fifth, sixth] = fibs();

// console.log()

// function f() {
//   console.log('aaa');
// }

// let [x = f()] = [1];

// console.log(x)


//class

// function Point(x, y) {
//   this.x = x;
//   this.y = y;
// }

// Point.prototype.toString = function () {
//   return '(' + this.x + ', ' + this.y + ')';
// };

// var p = new Point(1, 2);
// console.log(p)
// console.log(p.toString())


//定义类
class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    toString(){
        return '('+this.x+','+this.y+')';
    }
}

var p=new Point(1,2);

console.log(p.toString())