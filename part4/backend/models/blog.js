const config = require('../utils/config')

const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')
// mongoose.set('useFindAndModify', false)
// mongoose.set('useCreateIndex', true)

// console.log(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
