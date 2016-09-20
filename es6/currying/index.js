// function printInfo(name, song) {
//     console.log(name + '喜欢的歌曲是: ' + song);
// }
// printInfo('Tom', '七里香');
// printInfo('Jerry', '雅俗共赏');

// //对上面的函数进行柯里化之后,我们可以这样写:
// function curryingPrintInfo(name) {
//     return function(song) {
//         console.log(name + ' like song is：' + song);
//     }
// }

// var tick = new curryingPrintInfo('tom');
// tick('drool the');

// 货物编号   货物重量(单位:kg)
// 1         509
// 2         838
// 3         924
// 4         650
// 5         604
// 6         793
// 7         564
// 8         651
// 9         697
// 10        649
// 11        747
// 12        787
// 13        701
// 14        605
// 15        644
// 
// [ 509, 564, 604, 605, 644, 649, 650, 651]
// 1 7 5 14 15 10 4 8
// var MAX_VALUE=5000;
// 1-7-5-14-15-10-4-8
// var arr_=[509,
//     838,
//     924,
//     650,
//     604,
//     793,
//     564,
//     651,
//     697,
//     649,
//     747,
//     787,
//     701,
//     605,
//     644
// ];  
// var arr=[ 509, 564, 604, 605, 644, 649, 650, 651, 697, 701, 747, 787, 793, 838, 924 ];



// var temp=[];
// var sum=0;
// for(var i in arr){
//     if(sum<=MAX_VALUE){
//         sum+=arr[1];
//         temp.push(arr[i])
//     }else{
//         if(sum-(sum-arr[i-1])){
//             console.log(temp)
//         };
//     }
// }

// let res_=0;
// let temp=[ 509, 564, 604, 605, 644, 649, 650, 651];
// for(var j in temp){
//     res_+=temp[j];
// }
// console.log(res_)
// console.log(weizhi(arr_,temp))




class MAX_VALUE {
    constructor(arr) {
        this.arr = arr;
    }
    weizhi() {
        var orig = 0;
        var num = 0;
        var res = [];
        var i;
        for (i = 0; i < (1 << 15); i++) {
            var temp = 0;
            for (var j = 14; j >= 0; j--) {
                if (((i >> j) & 1) == 1) {
                    temp += arr[15 - j];
                }
                if (temp > 5000) {
                    break;
                }
            }
            if (temp > orig && temp <= 5000) {
                orig = temp;
                num = i;
            }
        }
        for (i = 14; i >= 0; i--) {
            if (((num >> i) & 1) == 1) {
                res.push(15 - i + 1);
            }
        }
        return res.join('-');
    }
}
var arr = [509, 838, 924, 650, 604, 793, 564, 651, 697, 649, 747, 787, 701, 605, 644];
var m = new MAX_VALUE(arr);
console.log(m.weizhi());