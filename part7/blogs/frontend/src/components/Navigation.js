import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { userAction } from '../reducers/userReducer'
import { notificationAction } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const padding = {
    padding: 5,
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(userAction(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(notificationAction('wrong username or password', 3))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          id='username'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          id='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload(false)
  }

  return (
    <>
      <Link style={padding} to='/'>
        home
      </Link>
      <Link style={padding} to='/users'>
        user
      </Link>
      {user !== null ? (
        <>
          <span>{user.name} logged in</span>{' '}
          <button type='submit' onClick={handleLogout}>
            logout
          </button>
        </>
      ) : (
        loginForm()
      )}
    </>
  )
}

export default Navigation
