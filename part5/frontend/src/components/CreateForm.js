import React from 'react'

const CreateForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <p>title:</p>
        <input
          type='text'
          value={props.title}
          name='Title'
          onChange={props.handleTitleChange}
        />
        <p>author:</p>
        <input
          type='text'
          value={props.author}
          name='Author'
          onChange={props.handleAuthorChange}
        />
        <p>url:</p>
        <input
          type='text'
          value={props.url}
          name='Url'
          onChange={props.handleUrlChange}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default CreateForm
