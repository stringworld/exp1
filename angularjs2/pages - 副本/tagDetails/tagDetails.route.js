routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('tagDetails', {
            url: '/tagDetails?tagname',
            views: {
                'tagDetails': {
                    template: require('./tagDetails.html')
                }
            }
        });
}

export default routes;