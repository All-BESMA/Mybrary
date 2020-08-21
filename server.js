if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()

const expressLayouts = require('express-ejs-layouts')
/** Body parser */
const bodyParser = require('body-parser')



/** Packages use by app & define folders*/
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
/** Use Body parser */
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


/** Declare Routes */
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

/** Use Routes */
app.use('/', indexRouter)
app.use('/authors', authorRouter)

/** Declare Databases  server*/
const mongoose = require('mongoose')
/** Use Databases mongoose*/
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to nongoDB'))

const errorMessage = ''
/** Lunch server */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ' + port));
