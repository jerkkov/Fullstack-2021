const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    // _id: String,
    title: {type: String},
    author: {type: String},
    url: {type: String},
    likes: {type: Number, default: 0},
  })
  
  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Blog', blogSchema)