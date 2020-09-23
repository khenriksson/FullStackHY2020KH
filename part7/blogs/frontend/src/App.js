import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Blog from './components/Blog'
import Blogs from './components/Blogs'

import Navigation from './components/Navigation'
import Notification from './components/Notification'

import User from './components/User'
import Users from './components/Users'
import { initAction } from './reducers/blogReducer'

import { userAction } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
// Services
import blogService from './services/blogs'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const errorMessage = useSelector((state) => state.notification)
  /**
   * Refs
   */

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

  return (
    <div>
      <Navigation />
      <Notification message={errorMessage} />

      <h2>blogs</h2>

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
        <Route path='/'>{user ? <Blogs /> : ''}</Route>
      </Switch>
    </div>
  )
}

export default App
