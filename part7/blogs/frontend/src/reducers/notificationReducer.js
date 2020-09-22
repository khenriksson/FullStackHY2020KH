

// const notificationReducer = (state = null, action) => {
//   switch (action.type) {
//     case 'MESSAGE': {
//       return action.data
//     }
//     default:
//       return state
//   }
// }

// export const notificationAction = (data) => {
//   return { type: 'MESSAGE', data: data }
// }

// export default notificationReducer

const initialState = null

let timeoutID

export const notificationAction = (data, seconds) => {
  console.log('SECONDS BEFORE', seconds)
  return (dispatch) => {
    // const send = await anecdoteService.post(data)

    console.log('DATA ', data)
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
      console.log(action.data)
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
