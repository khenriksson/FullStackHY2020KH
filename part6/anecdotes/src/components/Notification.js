import React from 'react'
import { useSelector } from 'react-redux'
import notificationAction from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <div style={style}>{notification}</div>
}

export default Notification
