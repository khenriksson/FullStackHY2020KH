import {
  useApolloClient,
  useLazyQuery,
  useQuery,
  useSubscription,
} from '@apollo/client'
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [filtered, setFiltered] = useState([])
  const [token, setToken] = useState(null)
  const [user, setUser] = useState()
  const client = useApolloClient()

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  })
  const { data } = useQuery(ME)
  console.log('{data} :>> ', data)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_AUTHORS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    },
  })

  //   useEffect(() => {
  //     setUser(data)
  //   }, [data])

  if (result.loading || books.loading || !data) {
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
        genre={data.me ? data.me.favoriteGenre : ''}
      />
      <Authors authors={result.data.allAuthors} show={page === 'authors'} />
      <Books books={books.data.allBooks} show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm setToken={setToken} show={page === 'login'} />
    </div>
  )
}

export default App
