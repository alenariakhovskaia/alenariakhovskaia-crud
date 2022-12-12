const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./model/blogSchema')
const User = require('./model/userSchema')
const router = require('./routes/blogRoutes')
const authRouter = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { checkUser } = require('./middlewares/auth')

const connectDB = require('./model/database/connection');
const { render } = require('ejs')

const app = express();

app.use(express.static('public'))
app.use('/upload/', express.static('upload'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'ejs')

// port 
const port = 4999
// db connection 
connectDB();

//===========Routes=================

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack
  })
  res.render('error');
})


app.get('*', checkUser)

app.get('/', async (req, res) => {

    try {
        const blogs = await Blog.find().sort({createdAt: -1})
        res.render('index', { blogs })
    }
    catch (err) {
        console.log(err)
    }
})

app.get('/profile', (req, res) => {
    res.render('profile')
})

app.delete("/user/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const users = await User.findByIdAndDelete(id)    
    res.status(200).json({ redirect: "/" });
  } catch (err) {
    res.status(400);
  }
});

app.use(router)
app.use(authRouter)

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(port, ()=> { console.log(`Server is running on http://localhost:${port}`)});