import angular from 'angular';
import './paging.less';

export default angular.module("paging", [])
    .directive('paging', [() => {
        return {
            restrict: 'AE',
            scope: {
                data: '='
            },
            template: require('./paging.html'),
            replace: false,
            link(scope, element, attrs) {
                scope.data = scope.data || {}
                scope.data.onPageClick = scope.data.onPageClick || angular.noop
                scope.data.onPageSizeChange = scope.data.onPageSizeChange || angular.noop

                scope.pageLeft = []
                scope.pageRight = []

                scope.$watch('data.page', changePageLR)
                scope.$watch('data.pageSize', changePageLR)
                scope.$watch('data.count', changePageLR)

                scope.pagesizeOptions = [10, 20, 50, 100, 200, 300].map(v => {
                    return {text: String(v), value: v}
                })

                scope.pageClick = page => {
                    const totalPage = Math.ceil(scope.data.count / scope.data.pageSize)
                    page = Math.min(totalPage, Math.max(1, Math.ceil(page)))
                    scope.data.page = page
                    scope.data.onPageClick()
                }

                function changePageLR() {
                    const LEFT = [4, 3, 2, 1]
                    const RIGHT = [1, 2, 3, 4]
                    const {page, count, pageSize} = scope.data
                    const totalPage = Math.ceil(count / pageSize)

                    if (totalPage <= 5) {
                        // 1 0 4
                        // 2 1 3
                        // 3 2 2
                        // 4 3 1
                        // 5 4 0
                        scope.pageLeft = page - 1 > 0 ? LEFT.slice(1 - page) : []
                        scope.pageRight = RIGHT.slice(0, totalPage - page)
                    } else {
                        if (page == 1) {
                            scope.pageLeft = []
                            scope.pageRight = RIGHT.slice(0, 4)
                        } else if (page == 2) {
                            scope.pageLeft = LEFT.slice(-1)
                            scope.pageRight = RIGHT.slice(0, 3)
                        } else {
                            if (totalPage >= page + 2) {
                                scope.pageLeft = LEFT.slice(-2)
                                scope.pageRight = RIGHT.slice(0, 2)
                            } else {
                                let t = totalPage - page
                                scope.pageLeft = LEFT.slice(t - 4)
                                scope.pageRight = RIGHT.slice(0, t)
                            }
                        }
                    }
                }
            }
        };
    }])
    .name;