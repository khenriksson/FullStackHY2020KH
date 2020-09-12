const initialState = {
  notification: '',
}
// const getId = () => (100000 * Math.random()).toFixed(0)
// const initialState = anecdotesAtStart.map(asObject)
// const asObject = (notification) => {
//   return {
//     notification: notification,
//     id: getId(),
//   }
// }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ERROR_MESSAGE': {
      return action.data
    }
    case 'REMOVE_MESSAGE': {
      return ''
    }
    default:
      return ''
  }
}

export const notificationAction = (data) => {
  return {
    type: 'ERROR_MESSAGE',
    data: data,
  }
}

export const removeAction = () => {
  return {
    type: 'REMOVE_MESSAGE',
  }
}

export default notificationReducer
