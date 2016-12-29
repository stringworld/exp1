import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-smart-table/dist/smart-table';
import './taskdetail.less';
import $ from 'jquery';

export default angular.module('taskdetail', [uirouter])
    .service('taskdetailApi', ['$http', function($http) {
        return {
            /*获取个人信息*/
            get_taskfind(params) {
                return $http.get('/api/task/find/', { params })
            },
            /*获取问卷*/
            get_questionnaireinfo(params) {
                return $http.get('/api/questionnaire/info/', { params })
            },
            /*获取问卷结果*/
            get_questionnaireresult(params) {
                return $http.get('/api/questionnaire/result/', { params })
            },
            /*驳回*/
            /*任务分配*/
            /*提交问卷*/
            post_reject(params) {
                return $http.post('/api/task/save/single/', params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            },
            /*获取登陆信息*/
            getCurrentUser() {
                return $http.get('/api/getCurrentUser/')
            }

        }

    }])

.factory('shareData', [function() {
    return {}
}])

.controller('taskdetail', ['taskdetailApi', '$scope', '$location', '$stateParams', '$state', 'shareData', function(Api, $scope, $location, $stateParams, $state, shareData) {
        $scope.stateParams = $stateParams;
        /*未完成原因*/
        $scope.undoneReason = {
            options: [
                { text: '多日电话都关机状态', value: '多日电话都关机状态' },
                { text: '多日电话均无人接', value: '多日电话均无人接' },
                { text: '不接受回访', value: '不接受回访' },
                { text: '不清楚该协议', value: '不清楚该协议' },
                { text: '曾接受过回访', value: '曾接受过回访' },
                { text: '非本地居民', value: '非本地居民' },
                { text: '沟通障碍', value: '沟通障碍' },
                { text: '拒接电话', value: '拒接电话' },
                { text: '空号', value: '空号' },
                { text: '未遇到该医生', value: '未遇到该医生' },
                { text: '医生离、退休', value: '医生离、退休' },
                { text: '医生信息错误', value: '医生信息错误' },
                { text: '已过世', value: '已过世' },
                { text: '沟通障碍', value: '沟通障碍' },
                { text: '错号', value: '错号' },
                { text: '其它', value: '其它' }
            ],
            seleted: ''
        }
        var data = {
            taskId: $stateParams.taskId
        };
        /*获取登陆信息*/
        Api.getCurrentUser().then(res => {
                console.log(res);
                shareData.userId = res.data.data.userId;
                console.log(shareData.userId);
            })
            /*问卷个人信息*/
        Api.get_taskfind(data).then(res => {
                console.log(res.data.data);
                $scope.userinfo = res.data.data;
            })
            /*问卷结果*/
        Api.get_questionnaireresult(data).then(res => {
                console.log(res);
                $scope.questionnaireinfo = res.data.data;
            })
            /*问卷内容*/

        if ($scope.stateParams.edit) {
            var questionparams = {
                projectId: $stateParams.projectId
            };
            Api.get_questionnaireinfo(questionparams).then(res => {
                console.log(res.data.data)
                $scope.questionnaireinfo = res.data.data.questions;
                shareData.questionnaireId = res.data.data.questionnaireId;
            })
        }
        /*提交问卷*/
        $scope.saveResult = () => {
            const answer = $scope.questionnaireinfo.map(q => {
                return {
                    questionId: q.questionId,
                    questionNumber: q.questionNum,
                    items: q.answerContent
                        .filter(a => a.checked)
                        .map(a => {
                            // 只需要k v
                            return {
                                key: a.key,
                                value: a.value
                            }
                        })
                }
            })

            var data = {
                customerId: shareData.userId,
                status: $scope.isFinished ? '1' : '3',
                taskId: $stateParams.taskId,
                questionnaireId: shareData.questionnaireId,
                result: JSON.stringify(answer),
                undone: $scope.undoneReason.selected || null,
                remark: $scope.remark || null
            };

            Api.post_reject(data).then(res => {
                console.log(res);
            })
        }

        /*驳回按钮*/
        $scope.rejectBtn = () => {
                $scope.shade = true;
                $scope.grouping = true;
            }
            /*驳回请求接口*/
        $scope.reject = () => {
                if (!$scope.reason) {
                    alert('驳回理由不能为空')
                };
                var data = {
                    reason: $scope.reason,
                    status: '2',
                    taskId: $stateParams.taskId,
                }
                Api.post_reject(data).then(res => {
                    console.log(res)
                    if (res.data.code === 0) {
                        $scope.grouping = false;
                        $scope.issuccess = true;
                        setTimeout(() => {
                            $scope.issuccess = false;
                            $scope.shade = false;
                            $scope.$digest();
                        }, 3 * 1000)
                    }
                })
            }
            /*打开所有录音界面*/
        $scope.openTab = () => {
            $state.go('main.record', { 'taskId': $stateParams.taskId });
            $scope.$emit('routeAdd', '所有录音', 'main.record');
        }

    }])
    .name;