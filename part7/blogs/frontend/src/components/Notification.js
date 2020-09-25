import React from 'react'
import '../index.css'
import { Alert } from '@material-ui/lab'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  //   if (errorType === true) return <div className='error'>{message}</div>
  else
    return (
      <div>
        <Alert variant='outlined' severity='success'>
          {message}
        </Alert>
      </div>
    )
}

export default Notification
