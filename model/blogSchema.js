const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    picture: {
        type: String,
        required: [true, 'File cannot be empty'],    
    },
    title: {
        type: String, 
        required: [true, 'Title cannot be empty'],    
    },
    subhead: {
        type: String, 
        required: [true, 'Subhead cannot be empty'],    
    },
    author: {
        type: String,
        required: true
    },
    author_pic: {
        type: String,
    },
    author_id: {
        type: String,
        required: true
    },
    content: {
        type: String, 
        required: [true, 'Content cannot be empty'],    
    },
    date: {
        type: Date,
        default: Date.now,
        default: Date()
    },
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog