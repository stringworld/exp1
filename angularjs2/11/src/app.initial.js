import fastClick from 'fastclick'
initial.$inject = ['$rootScope', '$state', '$stateParams'];
export default function initial($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.pageClassValue = {
        nextPage: 'nextPage',
        prePage: 'prePage',
        time: 600
    };
    $rootScope.showloading = true;
    $rootScope.cookie = document.cookie;
    $rootScope.pageClass = {
        index: $rootScope.pageClassValue.nextPage,
        list: $rootScope.pageClassValue.nextPage,
        detail: $rootScope.pageClassValue.nextPage,
        detailInfo: $rootScope.pageClassValue.nextPage
    };
    //触摸延迟解决

    fastClick.attach(document.body);
    const statePosition = {};
    $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
        $rootScope.showloading = true;
        var fromStringParams = JSON.stringify(fromParams)
        //记录url对应的位置
        if (fromState.name && fromState.position) {
            statePosition[fromState.name + fromStringParams] = window.scrollY;
        }
    });
    $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
    });
    $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
        $rootScope.showloading = false;
        const ToStringParams = JSON.stringify(toParams);
        setTimeout(function () {
            //alert(statePosition[toState.name]);
            window.scrollTo(0, toState.position ? statePosition[toState.name + ToStringParams] : 0)
        }, 0);
    })
}