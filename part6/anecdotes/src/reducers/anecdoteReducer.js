import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE_ACTION': {
      const anecdote = state.find((x) => x.id === action.data.id)
      const content = {
        content: anecdote.content,
        id: action.data.id,
        votes: anecdote.votes + 1,
      }
      const newState = state.map((anecdote) => {
        if (anecdote.id === action.data.id) {
          return (anecdote = content)
        }
        return anecdote
      })
      const sorted = newState.sort((a, b) => b.votes - a.votes)
      return sorted
    }
    case 'CREATE_ACTION': {
      console.log(action.data)
      const anecdote = action.data.content
      console.log('ANECDOTE IN CREATE ACTION', anecdote)
      const addingAnecdote = {
        content: anecdote,
        id: action.data.id,
        votes: action.data.votes,
      }
      return state.concat(addingAnecdote)
    }
    case 'INIT_ANECDOTES': {
      const sorted = action.data.sort((a, b) => b.votes - a.votes)
      return sorted
    }
    default:
      return state
  }
}

export const voteAction = (id) => {
  return {
    type: 'VOTE_ACTION',
    data: {
      id: id,
    },
  }
}

export const createAction = (content) => {
  return async (dispatch) => {
    const id = getId()
    const data = await anecdoteService.createNew(content.content, id, 0)
    dispatch({ type: 'CREATE_ACTION', data })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
