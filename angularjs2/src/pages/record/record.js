import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-smart-table/dist/smart-table';
import audioplay from '../../components/audioplay/audioplay';

import paging from '../../components/paging/paging'
import './record.less';

export default angular.module('record', [uirouter, 'smart-table', audioplay, paging])
    .service('record_api', ['$http', function($http) {
        return {
            /*获取所有录音*/
            get_AllCallRecords(params) {
                return $http.get('/api/queryAllCallRecords/', { params })
            },
            /*获取所有坐席*/
            getAllCustomer() {
                return $http.get('/api/getAllCustomer/')
            },
            /*获取登陆信息*/
            getCurrentUser() {
                return $http.get('/api/getCurrentUser/')
            },
            /*获取项目id*/
            get_project(params) {
                return $http.get('/api/project/query/', { params })
            },
        }

    }])

.factory('shareData', [function() {
    return {}
}])

.controller('record', ['record_api', '$scope', '$stateParams', '$state', 'shareData', function(Api, $scope, $stateParams, $state, shareData) {

        $scope.paging = {
            page: 1,
            pageSize: 10,
            count: 0,
            onPageClick: () => search(),
            onPageSizeChange: () => search()
        }

        $scope.play = src => {
                src = 'http://192.168.0.118:8086/' + src
                $scope.$broadcast('components:audioplay:play', { src })
            }
            /*获取项目编号*/
        var projectdata = {
            page: 0,
            pageSize: 0,
        };
        $scope.projectid = {
            selected: ''
        };
        Api.get_project(projectdata).then(res => {
            console.log(res.data);
            $scope.projectid.options = res.data.data;
        })

        /*获取坐席*/
        $scope.customerId = {
            selected: ''
        };
        Api.getAllCustomer().then(res => {
            $scope.customerId.options = res.data.data;
        })

        /*获取登陆信息*/
        Api.getCurrentUser().then(res => {
            shareData.userId = res.data.data.userId;
        })

        function search() {
            var data = {
                endTime: '2017-1-12 19:14:10',
                page: $scope.paging.page,
                pageSize: $scope.paging.pageSize,
                projectId: $scope.projectid.selected || null,
                residentName: $scope.residentName || null,
                residentPhone: $scope.residentPhone || null,
                startTime: '2015-07-07 19:14:14',
                customerId: $scope.customerId.selected || null,
                taskId: $scope.taskId || null,
            }
            Api.get_AllCallRecords(data).then(res => {
                if (res.data.code === 1) {
                    $scope.paging.count = 0;
                    alert('系统异常')
                } else {
                    $scope.tablecontent = res.data.data;
                    $scope.paging.count = res.data.pager.count;
                }
            })
        }

        $scope.search = search;

        search();

    }])
    .name;