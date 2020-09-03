import React, { useState } from 'react'
import Togglable from './Togglable'
const Blog = ({ blog, createLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [likes, addLike] = useState(blog.likes)

  const addingLike = (event) => {
    event.preventDefault()
    const newLikes = likes + 1
    // console.log('User in Blog', blog.user)
    createLike({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
      id: blog.id,
      user: blog.user,
    })

    addLike(newLikes)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel='view'>
        <p> {blog.url}</p>
        likes {blog.likes} <button onClick={addingLike}>like</button>
        <p> {blog.user.name}</p>
      </Togglable>
    </div>
  )
}

export default Blog
