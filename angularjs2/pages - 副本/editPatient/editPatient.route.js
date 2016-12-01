routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('editPatient', {
            url: '/editPatient?tagname',
            views: {
                'editPatient': {
                    template: require('./editPatient.html')
                }
            }
        });
}

export default routes;