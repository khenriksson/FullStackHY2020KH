import React from 'react'
import { useDispatch } from 'react-redux'
import { createAction } from '../reducers/anecdoteReducer'
import {
  notificationAction,
  removeAction,
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0)

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.createAnecdote.value
    event.target.createAnecdote.value = ''
    const votes = 0
    const id = getId()
    const newAnecdote = await anecdoteService.createNew(content, id, votes)
    console.log('NEW ANECDOTE', newAnecdote)
    dispatch(createAction(newAnecdote))
    dispatch(notificationAction(`you added '${content}'`))
    setTimeout(() => {
      dispatch(removeAction())
    }, 5000)
    console.log('DATA IN CREATE', content)
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
