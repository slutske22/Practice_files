const path = require('path')

// Base filename
console.log('Basename:', path.basename(__filename))

// Directory name
// same as __dirname
console.log('Directory:', path.dirname(__filename))

//File extension
console.log(`Extension name`, path.extname(__filename))

// Create path object
console.log(path.parse(__filename))

// Concatonate paths
console.log( path.join(__dirname, 'test', 'hello.html') )