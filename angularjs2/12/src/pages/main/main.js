import uirouter from 'angular-ui-router';
import menuList_ from '../../components/menuList/menuList';
import callOutSystem from '../../components/callOutSystem/callOutSystem';
import splitPage from '../../components/splitPage/splitPage';
import './main.less';

export default angular.module('main', [uirouter, menuList_, callOutSystem, splitPage])
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

        $scope.show_menu = false;

        $scope.callOutData = {
            seatno:'8020',
            password:'123456',
            telno:'8020'
        }

        $scope.showLeftPush = function() {
            $scope.show_menu = true;
        };
        $scope.hideLeftPush = function() {
            $scope.show_menu = false;
        };
        
        $scope.splitPage = function(page,itemsPerPage){
           console.log(page)
           console.log(itemsPerPage);
        }
        $scope.pageData = {
            itemsPerPage: 10,
            itemsCount: 100,
            maxNumbers: 3
        }

        $scope.getIndex = function(pIndex, tIndex) {
            // alert("Hello " + pIndex + "--this" + tIndex);
            $scope.menudata[pIndex].isShow = false;
            $scope.levelTxt = $scope.menudata[pIndex].level[tIndex].levelTxt;
            $scope.levelRoute = $scope.menudata[pIndex].level[tIndex].levelRoute;
        }
        $scope.menuClose = function(index) {
            // alert(index)
            $scope.menudata[index].isShow = true;
        }

    }])
    .name;