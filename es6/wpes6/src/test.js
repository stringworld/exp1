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

var p = new person('zhang', '20');
// export { person }
// console.log(p)

// Array.prototype.unique_ = function() {
//     return [...new Set(this)];
// }

// var arr = [];
// var num = 0;
// for (var i = 0; i < 1000000; i++) {
//     num = Math.floor(Math.random() * 100);
//     arr.push(num)
// }
// console.time('test');
// var set=new Set(arr);
// console.log([...set])
// arr.unique_()
// console.log(arr.unique_());
// console.timeEnd('test')



// console.log([...[2,4,6]])

// var ss = ".temp {background-color:#cccccc;width:100%;}.main {background-color:#cccccc;width:100%;}";
// var ss = 'background-color';
// console.log(temp(regXp(stySty(ss))))

// function stySty(style) {
//     return style.replace(/\-(\w)/g, function(all, letter) {
//         return letter.toUpperCase();
//     });
// }

// function regXp(style) {
//     return style.replace(/;/g, ',');
// }

// function temp(style){
//     // return style.match(/.(\S*){/)[1];
//     var name=style.match(/(.=?)(\S*)(?=})/);
//     return name;
// }


 // ss=ss.replace(/\.+/g,'').replace(/{/g,':{').replace(/(:[0-9a-zA-Z])/ig,'"$1"').replace(/(-[a-z])/g,function(e){
 //    return e[1].toUpperCase()
 // });
 // ss=ss.replace(/\-(\w)/g, function(all, letter) {
 //        return letter.toUpperCase();
 //    }).replace(/:/g,':"').replace(/;/g,'",').replace(/{/g,':{').replace(/,}/g,'}');
 

 // ss=ss.replace(/\.+/g,'').replace(/(-[a-z])/g,function(e){
 //    return e[1].toUpperCase()
 // }).replace(/:/g,':"').replace(/;/g,'",').replace(/{/g,':{').replace(/,}/g,'},');
 // console.log(ss)
