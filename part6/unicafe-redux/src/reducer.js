const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  console.log('State', state)
  switch (action.type) {
    case 'GOOD':
      const goodData = {
        ...state,
        good: state.good + 1,
      }

      return goodData
    case 'OK':
      const okData = {
        ...state,
        ok: state.ok + 1,
      }

      return okData
    case 'BAD':
      const badData = {
        ...state,
        bad: state.bad + 1,
      }

      return badData
    case 'ZERO':
      return initialState
    default:
      return state
  }
}

export default counterReducer
