import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

let component

const user = {
  name: 'Kasper Henriksson',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtoZW5yaWtzc29uIiwiaWQiOiI1ZjNkNThlNzY4ZWVjOWU4NWUzYmNkOWIiLCJpYXQiOjE1OTkyNDA2NDl9.YaVB1Y6mzG5OxL9BBtR_P_L2NMhTsB5dS13iCAU1Syw',
  username: 'khenriksson',
}

const blog = {
  likes: 9,
  title: 'Testing middleware',
  author: 'Kasper Henriksson',
  url: 'url',
  user: user,
}

beforeEach(() => {
  component = render(<Blog blog={blog} user={user} />)
})

test('renders its children', () => {
  const togglable = component.container.querySelector('.togglableContent')
  expect(togglable).toHaveStyle('display: none')

  expect(component.container).toHaveTextContent(blog.title, blog.author)
})
