import { useApolloClient, useQuery, useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { ALL_AUTHORS, ALL_BOOKS, FILTERED, ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [filtered, setFiltered] = useState([])
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  })

  const me = useQuery(ME)
  const [query, { loading, data }] = useLazyQuery(FILTERED)

  useEffect(() => {
    query({ variables: { genre: me.favoriteGenre } })
    setFiltered(data)
  }, [data])

  if (result.loading || books.loading || me.loading || loading) {
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
        books={data}
      />
      <Authors authors={result.data.allAuthors} show={page === 'authors'} />
      <Books books={books.data.allBooks} show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm setToken={setToken} show={page === 'login'} />
    </div>
  )
}

export default App
