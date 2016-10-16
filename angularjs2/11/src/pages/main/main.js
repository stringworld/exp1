import angular from 'angular';
import uirouter from 'angular-ui-router';
import menuList from '../../components/menuList/menuList';
import callOutSystem from '../../components/callOutSystem/callOutSystem';
import splitPage from '../../components/splitPage/splitPage';
import choiceBox from '../../components/choiceBox/choiceBox';
import './main.less';


export default angular.module('main', [uirouter, menuList, callOutSystem, splitPage, choiceBox])
    .controller('index', ['$scope', function($scope) {
        $scope.callOutData = {
            seatno: '8020',
            password: '123456',
            telno: '8020'
        };
        $scope.pageData = {
                itemsPerPage: 10,
                itemsCount: 100,
                maxNumbers: 3
            }
            // $scope.getIndex = function(levelTxt, levelRoute) {
            //     alert(123);
            //     $scope.levelTxt = $scope.menudata[mainIndex].level[subIndex].levelTxt;
            //     $scope.levelRoute = $scope.menudata[mainIndex].level[subIndex].levelRoute;
            //     $scope.menuClose();
            // };
    }])
    .name;