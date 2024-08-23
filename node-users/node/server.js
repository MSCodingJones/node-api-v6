const express = require('express')
const server = express()
const router = require('./app/routes/router')
const port = process.env.port || 3000

server.set('view engine', 'ejs')

server.use(express.urlencoded({extended: true}))

server.use('/', router)

server.listen(port, ()=> console.log(`Port ${port} is running...`))