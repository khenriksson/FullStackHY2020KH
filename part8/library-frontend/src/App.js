import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR, ME } from './queries'
import { useMutation, useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')

  const [token, setToken] = useState(null)
  const client = useApolloClient()
  console.log('token :>> ', token)
  console.log('client :>> ', client)
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  })
  const me = useQuery(ME)

  console.log('result :>> ', result)

  if (result.loading || books.loading || me.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>
      <Recommended
        show={page === 'recommended'}
        me={me.data.me.favoriteGenre}
        books={books.data.allBooks}
      />
      <Authors authors={result.data.allAuthors} show={page === 'authors'} />
      <Books books={books.data.allBooks} show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm setToken={setToken} show={page === 'login'} />
    </div>
  )
}

export default App
