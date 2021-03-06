import React, { useState } from 'react'

const CreateForm = ({ createBlog }) => {
  /**
   * useStates for creating a new blog
   */

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog} className='formDiv'>
      <div>
        <p>title:</p>
        <input
          id='title'
          type='text'
          value={title}
          name='Title'
          onChange={handleTitleChange}
        />
        <p>author:</p>
        <input
          id='author'
          type='text'
          value={author}
          name='Author'
          onChange={handleAuthorChange}
        />
        <p>url:</p>
        <input
          id='url'
          type='text'
          value={url}
          name='Url'
          onChange={handleUrlChange}
        />
      </div>
      <button id='create' type='submit'>
        create
      </button>
    </form>
  )
}

export default CreateForm
