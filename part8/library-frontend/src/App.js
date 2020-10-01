import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from './queries'
import { useMutation } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [name, setName] = useState('')
  const [bornes, setBorn] = useState(0)

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

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const born = Number(bornes)
    editAuthor({ variables: { name, born } })
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors authors={result.data.allAuthors} show={page === 'authors'} />
      <Books books={books.data.allBooks} show={page === 'books'} />
      <NewBook show={page === 'add'} />

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Pick your favorite flavor:
            <select value={''} onChange={handleChange}>
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
          <input
            type='number'
            onChange={({ target }) => setBorn(target.value)}
          />
          <input type='submit' value='Submit' />
        </form>
      </div>
    </div>
  )
}

export default App
