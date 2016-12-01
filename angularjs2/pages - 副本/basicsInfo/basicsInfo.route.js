routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('basicsInfo', {
            // position: true,
            // sticky: true,
            url: '/basicsInfo',
            views: {
                'basicsInfo': {
                    template: require('./basicsInfo.html')
                }
            }
        });
}

export default routes;