import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import {
  notificationAction,
  removeAction,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
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

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ))
}

export default AnecdoteList
