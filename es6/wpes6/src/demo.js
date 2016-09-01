var fs = require('fs');
var input = fs.createReadStream(__dirname + '/demo.css');
console.log(readLines(input))

var result = '';

function readLines(input) {
    var remaining = '';
    input.on('data', function(data) {
        remaining += data;
        // var index = remaining.indexOf('\n');
        // while (index > -1) {
        //     var line = remaining.substring(0, index);
        //     remaining = remaining.substring(index + 1);
        //     func(line);
        //     index = remaining.indexOf('\n');
        // }
    });

    input.on('end', function() {
        if (remaining.length > 0) {
            func(remaining);
        }
    });

    function func(data) {
        data = data.replace(/\.+/g, '').replace(/(-[a-z])/g, function(e) {
            return e[1].toUpperCase()
        }).replace(/:/g, ':"').replace(/;/g, '",').replace(/{/g, ':{').replace(/,}/g, '}').replace(/}/g, '},');
        result = (data)
            // console.log(data)
    }
}
setTimeout(function() {
        console.log(result)
    }, 10)
    // (function($) {
    //     var fs = require('fs');
    //     var result = '';
    //     this.set = function(path) {
    //         var input = fs.createReadStream(__dirname + path);
    //         this.readLines(input);
    //     }
    //     this.readLines = function(input) {
    //         var remaining = '';
    //         input.on('data', function(data) {
    //             remaining += data;
    //             var index = remaining.indexOf('\n');
    //             while (index > -1) {
    //                 var line = remaining.substring(0, index);   
    //                 remaining = remaining.substring(index + 1);
    //                 this.func(line);
    //                 index = remaining.indexOf('\n');
    //             }
    //         });

//         input.on('end', function() {
//             if (remaining.length > 0) {
//                 this.func(remaining);
//             }
//         });
//     }
//     this.func = function(data) {
//         data = data.replace(/\.+/g, '').replace(/(-[a-z])/g, function(e) {
//             return e[1].toUpperCase()
//         }).replace(/:/g, ':"').replace(/;/g, '",').replace(/{/g, ':{').replace(/,}/g, '}').replace(/}/g, '},');

//         console.log(data)
//     }
// })(window)