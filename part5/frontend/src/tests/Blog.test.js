import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

beforeEach(() => {})

test('does not show url and likes, but shows title and author', () => {
  const component = render(<Blog blog={blog} user={user} />)
  const togglable = component.container.querySelector('.togglableContent')
  expect(togglable).toHaveStyle('display: none')
  component.debug()
  expect(component.container).toHaveTextContent(blog.title, blog.author)
})

test('', () => {
  const component = render(<Blog blog={blog} user={user} />)
  const button = component.getByText('view')

  fireEvent.click(button)
  const togglable = component.container.querySelector('.togglableContent')
  expect(togglable).toHaveStyle('display: block')
  expect(component.container).toHaveTextContent(blog.url, blog.likes)
})

test('ensure like is clicked twice', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} createLike={mockHandler} />,
  )
  const button = component.getByText('like')

  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
