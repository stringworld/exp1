routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('editLabel', {
            url: '/editLabel?tagname',
            views: {
                'editLabel': {
                    template: require('./editLabel.html')
                }
            }
        });
}

export default routes;