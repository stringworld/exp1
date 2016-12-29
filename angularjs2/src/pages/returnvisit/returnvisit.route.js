routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main.returnvisit', {
            sticky: true,
            position: false,
            url: '/returnvisit',
            views: {
                'returnvisit': {
                    templateProvider: ['$q', function($q) {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./returnvisit.html'));
                            }, 'returnvisit');
                        });
                    }],
                }
            },
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./returnvisit.js');
                            $ocLazyLoad.load({ name: 'returnvisit' });
                            resolve(module.controller);
                        }, 'returnvisit');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }]
            }
        })
}