import React from 'react'
import TodoListItem from './todo-list-item'

const TodoList = () => {
    return (
        <ul>
            <li><TodoListItem label='Drink Coffee' important /></li>
            <li><TodoListItem label='Build React App' /></li>
        </ul>
    );
}

export default TodoList