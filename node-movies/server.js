const express = require('express')
const server = express()
const router = require('./routes/router')
const port = process.env.PORT || 3000

server.use('/', router)

server.set('view engine', 'ejs')

server.listen(port, ()=> console.log(`Port is cooking at ${port} degrees`))