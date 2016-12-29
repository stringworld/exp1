import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-smart-table/dist/smart-table';
import WS from '../../utils/websocket';
import './task.less';
import $ from 'jquery';

export default angular.module('task', [uirouter, 'smart-table'])
    .service('TASK_API', ['$http', function($http) {
        function getDate(getUrl, params) {
            const config = { params: params };
            return $http.get(getUrl, config).then(({ data }) => {
                return data || {};
            });
        }

        function postDate(getUrl, params) {
            const config = { params: params };
            return $http.get(getUrl, config).then(({ data }) => {
                return data || {};
            });
        }
        const thisip = '';
        return {
            getPage({ pageSize, current }) {
                return getDate(thisip + '/taskProcessControl/taskAllot', { pageSize, current });
            },
            getAllTaskData({ pageSize, current }, { projectId }, { residentName, registerPhoneNo, signedDoctorName }) {
                return getDate(thisip + '/taskProcessControl/getAllTaskByParams', { pageSize, current, projectId, residentName, registerPhoneNo, signedDoctorName });
            },
            getMyTaskData({ pageSize, current }, { projectId }, { residentName, registerPhoneNo, signedDoctorName }) {
                return getDate(thisip + '/taskProcessControl/getMyTaskByParams', { pageSize, current, projectId, residentName, registerPhoneNo, signedDoctorName });
            },
            selectedAssign({ groupId, customerId, taskIds }) {
                const config = { groupId: groupId.join(''), customerId: customerId.join(''), taskIds: taskIds.join(',') + '' };
                $.ajax({
                    type: 'POST',
                    url: thisip + '/taskProcessControl/selectedAssignment',
                    data: config, // pass in data as strings
                })
            },
            allotTaskTo({ projectId, amount }) {
                const config = { projectId: projectId, amount: amount };
                $.ajax({
                    type: 'POST',
                    url: thisip + '/taskProcessControl/allotTaskToCommonPool',
                    data: config, // pass in data as strings
                })
            },
            taskIdsGather({ taskIds }) {
                const config = { taskIds: taskIds.join(',') + '' };
                $.ajax({
                    type: 'POST',
                    url: thisip + '/taskProcessControl/allotSelectedTaskToCommonPool',
                    data: config, // pass in data as strings
                })
            },
            getCustomerGroupList: function() {
                var config = { params: {} };
                return $http.get(thisip + '/taskProcessControl/getCustomerGroupList', config).then(({ data }) => { return data || {} });
            },
            getCustomerListByGroupId: function({ groupId }) {
                var config = { params: { groupId } };
                return $http.get(thisip + '/taskProcessControl/getCustomerListByGroupId', config).then(({ data }) => { return data || {} });
            },
            batchAssignment({ projectId, amount, groupId, customerId }) {
                const config = { projectId: projectId, amount: amount, groupId: groupId.join(''), customerId: customerId.join('') };
                $.ajax({
                    type: 'POST',
                    url: thisip + '/taskProcessControl/batchAssignment',
                    data: config, // pass in data as strings
                })
            },
        }
    }])
    .controller('tableCtrl', ['TASK_API', '$scope', '$location', '$stateParams', '$state', function(TASK_API, $scope, $location, $stateParams, $state) {
        function setPager({ data, pager }) {
            $scope.rowfieldName = [{
                'selectText': '选择',
                'taskId': data.title.taskId || '',
                'seatNo': data.title.seatNo || '',
                'registerPhoneNo': data.title.registerPhoneNo || '',
                'residentName': data.title.residentName || '',
                'address': data.title.address || '',
                'phoneString': data.title.phoneString || '',
                'neighborhood': data.title.neighborhood || '',
                'signedHospital': data.title.signedHospital || '',
                'signedDoctorName': data.title.signedDoctorName || '',
                'detail': data.title.detail || ''
            }];
            $scope.rowCollection = data.taskList.map(i =>
                ({
                    'isSelected': false,
                    'taskId': i.taskId || '',
                    'seatNo': i.seatNo || '',
                    'registerPhoneNo': i.registerPhoneNo || '',
                    'residentName': i.residentName || '',
                    'address': i.address || '',
                    'phoneString': $scope.levelRouteText,
                    'neighborhood': i.neighborhood || '',
                    'signedHospital': i.signedHospital || '',
                    'signedDoctorName': i.signedDoctorName || '',
                    'detail': i.detail || ''
                })
            );

            $scope.pageData.itemsCount = pager.count;
        }

        function setGroup({ data }) {
            $scope.allotGroupData = data;
            var tempArr = data.map(item => item.customerGroupName);
            $scope.allotGroup = ['公共池'];
            $scope.allotGroup = $scope.allotGroup.concat(tempArr);
            $scope.defaultTxt = $scope.allotGroup[0];
        }

        $scope.allotGroupId = '';

        function setGroupId({ data }) {
            $scope.allotCustomerIdData = data;
            $scope.allotGroupId = data.map(item => item.seatNo);
        }

        //客服分组
        TASK_API.getCustomerGroupList().then(setGroup);


        $scope.defaultPager = {
            current: 1,
            pageSize: 30
        };

        $scope.levels = {
            TASK: 'task',
            ALLTASK: 'alltask',
            MYTASK: 'mytask'
        }

        //分配数量
        $scope.assignCount = {
            projectId: 1,
            amount: $scope.amount || '',
            groupId: 1,
            seatNo: 8001,
            // customerId: 1,
            taskIds: []
        }

        //
        $scope.resident = {
            residentName: "",
            registerPhoneNo: "",
            signedDoctorName: ""
        }

        $scope.openTab = () => {
            $state.go('main.applyhistory');
            $scope.$emit('routeAdd', '超额申请历史记录', 'main.applyhistory');
        }


        //筛选条件
        $scope.levelRouteText = $location.path().split('/')[2] // $scope.levelRouteText

        switch ($scope.levelRouteText) {
            case $scope.levels.TASK:
                TASK_API.getPage($scope.defaultPager).then(setPager);
                break;
            case $scope.levels.ALLTASK:
                TASK_API.getAllTaskData($scope.defaultPager, $scope.assignCount, $scope.resident).then(setPager);
                break;
            case $scope.levels.MYTASK:
                TASK_API.getMyTaskData($scope.defaultPager, $scope.assignCount, $scope.resident).then(setPager);
                break;
        }

        $scope.result = [];
        $scope.allCheckStatus = false;
        //  全选
        $scope.allChecked = function() {
            $scope.allCheckStatus = !$scope.allCheckStatus;
            if ($scope.allCheckStatus) {
                $scope.rowCollection.forEach(item => (item.isSelected = true));
            } else {
                $scope.rowCollection.forEach(item => (item.isSelected = false));
            }
        };

        $scope.gotoDeTail = function(event, taskId) {
            event.stopPropagation();
            $state.go('main.taskDetails', { 'taskId': taskId, 'thisRoute': $scope.levelRouteText });
        };

        $scope.showAllotBox = false;
        $scope.allotSelect = false;

        $scope.getChecked = function(assignCount) {
            $scope.assignCount.taskIds = $scope.result = $scope.rowCollection.filter(item => item.isSelected).map(item => item.taskId);
            if (assignCount) {
                $scope.showAllotBox = true;
                $scope.allotSelect = true;
                $scope.assignCount.amount = assignCount;
                if ($scope.assignCount.taskIds) {
                    $scope.rowCollection.forEach(item => item.isSelected = false)
                    $scope.assignCount.taskIds = '';
                } else {

                }
            } else {
                $scope.showAllotBox = true;
                $scope.allotSelect = true;
                // TASK_API.taskIdsGather($scope.assignCount) 
            }
        };

        $scope.closeAllotBox = (() => {
            $scope.showAllotBox = false;
            $scope.allotGroupId = '';
        });

        $scope.allotConfirm = (() => {

            if (!($scope.allotGroupId.length > 0)) {
                if ($scope.assignCount.taskIds) {
                    TASK_API.taskIdsGather($scope.assignCount)
                } else {
                    if ($scope.assignCount.amount) {
                        $scope.rowCollection.forEach(item => item.isSelected = false)
                        TASK_API.allotTaskTo($scope.assignCount)
                    } else {

                    }
                }
                $scope.allotSelect = false;
            } else {
                // $scope.assignCount.groupId = $scope.selectedId
                if ($scope.assignCount.taskIds) {
                    TASK_API.selectedAssign($scope.assignCount);
                } else {
                    TASK_API.batchAssignment($scope.assignCount);
                }
                $scope.allotSelect = false;
            }
        });

        //select change
        $scope.groupOnChange = function(value) {
            if (value === '公共池') {
                $scope.allotGroupId = '';
            } else {
                $scope.selectedTxt = value;
                $scope.assignCount.groupId = $scope.allotGroupData.filter(item => item.customerGroupName === value).map(item => item.customerGroupId);
                TASK_API.getCustomerListByGroupId($scope.assignCount).then(setGroupId);
            }
        };

        $scope.groupIdOnChange = function(id) {
            $scope.assignCount.customerId = $scope.allotCustomerIdData.filter(item => item.seatNo === id).map(item => item.customerId);
            $scope.selectedId = id;
            // $scope.assignCount.seatNo = id;
        };


        //分页
        $scope.splitpage = function(current, pageSize) {
            if (current && pageSize) {
                switch ($scope.levelRouteText) {
                    case $scope.levels.TASK:
                        TASK_API.getPage({ current, pageSize }).then(setPager);
                        break;
                    case $scope.levels.ALLTASK:
                        TASK_API.getAllTaskData({ current, pageSize }, $scope.assignCount, $scope.resident).then(setPager);
                        break;
                    case $scope.levels.MYTASK:
                        TASK_API.getMyTaskData({ current, pageSize }, $scope.assignCount, $scope.resident).then(setPager);
                        break;
                }
            }
        };

        $scope.pageData = {
            itemsPerPage: 30, //当前页
            itemsCount: '', //总数
            maxNumbers: 3
        }

        //收索
        $scope.seachTask = function(username, usertel, userdoc) {
            $scope.resident.residentName = username;
            $scope.resident.registerPhoneNo = usertel;
            $scope.resident.signedDoctorName = userdoc;

            switch ($scope.levelRouteText) {
                case $scope.levels.ALLTASK:
                    TASK_API.getAllTaskData($scope.defaultPager, $scope.assignCount, $scope.resident).then(setPager);
                    break;
                case $scope.levels.MYTASK:
                    TASK_API.getMyTaskData($scope.defaultPager, $scope.assignCount, $scope.resident).then(setPager);
                    break;
            }
        }

        //打电话/呼叫
        $scope.taskCallTel = function(event, telnum) {
            event.stopPropagation();
            const params = {
                cmdsn: '102',
                seatno: getCookie('userName'),
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
                seatno: getCookie('userName'),
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