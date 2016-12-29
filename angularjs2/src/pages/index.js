import login from './login/login.route';
import main from './main/main.route';
import taskDetails from './taskDetails/taskDetails.route';
import taskdetail from './taskdetail/taskdetail.route';
import task from './task/task.route';
import alltask from './task/alltask.route';
import mytask from './task/mytask.route';
import console from './console/console.route';
import record from './record/record.route';
import questionnaire from './questionnaire/questionnaire.route';
import taskallocation from './taskallocation/taskallocation.route';
import taskall from './taskall/taskall.route';
import applyhistory from './applyhistory/applyhistory.route';
import taskmine from './taskmine/taskmine.route';
import returnvisit from './returnvisit/returnvisit.route';
import returnvisitmine from './returnvisitmine/returnvisitmine.route';


const pages = [login, main, taskDetails, taskdetail, task, alltask, mytask, console, record, questionnaire, taskallocation, taskall, applyhistory, taskmine, returnvisit, returnvisitmine];
export default pages;

// export default angular.module('app', [uirouter, routerextras,login])