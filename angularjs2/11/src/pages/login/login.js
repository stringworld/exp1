import uirouter from 'angular-ui-router';
import './login.less';

export default angular.module('login', [uirouter])
    .service('loginAPI', ['$http', function ($http) {
        return {
            getData ({username, password}) {
                const config = {params: {username, password}};
                return $http.get('/login/error', config)
            }
        }
    }])
    .controller('login', ['$scope', 'loginAPI','$location', function($scope, loginAPI,$location) {
        loginAPI.username = $scope.userName;
        loginAPI.password = $scope.passWord;
        $scope.userLogin = function(){
            loginAPI.get_data().then(response => {
                if(response.data.isSuccess){
                    console.log('登录成功');
                    $state.go('main', {key: 'value'});
                }else{
                    console.log('登录失败');
                    $scope.errorMessage = response.data.errorMessage;
                }
            });            
        }
    }])

    .name;
