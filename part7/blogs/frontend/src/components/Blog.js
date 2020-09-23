import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, createLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
  }

  const addingLike = (event) => {
    event.preventDefault()
    createLike(blog)
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
      <Togglable buttonLabel='view'>
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
      </Togglable>
    </div>
  )
}

export default Blog
