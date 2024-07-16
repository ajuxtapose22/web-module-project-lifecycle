import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    input: '', 
  }
  onInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, input: value })
  }
  postNewTodo = () => {
    axios.post(URL, { name: this.state.input })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.setState({ ...this.state, input: '' })
      })
      .catch(err => {
        this.setState({ ...this.state, error: err.response.data.message})
      })
  }
  onTodoSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
  }
  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data})
      })
      .catch(err => {
        this.setState({ ...this.state, error: err.response.data.message})
      })
  }
  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
      this.setState({ 
        ...this.state, todos: this.state.todos.map(todo => {
          if (todo.id !== id) return todo
          return res.data.data
        })
      })
    })
    .catch(res => {
      this.setState({ ...this.state, error: err.response.data.message})

    })
  }
  componentDidMount() {
    this.fetchAllTodos()
  }
  render() {
    return (
      <div>
        <div id="error">{this.state.error}</div>
        <div id="todos">
          <h2>Todos: </h2>
          {
            this.state.todos.map(todo => {
              return <div 
              onClick={this.toggleCompleted(todo.id)} 
              key={todo.id}>{todo.name} {todo.completed ? '✔️' : ''}</div>
            })
          }
        </div>
        <form id="todoForm" onSubmit={this.onTodoSubmit}>
          <input 
            onChange={this.onInputChange} 
            value={this.state.input} 
            type="text"
            placeholder='Type todo'>
          </input>
          <button type="submit">Submit</button>
          <button>Clear Completed</button>
        </form>
      </div>      
    )
  }
}

