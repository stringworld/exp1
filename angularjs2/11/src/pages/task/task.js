import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-smart-table/dist/smart-table';
import WS from '../../utils/websocket';
import './task.less';

export default angular.module('task', [uirouter, 'smart-table'])
    .service('TASK_API', ['$http', function($http) {
        function getDate(getUrl, params) {
            const config = { params: params };
            return $http.get(getUrl, config).then(({ data }) => {
                return data && data[0] || {};
            });
        }
        return {
            getPage({ pageSize, current }) {
                return getDate('/getlist/taskdata', { pageSize, current });
            },
            getAllTaskData({ pageSize, current }) {
                return getDate('/getlist/alltaskdata', { pageSize, current });
            },
            getMyTaskData({ pageSize, current }) {
                return getDate('/getlist/mytaskdata', { pageSize, current });
            },
            getMyTask() {
                return getDate('http://192.168.10.37:8081/questionnaire/findAnswer', { taskId: 3 });
            }
        }
    }])
    .controller('tableCtrl', ['TASK_API', '$scope', '$stateParams', '$state', '$q', function(TASK_API, $scope, $stateParams, $state, $q) {
        function setPager({ tableTitle, rowCollection }) {
            $scope.tableTitle = tableTitle;
            $scope.rowCollection = rowCollection;
            $scope.pageData.itemsCount = 100;
            $scope.allotGroup = ['第一组', '第二组', '第三组'];
            $scope.allotGroupId = [8001, 8002, 8003, 8004];
        }

        $scope.defaultPager = {
            current: 1,
            pageSize: 30
        };

        //筛选条件
        $scope.isHidden = $stateParams.levelRoute;

        switch ($stateParams.levelRoute) {
            case "task":
                TASK_API.getPage($scope.defaultPager).then(setPager);
                console.log(TASK_API.getMyTask($scope.defaultPager).then(setPager))
                break;
            case "alltask":
                TASK_API.getAllTaskData($scope.defaultPager).then(setPager);
                break;
            case "mytask":
                TASK_API.getMyTaskData($scope.defaultPager).then(setPager);
                break;
        }

        $scope.result = [];
        //  全选
        $scope.allChecked = function() {
            $scope.rowCollection.forEach(item => (item.isSelected = true));
        };

        $scope.goToDeTail = function(event, taskId) {
            event.stopPropagation();
            $state.go('main.taskDetails', { 'taskId': taskId, 'thisRoute': $stateParams.levelRoute });
        };

        $scope.showAllotBox = false;
        $scope.allotSelect = false;

        $scope.getChecked = function() {
            $scope.result = $scope.rowCollection.filter(item => item.isSelected);
            $scope.showAllotBox = true;
            $scope.allotSelect = true;
            console.log([...$scope.result])
        };

        $scope.closeAllotBox = (() => $scope.showAllotBox = false);

        $scope.allotConfirm = (() => $scope.allotSelect = false);

        $scope.groupOnChange = (value => $scope.selectedTxt = value);
        $scope.groupIdOnChange = (id => $scope.selectedId = id);


        //分页
        $scope.splitPage = function(page, pageSize) {
            if (page && pageSize) {
                switch ($stateParams.levelRoute) {
                    case "task":
                        TASK_API.getPage({ page, pageSize }).then(setPager);
                        break;
                    case "alltask":
                        TASK_API.getAllTaskData({ page, pageSize }).then(setPager);
                        break;
                    case "mytask":
                        TASK_API.getMyTaskData({ page, pageSize }).then(setPager);
                        break;
                }
            }
        };

        $scope.pageData = {
            itemsPerPage: 10,
            itemsCount: '',
            maxNumbers: 3
        }

        //打电话/呼叫
        $scope.taskCallTel = function(event, telnum) {
            event.stopPropagation();
            const params = {
                cmdsn: '102',
                seatno: '8020',
                caller: '',
                para: telnum || '',
                cmd: '3'
            };
            new WS().say(params);
        }

        //保持
        $scope.taskCallOut = function(event) {
            event.stopPropagation();
            const params = {
                cmdsn: '113',
                seatno: '8020',
                caller: '',
                para: '1',
                cmd: '13'
            };
            new WS().say(params);
        }
    }])
    .directive('onSelect', function() {
        return {
            restrict: 'AE',
            template: '<img ng-src="http://7xso1h.com2.z0.glb.clouddn.com/img-{{row.isSelected}}.png">',
            scope: {
                row: '=onSelect'
            },
            link: function(scope, element, attr, ctrl) {

            }
        };
    })
    .name;