const express = require('express')
const cors  = require('cors')
const { router } = require('./routes/route')
const { connection } = require('./db')
require('dotenv').config()
const app= express()
app.use(cors())
app.use(express.json())


app.use('/', router)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running")
})