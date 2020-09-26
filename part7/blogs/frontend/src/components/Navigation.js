import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { userAction } from '../reducers/userReducer'
import { notificationAction } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import {
  AppBar,
  Button,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import useField from '../hooks/useField'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const username = useField('text')
  const password = useField('password')

  const padding = {
    padding: 5,
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('username :>> ', username)
    console.log('password :>> ', password)

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(userAction(user))
    } catch (exception) {
      dispatch(notificationAction('wrong username or password', 3))
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin} justifyContent='center'>
      <TextField
        variant='outlined'
        margin='normal'
        id='username'
        label='Username'
        size='small'
        {...username}
      />

      <TextField
        variant='outlined'
        margin='normal'
        id='password'
        label='Password'
        size='small'
        {...password}
      />
      <Button
        variant='contained'
        color='secondary'
        id='login-button'
        type='submit'
      >
        Login
      </Button>
    </form>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload(false)
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          Home
        </Button>

        <Button color='inherit' component={Link} to='/users'>
          Users
        </Button>
        <Grid container>
          <Grid alignContent='flex-end'>
            {user !== null ? (
              <>
                <span>{user.name} logged in</span>{' '}
                <Button variant='outlined' type='submit' onClick={handleLogout}>
                  logout
                </Button>
              </>
            ) : (
              loginForm()
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
