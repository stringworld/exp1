routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main.mytask', {
            sticky: true,
            position: false,
            url: '/mytask',
            views: {
                'mytask': {
                    templateProvider: ($q) => {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./mytask.html'));
                            }, 'mytask');
                        });
                    },
                }
            },
            resolve: {
                loadMyCtrl: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./mytask.js');
                            $ocLazyLoad.load({ name: 'mytask' });
                            resolve(module.controller);
                        }, 'mytask');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }
            }
        })
}