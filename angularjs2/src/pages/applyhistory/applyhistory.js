import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-smart-table/dist/smart-table';
import WS from '../../utils/websocket';
import './applyhistory.less';
import $ from 'jquery';
import moment from 'moment';

export default angular.module('applyhistory', [uirouter])
    .service('applyhistoryApi', ['$http', function ($http) {
        return {
            /*申请历史*/
            get_applyFor(params){
                return $http.get(
                    '/api/applyFor/query/', {params}
                )
            },
            /*获取坐席*/
            getAllCustomer() {
                return $http.get('/api/getAllCustomer/')
            }
        }

    }])

    .factory('shareData', [function () {
        return {}
    }])

    .controller('applyhistory', ['applyhistoryApi', '$scope', '$location', '$stateParams', '$state', 'shareData', function (Api, $scope, $location, $stateParams, $state, shareData) {

        var page = 1;

        $scope.mine = $stateParams.mine;
        $scope.customerId = []

        $scope.isRead = {
            options: [{text: "未读", value: '0'}, {text: "已读", value: '1'}],
            selected: ''
        };

        $scope.pagesize = {
            options: [{text: '10', value: '10'}, {text: '20', value: '20'}, {text: '50', value: '50'}, {
                text: '100',
                value: '30'
            }, {text: '200', value: '200'}, {text: '300', value: '300'}],
            selected: '10'
        };

        Api.getAllCustomer().then(res => {
            console.log(res.data.data);
            $scope.customerId = res.data.data;
        })

        function search() {
            var data = {
                page: page,
                pageSize: $scope.pagesize.selected || '50',
            };
            //我的任务申请历史参数
            if ($scope.mine) {
                data.customerId = shareData.userId;
                data.time = $scope.applyDate ? moment($scope.applyDate).format('YYYY-MM') : '';
                data.isRead = $scope.isRead.selected || null;
            } else {
                //所有任务申请历史参数
                data.customerId = $scope.customerId.selected || '';
                data.time = $scope.applyDate ? moment($scope.applyDate).format('YYYY-MM') : '';
                data.isRead = $scope.isRead.selected || null;
                data.managerId = $stateParams.managerId || null;
            }
            Api.get_applyFor(data).then(res => {
                console.log(res);
                if (res.data.data) {
                    $scope.pagecount = res.data.pager.count;
                    $scope.tablecontent = res.data.data;
                } else {
                    $scope.tablecontent = {};
                    $scope.pagecount = 0;
                }
                console.log(res.data.data);

            })
        }

        $scope.search = search;

        search();

    }])
    .name;