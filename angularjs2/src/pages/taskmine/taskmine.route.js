routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main.taskmine', {
            sticky: true,
            position: false,
            url: '/taskmine',
            views: {
                'taskmine': {
                    templateProvider: ['$q', function($q) {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./taskmine.html'));
                            }, 'taskmine');
                        });
                    }],
                }
            },
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./taskmine.js');
                            $ocLazyLoad.load({ name: 'taskmine' });
                            resolve(module.controller);
                        }, 'taskmine');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }]
            }
        })
}