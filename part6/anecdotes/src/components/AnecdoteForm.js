import React from 'react'
import { createAction } from '../reducers/anecdoteReducer'
import { notificationAction } from '../reducers/notificationReducer'

import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault()
    const content = event.target.createAnecdote.value
    event.target.createAnecdote.value = ''

    const newAnecdote = {
      content: content,
    }

    props.createAction(newAnecdote)
    props.notificationAction(`you added '${content}'`, 10)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name='createAnecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAction,
  notificationAction,
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const ConnectedAnecdotesForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteForm)
export default ConnectedAnecdotesForm
