routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
    $stateProvider
        .state('patientsLabel', {
            url: '/patientsLabel',
            views: {
                'patientsLabel': {
                    template: require('./patientsLabel.html')
                }
            }
        });
}

export default routes;