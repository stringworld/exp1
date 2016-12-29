import uirouter from 'angular-ui-router';
import './login.less';

export default angular.module('login', [uirouter])
    .service('loginAPI', ['$http', function($http) {
        return {
            login(loginData) {
                return $http.post("/api/login/", loginData,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            }
        }
    }])
    .controller('login', ['$scope', 'loginAPI', '$state', '$sce', function($scope, loginAPI, $state, $sce) {
        
        $scope.loginData = {};
        $scope.isDisabled = false;
        $scope.loginBtn = $sce.trustAsHtml(`登&nbsp;&nbsp;录`)
        $scope.userLogin = function() {
            if ($scope.loginData.userId && $scope.loginData.password) {
                $scope.isDisabled = true;
                $scope.loginBtn = $sce.trustAsHtml(`登&nbsp;录&nbsp;中&nbsp;...`)
                loginAPI.login($scope.loginData).then(({ data }) => {
                    if (!data.code) {
                        $state.go('main', {});
                    } else {
                        $scope.loginData.password = '';
                        $scope.isDisabled = false;
                        $scope.loginBtn = $sce.trustAsHtml(`登&nbsp;&nbsp;录`)
                        $scope.errorMessage = data.errorMsg;
                    }
                }).catch(res => {
                    $scope.errorMessage = '网络异常';
                    $scope.loginBtn = $sce.trustAsHtml(`登&nbsp;&nbsp;录`)
                    $scope.isDisabled = false;
                });
            } else {
                $scope.errorMessage = '用户名和密码不能为空'
            }
        }
    }])

.name;