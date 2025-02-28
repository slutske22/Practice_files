const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {

    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.end(content)
    //     })
    // }

    // if (req.url === '/about') {
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
    //         res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.end(content)
    //     })
    // }

    // if (req.url === '/api/users') {
    //     const users = [
    //         { name: 'Bob Smith', age: 40 },
    //         { name: 'James Taylor', age: 22 },
    //         { name: 'Thing Bobber', age: Math.PI }
    //     ]
    //     res.writeHead(200, {'Content-Type': 'application/json'})
    //     res.end(JSON.stringify(users))
    // }

    // Build filepath
    let filePath = path.join(
        __dirname, 
        'public', req.url === '/' ? 'index.html' : req.url
    )

    let extension = path.extname(filePath)
    let contentType = 'text/html'

    // check extension
    switch(extension) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    //Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'),  (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(content, 'utf8')
                })
            } else {
                // Some server error probably
                res.writeHead(500)
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            // success
            res.writeHead(200, {'Content-Type': contentType})
            res.end(content, 'utf8')
        }
    })
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running in port ${PORT} . . .`));