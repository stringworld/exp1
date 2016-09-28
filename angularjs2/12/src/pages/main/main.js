import uirouter from 'angular-ui-router';
import menuList_ from '../../component/menuList/menuList';
import './main.less';

export default angular.module('main', [uirouter, menuList_])
    .service('MAIN_API', ['$http', function($http) {
        return {
            get_data: function() {
                const config = { params: { userdata: 'stone' } };
                return $http.get('/getlist/menuList', config);
            }
        }
    }])
    .controller('e_call_main', ['MAIN_API', '$scope', function(MAIN_API, $scope) {
        MAIN_API.get_data().then(response => {

            console.log(response, '--------------------------');
            $scope.menudata = response.data;

        })

        // 


        $scope.show_menu = false;

        $scope.showLeftPush = function() {
            $scope.show_menu = true;
        };
        $scope.hideLeftPush = function() {
            $scope.show_menu = false;
        };


        $scope.sayHello = function(name) {
            // alert("Hello " + $scope.menudata[name].menuText);
            $scope.menudata[name].isShow = false;
        }
        $scope.menuClose = function(index) {
            // alert(index)
            $scope.menudata[index].isShow = true;
        }

    }])
    .name;