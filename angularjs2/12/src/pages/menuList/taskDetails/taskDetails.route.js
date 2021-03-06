routes.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

export default function routes($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $stateProvider
        .state('main.taskDetails', {
            sticky: true,
            position: false,
            url: '/taskDetails',
            views: {
                'taskDetails': {
                    templateProvider: ($q) => {
                        return $q((resolve) => {
                            // lazy load the view
                            require.ensure([], () => {
                                return resolve(require('./taskDetails.html'));
                            }, 'taskDetails');
                        });
                    },
                }
            },
            resolve: {
                loadMyCtrl: ($q, $ocLazyLoad) => {
                    return $q((resolve) => {
                        require.ensure([], () => {
                            // load whole module
                            let module = require('./taskDetails.js');
                            $ocLazyLoad.load({ name: 'taskDetails' });
                            resolve(module.controller);
                        }, 'taskDetails');
                    });
                    //return $ocLazyLoad.load('pages/page1/page1.js');
                }
            }
        })
}