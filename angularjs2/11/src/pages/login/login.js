import uirouter from 'angular-ui-router';
import './login.less';

export default angular.module('login', [uirouter])
    .service('loginAPI', ['$http', function ($http) {
        return {
            login (loginData) {
                const config = {params: loginData};
                return $http.get('/login/error', config);
            }
        }
    }])
    .controller('login', ['$scope', 'loginAPI', function($scope, loginAPI) {
        $scope.loginData = {}
        $scope.userLogin = function(){
            loginAPI.login($scope.loginData).then(response => {
                if(response.data.isSuccess){
                    console.log('登录成功');
                    $state.go('main', {roleId: '235'});
                }else{
                    console.log('登录失败');
                    $scope.errorMessage = response.data.errorMessage;
                }
            });            
        }
    }])

    .name;
