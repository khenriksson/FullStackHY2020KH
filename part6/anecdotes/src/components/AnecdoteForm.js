import React from 'react'
import { useDispatch } from 'react-redux'
import { createAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.createAnecdote.value
    event.target.createAnecdote.value = ''
    dispatch(createAction(content))
    console.log('DATA IN CREATE', content)
  }

  return (
    <form onSubmit={create}>
      <div>
        <input name='createAnecdote' />
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
