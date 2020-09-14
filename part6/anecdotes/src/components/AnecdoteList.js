import React from 'react'
import { connect, mapSta } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { notificationAction } from '../reducers/notificationReducer'
import Filter from '../components/Filter'

const AnecdoteList = (props) => {
  const anecdotes = () => {
    if (props.filter !== '') {
      return props.anecdotes.filter((x) =>
        x.content.toLowerCase().includes(props.filter.toLowerCase()),
      )
    } else {
      return props.anecdotes
    }
  }

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAction(anecdote))
    dispatch(notificationAction(`you voted ${anecdote.content}`, 10))
  }

  return (
    <>
      <Filter />

      {anecdotes().map((anecdote) => (
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

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log('MAP STATE TO PROPS', state)
  console.log('MAP STATE TO ANECODTES', state.anecdotes)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const ConnectedAnecdotes = connect(mapStateToProps)(AnecdoteList)
export default ConnectedAnecdotes
