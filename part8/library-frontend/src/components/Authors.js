import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(0)
  const [editAuthor] = useMutation(EDIT_AUTHOR)
  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setBorn(event.target.valueAsNumber)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('typeof bornes :>> ', typeof born)
    // const born = Number(bornes)
    editAuthor({ variables: { name, born } })
  }

  console.log('born :>> ', born)
  console.log('name :>> ', name)
  if (!props.show) {
    return null
  }
  const authors = props.authors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Edit author
            <select onChange={handleChange}>
              {authors.map((author) => {
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

export default Authors
