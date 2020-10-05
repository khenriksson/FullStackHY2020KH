import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from './queries'
import { useMutation, useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  console.log('token :>> ', token)
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  console.log('result :>> ', result)

  if (result.loading || books.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setBorn(event.target.valueAsNumber)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('typeof bornes :>> ', typeof bornes)
    // const born = Number(bornes)
    editAuthor({ variables: { name, born } })
  }
  return (
    <div>
      <button onClick={logout}>logout</button>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      {token != '' ? <LoginForm setToken={setToken} /> : null}
      <Authors authors={result.data.allAuthors} show={page === 'authors'} />
      <Books books={books.data.allBooks} show={page === 'books'} />
      <NewBook show={page === 'add'} />

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Edit author
            <select onChange={handleChange}>
              {result.data.allAuthors.map((author) => {
                return (
                  <option key={author.id} value={author.name}>
                    {author.name}
                  </option>
                )
              })}
            </select>
          </label>
          born
          <input type='number' onChange={handleNumberChange} />
          <input type='submit' value='Submit' />
        </form>
      </div>
    </div>
  )
}

export default App
