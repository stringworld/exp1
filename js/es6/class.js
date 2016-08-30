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
// class Point {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//     toString() {
//         return '(' + this.x + ',' + this.y + ')';
//     }
// }

// let point = new Point(1, 2);

// console.log(point.toString());
// console.log(point.hasOwnProperty('x'));
// console.log(point.hasOwnProperty('y'));
// console.log(point.hasOwnProperty('toString'));
// console.log(point.__proto__.hasOwnProperty('toString'));



// class Foo {
//     constructor() {
//         return Object.create(null);
//     }
// }
// let foo = new Foo()
// console.log(foo)
// console.log((new Foo()) instanceof Foo)



class Animal {
    //构造方法
    constructor(name, color) {
            this.name = name;
            this.color = color;
        }
        // toString 是原型对象上的属性
    toString() {
        console.log('name:' + this.name + '\ncolor:' + this.color)
    }
}

//实例化
let animal = new Animal('dog', 'white');
animal.toString();

// console.log(animal.hasOwnProperty('name')); //true
// console.log(animal.hasOwnProperty('color')); // true
// console.log(animal.hasOwnProperty('toString')); // false
// console.log(animal.__proto__.hasOwnProperty('toString')); // true

class Cat extends Animal {
    constructor(action) {
        // 子类必须在constructor中指定super方法，否则在新建实例的时候会报错
        // 如果super没有置顶constructor ,默认带super方法的constructor将会被添加
        super('cat', 'white');
        this.action = action;
        super.toString(); //调用父类的toString()方法
    }
    toString() {
        console.log('action:' + this.action);
    }
}


let cat = new Cat('catch');
cat.toString();


// 实例 cat 是Cat和Animal 的实例es5 一样
console.log(cat instanceof Cat); //true
console.log(cat instanceof Animal); //true