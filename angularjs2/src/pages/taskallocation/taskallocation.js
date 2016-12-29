import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-smart-table/dist/smart-table';
import WS from '../../utils/websocket';
import './taskallocation.less';
import $ from 'jquery';

export default angular.module('taskallocation', [uirouter])
    .service('taskallocationApi', ['$http', function($http) {
        return {
            /*获取任务列表*/
            get_tabledata(params) {
                return $http.get('/api/task/query/', { params })
            },
            /*获取项目id*/
            get_project(params) {
                return $http.get('/api/project/query/', { params })
            },
            /*获取登陆信息*/
            getCurrentUser() {
                return $http.get('/api/getCurrentUser/')
            },
            /*获取坐席*/
            getAllCustomer() {
                return $http.get('/api/getAllCustomer/')
            },
            /*任务分配*/
            post_allocation(params) {
                return $http.post('/api/task/save/even/', params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            }
        }

    }])

.factory('shareData', [function() {
    return {}
}])

.controller('taskallocation', ['taskallocationApi', '$scope', '$location', '$stateParams', '$state', 'shareData', function(Api, $scope, $location, $stateParams, $state, shareData) {
        var page = 1;
        $scope.doctorName = '';

        $scope.customerId = {
            options: [{ text: '8001', value: 8001 }, { text: '8002', value: 8002 }],
            selected: ''
        };
        $scope.pagesize = {
            options: [{ text: '10', value: '10' }, { text: '20', value: '20' }, { text: '50', value: '50' }, {
                text: '100',
                value: '30'
            }, { text: '200', value: '200' }, { text: '300', value: '300' }],
            selected: '10'
        };

        var projectdata = {
            page: 0,
            pageSize: 0,
        };

        $scope.projectid = {
            selected: ''
        };

        $scope.pagecount = {};
        /*获取坐席*/
        Api.getAllCustomer().then(res => {
            console.log(res.data.data);
            $scope.customerId = res.data.data;
        })

        Api.getCurrentUser().then(res => {
            console.log(res);
            shareData.userId = res.data.data.userId;
            console.log(shareData.userId);
        })
        Api.get_project(projectdata).then(res => {
            $scope.projectid.options = res.data.data;
        })

        function search() {
            var data = {
                projectId: $scope.projectid.selected || null,
                doctorName: $scope.doctorName || null,
                hospitalName: $scope.hospital || null,
                page: page,
                pageSize: $scope.pagesize.selected || '50',
                status: '0'
            }
            Api.get_tabledata(data).then(res => {
                $scope.pagecount = res.data.pager.count;
                $scope.tablecontent = res.data.data;
            })
        }

        $scope.aa = function() {
            page = xx;
            search();
        }

        $scope.changePagesize = () => {
            search()
        }

        $scope.clickCheckboxAll = () => {
            $scope.tablecontent.forEach(tc => tc._checked = $scope.checkall)
        }

        $scope.clickCheckbox = () => {
            $scope.checkall = $scope.tablecontent.every(tc => tc._checked)
        }

        $scope.openTask = () => {
            //xxx
            $scope.shade = true;
            $scope.grouping = true;
            // $('#modal-task').modal('show')
            var allocationdata = $scope.tablecontent.filter(tc => tc._checked)
                .map(tc => {
                    return tc.id
                })
            console.log(allocationdata);
            $scope.allocationcount = allocationdata.length;
            shareData.allocationdata = allocationdata.join(',');

            //     setTimeout(() =>  $('#modal-task').modal('hide'), 3* 1000)
        }

        $scope.allocation = () => {
            $scope.customer = $scope.customerId.selected
            var data = {
                status: '1',
                taskIds: shareData.allocationdata,
                customerId: $scope.customerId.selected,
                managerId: shareData.userId
            }
            Api.post_allocation(data).then(res => {
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

        $scope.search = search;

        search();

        /*跳转任务详情*/
        $scope.openTab = (tablerow) => {
            console.log(tablerow);
            var projectId = tablerow.projectId;
            var id = tablerow.id;
            var status = tablerow.status;
            $state.go('main.taskdetail', { 'taskId': id, 'projectId': projectId });
            $scope.$emit('routeAdd', '任务详情', 'main.taskdetail', { 'taskId': id, 'projectId': projectId });
        }

    }])
    .name;