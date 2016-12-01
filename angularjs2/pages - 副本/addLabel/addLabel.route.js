routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('addLabel', {
            url: '/addLabel',
            views: {
                'addLabel': {
                    template: require('./addLabel.html')
                }
            }
        });
}

export default routes;