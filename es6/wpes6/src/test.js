// var name = 'zhang';
// var age = 'jun';

// // export { name, age };

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
};

// var p = new person('zhang', '20');
export {
    person
}
// console.log(p)
