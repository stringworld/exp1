routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('delLabel', {
            url: '/delLabel',
            views: {
                'delLabel': {
                    template: require('./delLabel.html')
                }
            }
        });
}

export default routes;