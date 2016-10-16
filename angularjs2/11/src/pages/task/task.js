import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-smart-table/dist/smart-table';
import './task.less';

export default angular.module('task', [uirouter, 'smart-table'])
    .service('TASK_API', ['$http', function($http) {
        return {
            getPage({
                    pageSize, current
                }) {
                    const config = {
                        params: {
                            pageSize, current
                        }
                    };
                    return $http.get('/getlist/taskdata', config).then(({
                        data
                    }) => {
                        return data && data[0] || {};
                    });
                },
                getAllTaskData({
                    pageSize, current
                }) {
                    const config = {
                        params: {
                            pageSize, current
                        }
                    };
                    return $http.get('/getlist/alltaskdata', config).then(({
                        data
                    }) => {
                        return data && data[0] || {};
                    });
                },
                getMyTaskData({
                    pageSize, current
                }) {
                    const config = {
                        params: {
                            pageSize, current
                        }
                    };
                    return $http.get('/getlist/mytaskdata', config).then(({
                        data
                    }) => {
                        return data && data[0] || {};
                    });
                }
        }
    }])
    .controller('tableCtrl', ['TASK_API', '$scope', '$stateParams', '$state', '$q', function(TASK_API, $scope, $stateParams, $state, $q) {
        function setPager({
            tableTitle, rowCollection
        }) {
            $scope.tableTitle = tableTitle;
            $scope.rowCollection = rowCollection;
            $scope.pageData.itemsCount = 100;
        }

        $scope.defaultPager = {
            current: 1,
            pageSize: 30
        };

        $scope.isHidden = $stateParams.levelRoute;

        switch ($stateParams.levelRoute) {
            case "task":
                $scope.allotGroup = ['第一组', '第二组', '第三组'];
                $scope.allotGroupId = [8001, 8002, 8003, 8004];
                TASK_API.getPage($scope.defaultPager).then(setPager);
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

        $scope.goBack = function(event) {
            event.stopPropagation();
            alert(event)
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
                        TASK_API.getPage({
                            page, pageSize
                        }).then(setPager);
                        break;
                    case "alltask":
                        TASK_API.getAllTaskData({
                            page, pageSize
                        }).then(setPager);
                        break;
                    case "mytask":
                        TASK_API.getMyTaskData({
                            page, pageSize
                        }).then(setPager);
                        break;
                }
            }
        };
        $scope.pageData = {
            itemsPerPage: 10,
            itemsCount: '',
            maxNumbers: 3
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