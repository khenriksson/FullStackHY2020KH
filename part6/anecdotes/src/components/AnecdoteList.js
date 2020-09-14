import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { notificationAction } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) => {
    if (filter !== '') {
      return state.anecdotes.filter((x) =>
        x.content.toLowerCase().includes(filter.toLowerCase()),
      )
    } else {
      return state.anecdotes
    }
  })

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAction(anecdote))
    dispatch(notificationAction(`you voted ${anecdote.content}`, 10))
  }

  return (
    <>
      <Filter />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
