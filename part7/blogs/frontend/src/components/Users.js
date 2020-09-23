import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const blogs = useSelector((state) => state.blogs)
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
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}
export default Users
