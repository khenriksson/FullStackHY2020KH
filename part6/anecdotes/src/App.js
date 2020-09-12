import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAction(id))
    console.log('vote', id)
  }

  const voteAction = (id) => {
    return {
      type: 'VOTE_ACTION',
      data: {
        id: id,
      },
    }
  }

  const create = (event) => {
    event.preventDefault()
    const content = event.target.createAnecdote.value
    event.target.createAnecdote.value = ''
    dispatch(createAction(content))
    console.log('DATA IN CREATE', content)
  }

  const createAction = (data) => {
    return {
      type: 'CREATE_ACTION',
      data: {
        content: data,
      },
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App
