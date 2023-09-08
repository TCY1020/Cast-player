if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const router = require('./routes')
const session = require('express-session')

const app = express()
const cors = require('cors')

const port = process.env.PORT || 3000
const usePassport = require('./config/passport')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
usePassport(app)

app.use(router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
module.exports = app
