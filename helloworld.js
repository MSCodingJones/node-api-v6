// Build a mini server
const http = require('http')
const port = process.env.PORT || 3000

const server = http.createServer((request, response)=> {
    response.writeHead(200, { 'Content-Type': 'text/plain'})
    response.end('Hello World')
})

server.listen(port, ()=> console.log('The port ${port} is porting.'))


