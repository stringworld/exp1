import { createStore } from 'redux';
import todoApp from './reduces/reduces';

let store = createStore(todoApp);

import { addToDo, toggleToDo, setVisbilityFilters, VisbilityFilters } from './actions/actions';

console.log(store.getState())