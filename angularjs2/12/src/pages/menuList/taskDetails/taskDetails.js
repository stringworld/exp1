import uirouter from 'angular-ui-router';
import './taskDetails.less';



export default angular.module('taskDetails', [uirouter])
    .service('detailsAPI', ['$http', function($http) {
        return {
            get_data: function() {
                return $http.get('/details/tackdetails')
            }
        }
    }])
    .controller('details',['$scope','detailsAPI', function($scope, detailsAPI){
        $scope.isShow = true;
        detailsAPI.get_data().then(response => {
            if(response.data.data.taskList[0].problems.length > 0){
                $scope.problems = response.data.data.taskList[0].problems;
            }else{
                console.log('数据为空');
            }
        });
        $scope.educationBackground = ["初中以下","高中","大专","本科"];
        $scope.submitForm = function(){
            
        }
        $scope.option = {};
        $scope.count = 0;
        $scope.postData = {};
        $scope.change = function(t){
            var b = t.option.name;
            var a = t.option.value;
            console.log(b)
            $scope.postData = {
                b : a
            }
            console.log($scope.postData);
            console.log($scope.option)
        }
    }])
    
.name;