const initialState = {
  notification: 'Serve',
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
      const message = action.data.notification
      const returned = (state.notification = message)
      return returned
    }
    default:
      return state.notification
  }
}

export const notificationAction = (id) => {
  return {
    type: 'ERROR_MESSAGE',
    data: {
      notification: "Not sure if it's working",
    },
  }
}

export default notificationReducer
