import blogsService from '../services/blogs'

export const initAction = () => {
  return async (dispatch) => {
    // const send = await blogService.post(data)
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createAction = (blog) => {
  return async (dispatch) => {
    const data = await blogsService.create(blog)
    dispatch({ type: 'CREATE_ACTION', data })
  }
}

export const likeAction = (blog) => {
  return async (dispatch) => {
    const newObject = {
      title: blog.title,
      likes: blog.likes + 1,
      id: blog.id,
      author: blog.author,
      user: blog.user,
    }
    const data = await blogsService.update(blog.id, newObject)
    dispatch({
      type: 'LIKE_ACTION',
      data: data,
    })
  }
}
export const deleteAction = (blog) => {
  console.log('blog :>> ', blog)
  return async (dispatch) => {
    await blogsService.remove(blog.id)
    dispatch({ type: 'DELETE_ACTION', data: blog.id })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'CREATE_ACTION': {
      return [...state].concat(action.data)
    }
    case 'LIKE_ACTION': {
      const newState = state.map((blog) => {
        if (blog.id === action.data.id) {
          return (blog = action.data)
        }
        return blog
      })
      // const sorted = [...newState].sort((a, b) => b.votes - a.votes)
      return newState
    }
    case 'DELETE_ACTION': {
      return state.filter((blog) => blog.id !== action.data)

      // const sorted = [...newState].sort((a, b) => b.votes - a.votes)
    }
    default:
      return state
  }
}

export default blogReducer
