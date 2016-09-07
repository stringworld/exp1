import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTERS, VisibilityFilters } from 'actions/actions';

const { SHOW_ALL } = VisibilityFilters;

//默认显示全部
function VisibilityFilters(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTERS:
            return action.filters;
        default:
            return state;
    }
}

//显示匹配的
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state, { // reduces合成
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index == action.index) {
                    return Object.assgin({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state;
    }
}

//暴露出方法   combinereducers 用来生成一个函数，进行调用一系列的 reduces
const todoApp = combinereducers({
    VisibilityFilters,
    todos
})

export default todoApp