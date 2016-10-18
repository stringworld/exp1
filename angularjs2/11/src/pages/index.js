import login from './login/login.route';
import main from './main/main.route';
import taskDetails from './taskDetails/taskDetails.route';
import page4 from './menuList/page4/page4.route';
import task from './task/task.route';
import alltask from './menuList/mission/alltask/alltask.route';
import mytask from './menuList/mission/mytask/mytask.route';


const pages = [login, main, taskDetails, page4, task, alltask, mytask];
export default pages

// export default angular.module('app', [uirouter, routerextras,login])