routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('page2.page3', {
            url: '/page3',
            views: {
                'page3': {
                    templateProvider: ($q) => {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./page3.html'))
                            }, 'page3');
                        });
                    },
                }
            },
            resolve: {
                loadMyCtrl: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./page3.js');
                            $ocLazyLoad.load({ name: 'page3' });
                            resolve(module.controller);
                        }, 'page3');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }
            }
        })
}