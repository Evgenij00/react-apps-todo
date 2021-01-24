import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 100

    state = {
        todoData: [
            this.createTodoItem("Drink Coffee"),
            this.createTodoItem("Make Awesome App"),
            this.createTodoItem("Have a lunch"),
        ],
        term: '',
        filter: 'all' //all, active, done
    }
    
    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    addItem = (text) => {
        this.setState( ({todoData}) => {
            const newItem = this.createTodoItem(text)

            const newArr = [
                ...todoData,
                newItem,
            ]

            return {
                todoData: newArr,
            }
        })
    }

    deleteItem = (id) => {
        this.setState( ({ todoData }) => {
            const idx = todoData.findIndex( (el) => el.id === id )

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1),
            ]

            return {
                todoData: newArray,
            }
        })
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex( (el) => el.id === id )

        const oldItem = arr[idx]
        const newItem = {...oldItem, [propName]: !oldItem.[propName]}

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1),
        ]
    }

    onToggleImportant = (id) => {
        this.setState( ({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }

    onToggleDone = (id) => {
        this.setState( ({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    search(arr, term) {
        if (term.length === 0) { return arr }

        return arr.filter( (el) => el
            .label.toLowerCase()
            .includes(term.toLowerCase()))
    }

    filter(arr, filter) {
        switch(filter) {
            case 'all':
                return arr
            case 'active':
                return arr.filter((el) => !el.done)
            case 'done':
                return arr.filter((el) => el.done)
            default:
                return arr
        }
    }

    onTodoSearch = (term) => {
        this.setState({
            term,
        })
    }

    onFilterChange = (filter) => {
        this.setState({
            filter,
        })
    }

    render() {
        const { todoData, term, filter } = this.state

        const visibleItems = this.filter(
            this.search(todoData, term),
            filter
        )

        const doneCount = todoData.filter( (el) => el.done ).length
        const todoCount = todoData.length - doneCount

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
            
                <div className="top-panel d-flex">
                    <SearchPanel 
                        onTodoSearch={ this.onTodoSearch }
                    />
                    <ItemStatusFilter 
                        filter={filter}
                        onFilterChange={ this.onFilterChange }
                    />
                </div>
            
                <TodoList todos={ visibleItems } 
                    onDeleted={ this.deleteItem }
                    onToggleDone={ this.onToggleDone }
                    onToggleImportant={ this.onToggleImportant }
                />

                <ItemAddForm onItemAdded={ this.addItem } />
            </div>
        )
    }
}