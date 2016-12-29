import angular from 'angular';
import angularPagination from './angular-pagination'
import './splitPage.less';
export default angular.module("splitPage", ['angularPagination'])
    .directive('splitPage', ['Pagination', function(Pagination) {
        return {
            restrict: 'AE',
            scope: { page: '=', changepage: '&' },
            template: require('./splitPage.html'),
            replace: true,
            link: function(scope, element, attrs) {
                scope.range = [10, 20, 30, 40, 50, 60];
                var currentpage = 1;
                var pagination;
                scope.$watch('page', function() {
                    pagination = scope.pagination = Pagination.create({
                        itemsPerPage: scope.page.itemsPerPage,
                        itemsCount: scope.page.itemsCount,
                        maxNumbers: scope.page.maxNumbers
                    });
                    pagination.onChange = function(page) {
                        currentpage = page;
                        scope.changepage({ current: page, itemsPerPage: pagination.itemsPerPage });
                    }

                }, true)

                scope.$watchCollection('[pagination.startPage, pagination.maxNumbers, pagination.itemsCount, pagination.itemsPerPage]', function() {
                    pagination.setCurrent(pagination.currentPage);
                    scope.changepage({ current: currentpage, itemsPerPage: pagination.itemsPerPage });
                });
            }
        };
    }])
    .name;


//组件数据类型
// $scope.pageData = {
//     itemsPerPage: 2, //当前页
//     itemsCount: 100, //总数
//     maxNumbers: 3
// }