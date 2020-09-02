import React from 'react'
import '../index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  //   if (errorType === true) return <div className='error'>{message}</div>
  else return <div className='error'>{message}</div>
}

export default Notification
