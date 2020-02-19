const os = require('os')

// Platform
console.log(os.platform())

// CPU Architecture
console.log(os.arch())

// CPU core info
console.log(os.cpus())

// Free Memory
console.log(os.freemem())

// Total Memory
console.log(os.totalmem())

// Home Dir
console.log(os.homedir())

// Uptime (time system has been up in seconds)
console.log(os.uptime())