const initialState = {
  notification: null,
}

export const notificationAction = (data, seconds) => {
  console.log('SECONDS BEFORE', seconds)
  return (dispatch) => {
    // const send = await anecdoteService.post(data)
    console.log('DATA ', data)
    dispatch({
      type: 'ERROR_MESSAGE',
      data: data,
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE',
      })
    }, seconds * 1000)
  }
}

const notificationReducer = (state = initialState.notification, action) => {
  switch (action.type) {
    case 'ERROR_MESSAGE': {
      return action.data
    }
    case 'REMOVE_MESSAGE': {
      return ''
    }
    default:
      return state
  }
}

export default notificationReducer
