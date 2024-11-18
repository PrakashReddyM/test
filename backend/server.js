const express = require('express')
const dotenv = require('dotenv')
const sequelize = require('./config/database')
const cookieParser = require('cookie-parser')

const authRoute = require('./routes/authRoute')

//config
dotenv.config({})

const app = express()
const PORT = 4000 || process.env.PORT;

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)

sequelize.sync()
    .then(() => console.log('Database Synced...'))
    .catch((err) => console.log('Error in Syncing..', err))

app.listen(PORT, () => {
    console.log(`server running on PORT:${PORT}`)
})