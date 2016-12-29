routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main', {
            url: '/main?roleId',
            views: {
                'main': {
                    templateProvider: ['$q', function($q) {
                        return $q(resolve => (
                            // lazy load the view
                            require.ensure([], () => resolve(require('./main.html')), 'main')
                        ))
                    }],
                }
            },
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            const { controller } = require('./main.js');
                            $ocLazyLoad.load({ name: 'main' });
                            resolve(controller);
                        }, 'main');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }]
            }
        })
}