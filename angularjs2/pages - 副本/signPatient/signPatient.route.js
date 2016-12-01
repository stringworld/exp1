routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('signPatient', {
            // position: true,
            // sticky: true,
            url: '/signPatient',
            views: {
                'signPatient': {
                    template: require('./signPatient.html')
                }
            }
        });
}

export default routes;