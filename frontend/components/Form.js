import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id="todoForm" onSubmit={this.props.onTodoSubmit}>
          <input
            onChange={this.props.onInputChange}
            value={this.props.nameInput}
            type="text"
            placeholder='Type todo'>
          </input>
          <button type="submit">Submit</button> <br />
          <button type="button"
            onClick={this.props.toggleDisplayCompleted}
          >
            {this.props.displayCompleted ? 'Hide' : 'Show'} Completed
          </button>
        </form>
      </>
    )
  }
}
