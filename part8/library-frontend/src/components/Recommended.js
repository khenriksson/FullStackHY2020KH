import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Recommended = (props) => {
  const [genre, setGenre] = useState(props.genre)
  console.log('genre :>> ', genre)

  const variables = genre ? { genre } : ''

  const { data } = useQuery(ALL_BOOKS, {
    variables,
    pollInterval: 1000,
  })

  if (!props.show || !props.genre) {
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
          {genre ? (
            data?.allBooks
              // .filter((book) => book.genres.includes(genre))
              .map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author}</td>
                  <td>{a.published}</td>
                </tr>
              ))
          ) : (
            <p>log in</p>
          )}
        </tbody>
      </table>
    </div>
  )
}
export default Recommended
