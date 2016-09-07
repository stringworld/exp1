import React, { Component, PropTypes } from 'react';

export default class Todo extends Component {
    render() {
        return (
            <li
                onclick={this.props.onClick}
                style={{
                    textDecoration:this.props.completed?'line-througn':'none',
                    cursor:this.props.completed?'default':'pointer'
                }}
            >
            {this.props.text}
            </li>
        )
    }
}
Todo.propTypes={
    onClick:PropTypes.func.isRequired,
    text:PropTypes.string.isRequired,
    completed:PropTypes.bool.isRequired
}