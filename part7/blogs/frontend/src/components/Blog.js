import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { notificationAction } from '../reducers/notificationReducer'
import {
  initAction,
  createAction,
  likeAction,
  deleteAction,
} from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const id = useParams().id
  console.log('id :>> ', id)
  console.log('blogs :>> ', blogs)

  const blog = blogs.find((n) => n.id === id)

  console.log('blog :>> ', blog)

  if (!blog) {
    return null
  }

  const removeBlog = async (blogObject) => {
    try {
      if (window.confirm('Are you sure you want to delete this?')) {
        dispatch(deleteAction(blogObject))
        dispatch(notificationAction('blog removed', 5))
      }
    } catch (exception) {
      dispatch(notificationAction('Blog not removed'), 3)
    }
  }

  const likeBlog = async (likeObject) => {
    try {
      dispatch(likeAction(likeObject))
      dispatch(notificationAction('a new like added', 3))
    } catch (exception) {
      dispatch(notificationAction('Blog not updated', 3))
    }
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  }

  const addingLike = (event) => {
    event.preventDefault()
    likeBlog(blog)
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog({
      id: blog.id,
      user: blog.user,
    })
  }

  return (
    <div style={blogStyle} className='renderBlogTest'>
      {blog.title} {blog.author}
      {/* <Togglable buttonLabel='view'> */}
      <p> {blog.url}</p>
      likes {blog.likes}{' '}
      <button id='likebutton' onClick={addingLike}>
        like
      </button>
      <p> {blog.user.name}</p>
      {blog.user.username === user.username ? (
        <button onClick={deleteBlog}>Remove blog</button>
      ) : (
        ''
      )}
      {/* </Togglable> */}
    </div>
  )
}

export default Blog
