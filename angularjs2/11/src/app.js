import 'bootstrap/dist/css/bootstrap.css';
import './common/css/main.less';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import routerextras from 'app.routerextras';
import ocLazyLoad from 'oclazyload';


import routing from './app.config';
import initial from './app.initial';


//routers
import routes from './pages/index';


const app = angular.module( 'app', [uirouter, routerextras, ocLazyLoad])
    .run(initial)
    .config(routing);
routes.forEach((ele, index) => {
    app.config(ele);
})

if (module.hot) {
    //module.hot.accept();
    module.hot.status(function(newStatus, oldStatus) {
        console.log('***' + newStatus)
        document.location.reload(true)
    });
}
