const initialState = null

let timeoutID

export const notificationAction = (data, seconds) => {

  return (dispatch) => {

    window.clearTimeout(timeoutID)
    dispatch({
      type: 'ERROR_MESSAGE',
      data: data,
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE',
      })
    }, seconds * 1000)
    clearTimeout(timeoutID - 1)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ERROR_MESSAGE': {

      return action.data
    }
    case 'REMOVE_MESSAGE': {
      return null
    }
    default:
      return state
  }
}

export default notificationReducer
