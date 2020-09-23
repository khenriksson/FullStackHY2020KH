import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  //   console.log('user :>> ', user)
  const id = useParams().id
  console.log(id)
  const users = useSelector((state) => state.users)
  console.log(users)
  const user = users.find((n) => n.id === id)
  console.log('user :>> ', user)

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h4>added blogs</h4>
      {user.blogs.map((blog) => (
        <li>{blog.title}</li>
      ))}
    </div>
  )
}

export default User
