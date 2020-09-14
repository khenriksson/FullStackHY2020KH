import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE_ACTION': {
      const newState = state.map((anecdote) => {
        if (anecdote.id === action.data.id) {
          return (anecdote = action.data)
        }
        return anecdote
      })
      const sorted = [...newState].sort((a, b) => b.votes - a.votes)
      return sorted
    }
    case 'CREATE_ACTION': {
      return [...state].concat(action.data)
    }
    case 'INIT_ANECDOTES': {
      const sorted = [...action.data].sort((a, b) => b.votes - a.votes)
      return sorted
    }
    default:
      return state
  }
}

export const voteAction = (anecdote) => {
  return async (dispatch) => {
    const newObject = {
      content: anecdote.content,
      votes: anecdote.votes + 1,
      id: anecdote.id,
    }
    const data = await anecdoteService.update(anecdote.id, newObject)
    dispatch({
      type: 'VOTE_ACTION',
      data: data,
    })
  }
}

export const createAction = (anecdote) => {
  return async (dispatch) => {
    const data = await anecdoteService.createNew(
      anecdote.content,
      anecdote.id,
      0,
    )
    dispatch({ type: 'CREATE_ACTION', data })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
