﻿//向外输出一个变量
// export var name='zhang';


//向外输出多个变量
// var name = 'zhang';
// var age = 20;

// export function multiply(x, y) {
//     return x * y;
// };


// export function getName() {
//     return name;
// }

// export function getAge() {
//     return age;
// }

class person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    multiply(x, y) {
        return x * y;
    }
}

// var p = new person('zhang', '20');
export {person}
