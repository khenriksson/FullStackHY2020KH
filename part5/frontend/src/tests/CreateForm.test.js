import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateForm from '../components/CreateForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(<CreateForm createBlog={createBlog} />)

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'Jest Function' },
  })
  fireEvent.change(title, {
    target: { value: 'Does this work with jest functions' },
  })
  fireEvent.change(url, {
    target: { value: 'https://fullstackopen.com/' },
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log('Mock call', createBlog.mock.calls[0][0].content)
  expect(createBlog.mock.calls[0][0].author).toBe('Jest Function')
  expect(createBlog.mock.calls[0][0].url).toBe('https://fullstackopen.com/')
  expect(createBlog.mock.calls[0][0].title).toBe(
    'Does this work with jest functions',
  )
})
