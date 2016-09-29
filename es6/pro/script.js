var app=angular.module('myApp', ['smart-table','lrDragNDrop']);
    app.controller('mainCtrl', ['$scope', '$timeout',
        function ($scope, $timeout) {

            var nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
            var familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];

            $scope.isLoading = false;
            $scope.rowCollection = [];


            // function createRandomItem() {
            //     var firstName = nameList[Math.floor(Math.random() * 4)],
            //         lastName = familyName[Math.floor(Math.random() * 4)],
            //         age = Math.floor(Math.random() * 100),
            //         email = firstName + lastName + '@whatever.com',
            //         balance = Math.random() * 3000;

            //     return {
            //         firstName: firstName,
            //         lastName: lastName,
            //         age: age,
            //         email: email,
            //         balance: balance
            //     };
            // }
            
            $scope.table_title=['选择','编号', '电话号码','地区','签约医院','签约医生','销售','创建人','详情'];
            
            for(var i=0;i<50;i++){
              // $scope.rowCollection.push(createRandomItem());
            } 
            $scope.rowCollection=[
                {selected:false,numId: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
                {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com',selected:false},
                {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com',selected:false}
            ];

            $scope.on_change=function(evt){
                console.log(evt)
            }
        }
    ]);
app.directive('csSelect', function () {
    return {
        require: '^stTable',
        restrict: 'AE',
        template: '<input type="checkbox"/>',
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
