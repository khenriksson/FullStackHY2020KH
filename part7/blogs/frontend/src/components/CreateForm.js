import React, { useState } from 'react'
import useField from '../hooks/useField'
import { Button, TextField, Typography, Grid } from '@material-ui/core'

const CreateForm = ({ createBlog }) => {
  /**
   * useStates for creating a new blog
   */

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })
  }

  return (
    <form onSubmit={addBlog} className='formDiv'>
      <Grid container spacing={1} direction='column' alignItems='center'>
        <Grid item direction='row'>
          <Typography align='justify'>title:</Typography>
          {/* <input {...title} /> */}
          <TextField variant='outlined' margin='normal' {...title} />
        </Grid>
        <Grid item>
          <Typography align='justify'>author:</Typography>
          <TextField variant='outlined' margin='normal' {...author} />
        </Grid>
        <Grid item>
          <Typography align='justify'>url:</Typography>
          <TextField variant='outlined' margin='normal' {...url} />
        </Grid>
      </Grid>
      <Grid item spacing={1}>
        <Button variant='contained' color='primary' id='create' type='submit'>
          create
        </Button>
      </Grid>
    </form>
  )
}

export default CreateForm
