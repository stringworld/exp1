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
    .controller('login', ['$scope', 'loginAPI', function ($scope, loginAPI) {
        const {username, password} = $scope;
        loginAPI.getData({username, password}).then(({data}) => {
            if (data && data.isSuccess) {
                console.log('登录成功');
            }
            else {
                console.log('登录失败');
                console.log(data.errorMessage)
            }
        });

    }])

    .name;