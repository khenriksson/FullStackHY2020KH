import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
// Services

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  /**
   * Refs
   */

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log('User: ', user)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const createBlog = async (blogObject) => {
    try {
      console.log('Blog: ', blogObject)
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      })

      setBlogs(blogs.concat(blog))

      setErrorMessage(`a new blog ${blog.title} by ${blog.author} added`)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Blog not added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      console.log('Blog: ', blogObject)
      console.log('User:', user)

      if (window.confirm('Are you sure you want to delete this?')) {
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
        setErrorMessage(` blog removed`)

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } catch {
      setErrorMessage('Blog not removed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (likeObject) => {
    try {
      console.log('Blog: ', likeObject)

      const id = likeObject.id
      const blog = await blogService.update(id, {
        title: likeObject.title,
        author: likeObject.author,
        url: likeObject.url,
        likes: likeObject.likes,
        user: likeObject.user,
      })

      console.log('New Blog', blog)

      const newBlogs = blogs.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            likes: blog.likes,
          }
          return updatedItem
        }
        return item
      })

      setBlogs(newBlogs)

      setErrorMessage(`a new like added`)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Blog not updated')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload(false)
  }

  const blogForm = () => {
    const copied = [...blogs]
    const sorted = copied.sort((a, b) => b.likes - a.likes)
    // setBlogs(sorted)
    return sorted.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        createLike={likeBlog}
        removeBlog={removeBlog}
        user={user}
      />
    ))
  }

  const wholeForm = () => (
    <div>
      <p>{user.username} logged in</p>{' '}
      <button type='submit' onClick={handleLogout}>
        logout
      </button>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <CreateForm createBlog={createBlog} />
      </Togglable>
      {blogForm()}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>

      {user === null ? loginForm() : wholeForm()}
    </div>
  )
}

export default App
