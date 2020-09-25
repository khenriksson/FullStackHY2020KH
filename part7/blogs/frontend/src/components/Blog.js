import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { notificationAction } from '../reducers/notificationReducer'
import {
  likeAction,
  deleteAction,
  commentAction,
} from '../reducers/blogReducer'

import useField from '../hooks/useField'

const Blog = () => {
  const dispatch = useDispatch()
  const commentInput = useField('text')
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

  const blog = blogs.find((n) => n.id === id)

  if (!blog || !user) {
    return null
  }
  console.log(blog.url)

  console.log('blog :>> ', blog)

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

  const commentBlog = async (commentObject) => {
    const comments = blog.comments.concat(commentObject)
    const newObject = { ...blog, comments }
    console.log('newObject :>> ', newObject)
    try {
      dispatch(commentAction(newObject))
      dispatch(notificationAction('youcommented', 3))
    } catch (exception) {
      dispatch(notificationAction('Comment not added', 3))
    }
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

  const addComment = (event) => {
    event.preventDefault()
    commentBlog({
      id: blog.id,
      text: commentInput.value,
    })
  }

  return (
    <div style={blogStyle} className='renderBlogTest'>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>
        <p>{blog.url}</p>
      </a>
      likes {blog.likes}{' '}
      <button id='likebutton' onClick={addingLike}>
        like
      </button>
      <p>added by {blog.user.name}</p>
      {blog.user.username === user.username ? (
        <button onClick={deleteBlog}>Remove blog</button>
      ) : (
        ''
      )}
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input {...commentInput} />
        <button>add comment</button>
      </form>
      {blog.comments.map((comment) => {
        return <li>{comment.text}</li>
      })}
    </div>
  )
}

export default Blog
