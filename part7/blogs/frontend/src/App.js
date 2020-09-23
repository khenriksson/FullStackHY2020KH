import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { useSelector, useDispatch } from 'react-redux'
import { notificationAction } from './reducers/notificationReducer'
import {
  initAction,
  createAction,
  likeAction,
  deleteAction,
} from './reducers/blogReducer'
import { userAction } from './reducers/userReducer'
import { Switch, Route, Link } from 'react-router-dom'

// Services

import blogService from './services/blogs'
import loginService from './services/login'
import { initUsers } from './reducers/usersReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const errorMessage = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)

  /**
   * Refs
   */

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initAction())
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userAction(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

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

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      })

      //   setBlogs(blogs.concat(blog))
      dispatch(createAction(blog))

      dispatch(
        notificationAction(
          `a new blog ${blog.title} by ${blog.author} added`,
          3,
        ),
      )
    } catch (exception) {
      dispatch(notificationAction('Blog not added', 3))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload(false)
  }

  const blogForm = () => {
    const copied = [...blogs]
    const sorted = copied.sort((a, b) => b.likes - a.likes)

    return sorted.map((blog) => (
      //   <Blog
      //     key={blog.id}
      //     blog={blog}
      //     createLike={likeBlog}
      //     removeBlog={removeBlog}
      //     user={user}
      //   />
      <p>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </p>
    ))
  }

  const wholeForm = () => (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <CreateForm createBlog={createBlog} />
      </Togglable>
      {blogForm()}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      <Link to='/'>home</Link>
      <Link to='/users'>user</Link>
      <h2>blogs</h2>
      {user !== null ? (
        <div>
          <p>{user.name} logged in</p>{' '}
          <button type='submit' onClick={handleLogout}>
            logout
          </button>
        </div>
      ) : (
        loginForm()
      )}

      <Switch>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>{user ? wholeForm() : ''}</Route>
      </Switch>
    </div>
  )
}

export default App
