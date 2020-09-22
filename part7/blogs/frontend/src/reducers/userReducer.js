const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return action.data
    }
    default:
      return state
  }
}

export const userAction = (user) => {
  return (dispatch) => {
    dispatch({ type: 'SET_USER', data: user })
  }
}

export default userReducer
