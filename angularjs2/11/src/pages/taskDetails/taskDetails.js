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
        $scope.postData = [];
        detailsAPI.get_data().then(response => {
            if(response.data.questionnaires.problems.length > 0){
                $scope.problems = response.data.questionnaires.problems;
                $scope.postData.taskId = response.data.questionnaires.questionnaireId;
            }else{
                console.log('数据为空');
            }
        });
        $scope.educationBackground = ["请选择","初中以下","高中","大专","本科"];
        $scope.postData.teachBackground = $scope.educationBackground[0];
        $scope.radioChange = function(problemId,problemAnswer){
            for(let key in $scope.postData){
                if($scope.postData[key].problemId === problemId){
                    $scope.postData[key].problemAnswer = problemAnswer;
                    return;
                }
            }
            $scope.postData.push({problemId, problemAnswer});
        }
        $scope.checkboxChange = function(problemId,problemAnswer){
            for(let key in $scope.postData){
                if(($scope.postData[key].problemId === problemId) && ($scope.postData[key].problemAnswer === problemAnswer)){
                    $scope.postData.splice(key,1);
                    return;
                }
            }            
            $scope.postData.push({problemId, problemAnswer});
            return;
        }
        $scope.submitForm = function() {
            console.log($scope.postData.isfinished)
            if($scope.postData.isfinished){
                console.log('提交成功');
                console.log($scope.postData)               
            }else{
                console.log($scope.postData)
                console.log('提交失败')
            }
        }
        $scope.cancelForm = function(){

        }
    }])
    
.name;