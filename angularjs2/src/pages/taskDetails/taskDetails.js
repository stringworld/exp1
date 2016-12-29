import uirouter from 'angular-ui-router';
import './taskDetails.less';
import education from '../../utils/education'

export default angular.module('taskDetails', [uirouter])
    .service('detailsAPI', ['$http', function($http) {
        return {
            //填写问卷
            getQuestionnaireData: function(taskId){
                const config = {params: {taskId}}
                return $http.get('/taskProcessControl/taskUpdateInit/', config).then(({data})=>{
                    return data||{};
                });
            },
            
            //查看详情
            getAnswerData: function(taskId){
                const config = {params: {taskId}}
                return $http.get('/taskProcessControl/taskResultDetail/', config).then(({data})=>{
                    return data||{};
                });
            },

            //发送问卷数据
            postSaveAnswer: function(data){
                return $http({
                    method: "post",
                    data: data,
                    url: "/taskProcessControl/updateDesignatedTask/"
                });
            }
        }
    }])
    .controller('details', ['$scope', 'detailsAPI', '$stateParams', '$state', function($scope, detailsAPI, $stateParams, $state){
        $scope.educationBackground = education;
        $scope.teachBackground = {'num':null};
        $scope.postData = {};
        $scope.postData.problemsResult = [];
        $scope.postData.taskId = parseInt($stateParams.taskId);
        $scope.isMyTask = $stateParams.thisRoute === 'mytask';
        $scope.isAllTask = $stateParams.thisRoute === 'alltask';
        $scope.isDisabled = false;
        const problemTypes = {
            '1': 'radio',
            '2': 'checkbox'
        }
        function questionnarireData({data, errorMsg}){
            $scope.customerDetails = data.taskDetail;
            if(data.questionnaire.problems.length){
                // console.log(data.questionnaire.problems)
                $scope.originalProblems = data.questionnaire.problems;
                $scope.problems = $scope.originalProblems.map(problem => (
                    {
                        problemContent: problem.problemContent,
                        problemId: problem.problemId,
                        type: problemTypes[problem.problemType] || 'redio',
                        data: problem.options.map( ({optionContent,optionId,problemId}) => ({
                            text: optionContent,
                            value: optionId,
                            uid: optionId,
                            name: problemId,
                            isSelected: false
                        }))
                    }
                ));
                $scope.postData.questionnaireId = data.questionnaire.questionnaireId;
            }else{
                $scope.errorMsg = errorMsg;
            }
        }
        function answerData({data, errorMsg}){
            $scope.customerDetails = data.taskDetail;
            $scope.postData.remark = data.taskDetail.remark;
            if(data.questionnaireResult.length){
                $scope.items = data.questionnaireResult;
            }else{
                $scope.errorMsg = errorMsg;
            }
        }
        $scope.router = $stateParams.thisRoute;
        switch ($scope.router) {
            case "mytask":
                detailsAPI.getQuestionnaireData($scope.postData.taskId).then(questionnarireData);
                break;
            case "alltask":
                detailsAPI.getAnswerData($scope.postData.taskId).then(answerData);
                break;
        }
        $scope.change = function(id, value) {
            $scope.isRadio = this.problem.type === 'radio';
            if($scope.isRadio){
                $scope.problems.filter(item=> item.problemId === this.problem.problemId && item.data.forEach(i=>(i.isSelected = (i.uid === id))));
            }else{ 
                $scope.problems.filter(item=> item.problemId === this.problem.problemId && item.data.forEach(i=>(i.uid === id &&  (i.isSelected = !i.isSelected))));
            }
        }
        $scope.goBack = function(){
            if($stateParams.goBack === 'mytask'){
                $state.go('main.task', {'levelRoute': 'mytask'});
            }else{
                $state.go('main.task', {'levelRoute': 'alltask'});
            }
            console.log($scope.postData)
        }
        $scope.submitForm = function() {
            $scope.postData.isFinished = $scope.postData.isFinished === 'true';
            $scope.isPost = 'isFinished' in $scope.postData && $scope.problems[0].data.filter(item => item.isSelected === true).length;
            if($scope.isPost){
                $scope.postData.degreeOfEducation = $scope.teachBackground.num;
                $scope.tempProblems = $scope.problems.map(item => item.data.filter(i => i.isSelected).map(a => ({
                    'problemId': a.name,
                    "optionId": a.uid,
                    "optionContent": a.text
                }))).forEach(c => c.length > 0 && c.forEach(d => $scope.postData.problemsResult.push(d)));
                $scope.isDisabled = true;
                detailsAPI.postSaveAnswer($scope.postData).then(function({data}){
                    console.log(data)
                    if(!data.code){
                        $state.go('main.taskDetails',{'thisRoute':'alltask','taskId':$scope.postData.taskId, 'goBack':'mytask'});
                    }else{
                        $scope.errorMsg = data.errorMsg;
                        $scope.isDisabled = false;
                    }
                });
            }else{
                $scope.isDisabled = false;
                $scope.isfinishedMsg = '表单未完成';
            }
        }
        $scope.cancelForm = function(){
            $state.go('main.task', {'levelRoute': 'mytask'});
        }
    }])
    
.name;