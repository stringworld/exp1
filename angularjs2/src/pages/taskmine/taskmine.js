import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-smart-table/dist/smart-table';
import WS from '../../utils/websocket';
import './taskmine.less';
import $ from 'jquery';

export default angular.module('taskmine', [uirouter])
    .service('taskmineApi', ['$http', function ($http) {
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
            /*超额申请*/
            post_applyForoverfulfile(params){
                return $http.post('/api/applyFor/initiate/', params, {
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

    .controller('taskmine', ['taskmineApi', '$scope', '$location', '$stateParams', '$state', 'shareData', function (Api, $scope, $location, $stateParams, $state, shareData) {
        var page = 1;
        $scope.doctorName = '';

        $scope.customerId = {
            options: [{text: '8001', value: 8001}, {text: '8002', value: 8002}],
            selected: ''
        };
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

        /*获取managerId*/
        Api.getAllCustomer().then(res => {
            var array = res.data.data ;
            for (var i = 0; i < array.length; i++) {
                if (typeof array[i] == "object" && array[i].role === 1) {
                    shareData.managerId = array[i].userId;
                    return;
                }
            }
        })

        Api.getCurrentUser().then(res => {
            console.log(res);
            shareData.userId = res.data.data.userId;
            shareData.seatId = res.data.data.seatId;
            shareData.telephoneNumber = res.data.data.telephoneNumber;
            console.log(shareData.userId);
        })
        Api.get_project(projectdata).then(res => {
            $scope.projectid.options = res.data.data;
        })

        function search() {
            var data = {
                projectId: $scope.projectid.selected || null,
                name: $scope.residentName || null,
                phone: $scope.residentPhone || null,
                doctorName: $scope.doctorName || null,
                hospitalName: $scope.hospital || null,
                customerId: shareData.userId,
                page: page,
                pageSize: $scope.pagesize.selected || '50',
                status: '0'
            }
            Api.get_tabledata(data).then(res => {
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
        /*超额申请*/
        $scope.allocation = () => {
            // $scope.customer = $scope.customerId.selected
            var data = {
                customerId: shareData.userId,
                managerId: shareData.managerId,
                note: $scope.applyReason
            }
            Api.post_applyForoverfulfile(data).then(res => {
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
        /*t填写问卷*/
        $scope.openTab = (tablerow) => {
            console.log(tablerow);
            var projectId = tablerow.projectId;
            var id = tablerow.id;
            $state.go('main.taskdetail', {'taskId': id, 'projectId': projectId, 'edit': true});
            $scope.$emit('routeAdd', '填写问卷', 'main.taskdetail');
        }
        /*申请历史*/
        $scope.goApplyhistory = () => {
            $state.go('main.applyhistory', {'managerId': shareData.userId,mine:true});
            $scope.$emit('routeAdd', '申请历史', 'main.applyhistory');
        }

        $scope.dial = function (phone, tablerow) {
            $scope.openTab(tablerow)();
            const params = {
                cmdsn: tablerow.id,
                seatno: shareData.seatId,
                caller: shareData.telephoneNumber,
                para: phone,
                cmd: '3'
            };
            new WS().say(params)
                .then(() => {
                    // scope.showMsg('呼叫成功');
                    // scope.$digest();
                }, function () {

                });
        }

    }])
    .name;