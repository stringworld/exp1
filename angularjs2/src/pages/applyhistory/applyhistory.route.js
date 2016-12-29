routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main.applyhistory', {
            sticky: true,
            position: false,
            url: '/applyhistory?managerId&mine',
            views: {
                'applyhistory': {
                    templateProvider: ['$q', function($q) {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./applyhistory.html'));
                            }, 'applyhistory');
                        });
                    }],
                }
            },
            resolve: {
                loadMyCtrl: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./applyhistory.js');
                            $ocLazyLoad.load({ name: 'applyhistory' });
                            resolve(module.controller);
                        }, 'applyhistory');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }]
            }
        })
}