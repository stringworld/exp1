// var app=angular.module('myApp', ['smart-table']);
//     app.controller('mainCtrl', ['$scope', '$timeout',
//         function ($scope, $timeout) {
            
//             $scope.table_title=['选择','编号', '电话号码','姓名','地区','居委','签约医院','签约医生','销售','创建人','详情'];

//             $scope.rowCollection=[
//                 {isSelected:true,numId: '810762', numTel: '021-8888888', 'userName': '小明', address: '上海市', committee: '虹口居委会','signHos':'上海市长海医院','signDoc':'小王','numSell':8001,'numCreate':8001,'details':'http://www.baidu.com/'},
//                 {isSelected:false,numId: '810762', numTel: '021-8888888', 'userName': '小明', address: '上海市', committee: '虹口居委会','signHos':'上海市长海医院','signDoc':'小王','numSell':8001,'numCreate':8001,'details':'http://www.baidu.com/'},
//                 {isSelected:false,numId: '810762', numTel: '021-8888888', 'userName': '小明', address: '上海市', committee: '虹口居委会','signHos':'上海市长海医院','signDoc':'小王','numSell':8001,'numCreate':8001,'details':'http://www.baidu.com/'},
//                 {isSelected:false,numId: '810762', numTel: '021-8888888', 'userName': '小明', address: '上海市', committee: '虹口居委会','signHos':'上海市长海医院','signDoc':'小王','numSell':8001,'numCreate':8001,'details':'http://www.baidu.com/'}
//             ];
//         }
//     ]);
// app.directive('csSelect', function () {
//     return {
//         restrict: 'AE',
//         template: '',
//         scope: {
//             row: '=csSelect'
//         },
//         link: function (scope, element, attr, ctrl) {

//             element.bind('change', function (evt) {
//                 scope.$apply(function () {
//                     ctrl.select(scope.row, 'multiple');
//                 });
//             });

//             scope.$watch('row.isSelected', function (newValue, oldValue) {
//                 if (newValue === true) {
//                     element.parent().removeClass('st-selected');
//                     console.log(newValue,oldValue,element)
//                 } else {
//                     element.parent().removeClass('st-selected');
//                 }
//             });
//         }
//     };
// });


var temp={
    "isSuccess":true,
    "value":{
        "taskList":[
            { 
                "total": 2,
                "rows":[
                   {
                    "taskId":1,
                    "seatNo":"坐席号1",
                    "registerPhoneNo":"电话号码1",
                    "residentName":"姓名1",
                    "address":"地址1",
                    "neighborhood":"居委1",
                    "gender":1,
                    "signedHospital":"签约医院1",
                    "signedDoctorName":"签约医生1"
                    },
                    {
                    "taskId":2,
                    "seatNo":"坐席号2",
                    "registerPhoneNo":"电话号码2",
                    "residentName":"姓名2",
                    "address":"地址2",
                    "neighborhood":"居委2",
                    "gender":0,
                    "signedHospital":"签约医院2",
                    "signedDoctorName":"签约医生2"
                    }
                ]
            }
<<<<<<< HEAD
        ]
    },
  "errorMessage": ""
}
console.log(temp.value.taskList)
=======
        }
    ]);
app.directive('csSelect', function () {
    return {
        require: '^stTable',
        restrict: 'AE',
        template: '<input type="checkbox" ng-checked="isSelected(tag.id)"/>',
        scope: {
            row: '=csSelect'
        },
        link: function (scope, element, attr, ctrl) {

            // element.bind('change', function (evt) {
            //     scope.$apply(function () {
            //         ctrl.select(scope.row, 'multiple');
            //     });
            // });
            scope.on_change = function(evt) {
                // console.log(evt)
                // scope.$apply(function () {
                //     ctrl.select(scope.row, 'multiple');
                // });
            }

            scope.$watch('row.isSelected', function (newValue, oldValue) {
                if (newValue === true) {
                    element.parent().addClass('st-selected');
                    console.log(newValue,oldValue,element)
                } else {
                    element.parent().removeClass('st-selected');
                }
            });
        }
    };
});
>>>>>>> 8379e33dd19decd826c80d787f0a9fcb7e2e74f5
