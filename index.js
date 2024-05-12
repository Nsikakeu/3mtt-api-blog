const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRouter = require('./controllers/auth')
const app = express()
dotenv.config()

mongoose.connect(process.env.MONGO_URL, () => console.log('db is connected successfully'))

// //middlewares and routes
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authRouter)
app.use('/blog', blogRouter)
app.use('/user', userRouter)

app.listen(5000, () => console.log("Server is connected successfully"))