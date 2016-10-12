import login from './login/login.route';
import main from './main/main.route';
import page3 from './menuList/page3/page3.route';
import page4 from './menuList/page4/page4.route';
import task from './menuList/mission/task/task.route';
import alltask from './menuList/mission/alltask/alltask.route';
import mytask from './menuList/mission/mytask/mytask.route';


const pages = [login, main, page3, page4, task, alltask, mytask];
export default pages

// export default angular.module('app', [uirouter, routerextras,login])