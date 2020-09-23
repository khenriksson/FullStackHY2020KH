import React from 'react'
import { useSelector } from 'react-redux'

import { Link, Route } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)
  console.log('users :>> ', users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map((user) => (
          <tr>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}
export default Users
