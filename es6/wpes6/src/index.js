// export default class Library {
//   constructor() {
//     this._name = 'Library';
//   }
//   get name() {
//     return this._name;
//   }
// }

import { person } from './test.js';
// import React, {Component} from 'react';

import Redux,{combineReducers} from 'redux';

var p = new person('zhang', 20);

console.log(p.multiply(1, 4));
console.log(p.name);
console.log(p.age);
// console.log(p.getName(2, 4))
// console.log(age)

function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

/**
 *  使reducer可鉴别，只处理有一致标识符的action
 */
function identify(identifier, reducer) {
  return function identifiable(state, action) {
    //!important undefined 代表是初始化,需要返回缺省状态，直接委托给原reducer
    let initState = null; 
    if (typeof state === 'undefined') {
      initState = reducer(state, action);
    }

    let nextState = action.identifier === identifier 
      ? reducer(state, action)
      : state;
      
    return initState !== null ? initState : nextState;
  };
}

let rootReducer = Redux.combineReducers({
      countOne: identify('one',counterReducer),
      countTwo: identify('two',counterReducer)
    });

let store = Redux.createStore(rootReducer);
let valueEl = document.getElementById('value1');
let valueE2 = document.getElementById('value2');

function render() {
  console.log(store.getState());
  valueEl.innerHTML = store.getState().countOne.toString();
  valueE2.innerHTML = store.getState().countTwo.toString();
}

render();

store.subscribe(render);

function handleInc(id) {
  return function inc() {
    store.dispatch({
      type: 'INCREMENT',
      identifier: id
    });
  };
}

function handleDec(id) {
  return function inc() {
    store.dispatch({
      type: 'DECREMENT',
      identifier: id
    });
  };
}

Array.from(
  document.getElementsByName('increment')
).forEach((ele) => {
  ele.addEventListener('click', handleInc(ele.dataset['id']));
});

Array.from(
  document.getElementsByName('decrement')
).forEach((ele) => {
  ele.addEventListener('click', handleDec(ele.dataset['id']));
});




