import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-smart-table/dist/smart-table';
import WS from '../../utils/websocket';
import './returnvisit.less';
import $ from 'jquery';

export default angular.module('returnvisit', [uirouter])
    .service('returnvisitApi', ['$http', function ($http) {
        return {
            /*获取任务列表*/
            get_tabledata(params)
            {
                return $http.get('/api/task/query/', {params})
            },
            /*获取项目id*/
            get_project(params)
            {
                return $http.get('/api/project/query/', {params})
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
            post_allocation(params){
                return $http.post('/api/task/save/even/', params, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            }
        }

    }])

    .factory('shareData', [function () {
        return {}
    }])

    .controller('returnvisit', ['returnvisitApi', '$scope', '$location', '$stateParams', '$state', 'shareData', function (Api, $scope, $location, $stateParams, $state, shareData) {
        var page = 1;
        $scope.doctorName = '';
        $scope.pagesize = {
            options: [{text: '10', value: '10'}, {text: '20', value: '20'}, {text: '50', value: '50'}, {
                text: '100',
                value: '30'
            }, {text: '200', value: '200'}, {text: '300', value: '300'}],
            selected: '10'
        };

        var projectdata = {
            page: 0,
            pageSize: 0,
        };

        $scope.projectid = {
            selected: ''
        };

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
                managerId : shareData.userId,
                projectId: $scope.projectid.selected || null,
                customerId: $scope.customerId.selected || null,
                name: $scope.residentName || null,
                phone: $scope.residentPhone || null,
                doctorName: $scope.doctorName || null,
                hospitalName: $scope.hospital || null,
                page: page,
                pageSize: $scope.pagesize.selected || '50',
                status: '4,5'
            }
            Api.get_tabledata(data).then(res => {
                console.log(res.data.data);
                $scope.pagecount = res.data.pager.count;
                $scope.tablecontent = res.data.data;
            })
        }

        $scope.aa = function () {
            page = xx;
            search();
        }

        $scope.changePagesize = () => {
            search()
        }

        $scope.clickCheckboxAll = ()=> {
            $scope.tablecontent.forEach(tc => tc._checked = $scope.checkall)
            $scope.shade = true;
        }

        $scope.clickCheckbox = () => {
            $scope.checkall = $scope.tablecontent.every(tc => tc._checked)
        }

        $scope.taskover = (isAll) => {
            var allocationdata = $scope.tablecontent.filter(tc => tc._checked)
                .map(tc => {
                    return tc.id
                })
            console.log(allocationdata);
            $scope.allocationcount = allocationdata.length;
            shareData.allocationdata = allocationdata.join(',');
            var data = {
                status: '3',
                taskIds: isAll ? '' : shareData.allocationdata,
                customerId: '',
                managerId: shareData.userId
            }
            $scope.shade = false;
            Api.post_allocation(data).then(res => {
                console.log(res)
            })
        }

        $scope.closed = () => {
            $scope.shade = false;
        }

        $scope.search = search;

        search();
        /*任务详情*/
        $scope.openTab = (tablerow) => {
            console.log(tablerow);
            var projectId = tablerow.projectId;
            var id = tablerow.id;
            var returnvisit = "0";
            var reject = "0";
            $state.go('main.taskdetail', {
                'taskId': id,
                'projectId': projectId,
                'returnvisit': returnvisit,
                'reject': reject
            });
            $scope.$emit('routeAdd', '任务详情', 'main.taskdetail');
        }
        /*申请历史*/
        $scope.goApplyhistory = () => {
            $state.go('main.applyhistory', {'managerId': shareData.userId});
            $scope.$emit('routeAdd', '申请历史', 'main.applyhistory');
        }

        /*导出*/
        $scope.downloadexcel = () => {
            var data = {
                managerId:shareData.userId,
                status:'2'
            }
            var url = `/api/task/downloadExcel/?managerId=${shareData.userId}&status=2`;
            window.open(url);
            // Api.getdownloadExcel(data).then(res => {
            //         console.log(res);
            //     }
            // )
        }

    }])
    .name;