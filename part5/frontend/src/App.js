import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'

// Services

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      setErrorMessage('Wrong credentials')
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload(false)
  }

  const blogForm = () => blogs.map((blog) => <Blog key={blog.id} blog={blog} />)

  const wholeForm = () => (
    <div>
      <p>{user.username} logged in</p>{' '}
      <button type='submit' onClick={handleLogout}>
        logout
      </button>
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