const initialState = ''

const filterReducer = (state = initialState, action) => {
  console.log('FILTER', state)
  switch (action.type) {
    case 'FILTER': {
      return action.data
    }
    default:
      return state
  }
}

export const filterAction = (data) => {
  return {
    type: 'FILTER',
    data: data,
  }
}

export default filterReducer
