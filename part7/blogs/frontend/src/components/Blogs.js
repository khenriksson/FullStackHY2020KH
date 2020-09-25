import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CreateForm from '../components/CreateForm'
import Togglable from '../components/Togglable'
import { createAction } from '../reducers/blogReducer'
import { notificationAction } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import {
  TableContainer,
  Table,
  TableBody,
  Paper,
  TableRow,
  TableCell,
} from '@material-ui/core'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      })

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

  const blogForm = () => {
    const copied = [...blogs]
    const sorted = copied.sort((a, b) => b.likes - a.likes)

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sorted.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const wholeForm = () => (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <CreateForm createBlog={createBlog} />
      </Togglable>
      {blogForm()}
    </div>
  )

  return wholeForm()
}

export default Blogs
