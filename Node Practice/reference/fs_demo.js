const fs = require('fs')
const path = require('path')

// Create folder
fs.mkdir(path.join(__dirname, 'test'), {}, err => {
    if (err) throw err
    console.log('Folder created')
})

// Create and write to file
fs.writeFile( path.join(__dirname, '/test', 'hello.txt'), "Hello world", err => {
    if (err) throw err
    console.log('File created')

    // Append file
    fs.appendFile( path.join(__dirname, '/test', 'hello.txt'), ", this file written by Node", err => {
        if (err) throw err
        console.log('File appended')}
)

})

