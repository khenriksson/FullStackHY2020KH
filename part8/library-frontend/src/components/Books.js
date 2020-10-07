import React, { useEffect, useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const [filters, setFilters] = useState([])

  const books = props.books

  const countFilters = () => {
    let tmp = []
    books.map((book) => {
      book.genres.map((genre) => {
        if (tmp.indexOf(genre) === -1) {
          tmp.push(genre)
        }
      })
    })
    return tmp
  }

  console.log('countFilters() :>> ', countFilters())

  useEffect(() => {
    setFilters(countFilters)
  }, [])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {!filter
            ? books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : books
                .filter((book) => book.genres.includes(filter))
                .map((a) => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author}</td>
                    <td>{a.published}</td>
                  </tr>
                ))}
        </tbody>
      </table>

      {filters.map((genre) => {
        return <button onClick={() => setFilter(genre)}>{genre}</button>
      })}
      <button onClick={() => setFilter(null)}>all genres</button>
    </div>
  )
}

export default Books
