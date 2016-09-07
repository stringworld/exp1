import React, { findDOM, Component, PropTypes } from 'react';

export default class AddTodo extends Component {
    render() {
        return (
            <div>
                <input type="text" ref='input' />
                <button onclick={e => this.handleClick(e)}> 
                    add 
                </button>
            </div>
        )
    };
    handleClick(e){
        const node=findDOM(this.refs.input);
        const text=node.value.trime();
        this.props.onAddClick(text);
        node.value="";
    }
}

AddTodo.propTypes={
    onAddClick:PropTypes.func.isRequired
}
