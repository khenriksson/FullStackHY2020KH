import React from 'react'
import { useDispatch } from 'react-redux'
import { createAction } from '../reducers/anecdoteReducer'
import { notificationAction } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.createAnecdote.value
    event.target.createAnecdote.value = ''

    const newAnecdote = {
      content: content,
    }

    dispatch(createAction(newAnecdote))
    dispatch(notificationAction(`you added '${content}'`, 10))
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

export default AnecdoteForm
