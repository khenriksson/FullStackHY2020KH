import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import {
  notificationAction,
  removeAction,
} from '../reducers/notificationReducer'
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

  const vote = (id) => {
    dispatch(voteAction(id))
    console.log('vote', id)
    dispatch(
      notificationAction(
        `you voted '${anecdotes.find((x) => x.id === id).content}'`,
      ),
    )
    setTimeout(() => {
      dispatch(removeAction())
    }, 5000)
  }

  return (
    <>
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
