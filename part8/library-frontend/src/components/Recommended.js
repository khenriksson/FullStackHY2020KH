import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { FILTERED } from '../queries'

const Recommended = (props) => {
  const genre = props.me
  const variables = genre ? { genre } : {}
  const { data } = useQuery(FILTERED, {
    variables,
    pollInterval: 1000,
  })

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
          {data.filteredBooks
            // .filter((book) => book.genres.includes(genre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
export default Recommended
