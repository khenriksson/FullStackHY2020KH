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
