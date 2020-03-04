const http = require('http')

// Create a server object

http.createServer( (req, res) => {
    // write response
    res.write('hello from node')
    res.end()
}).listen(5000, () => console.log('Server running . . .'))