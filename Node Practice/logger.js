const EventEmitter = require('events')
const uuid = require('uuid')

class Logger extends EventEmitter {
    log(msg) {
        this.emit('message', { id: uuid.v4(), msg })
    }
}

// module.exports = Logger

const Logger = require('./logger')

const myLogger = new Logger()

myLogger.on('message', (data) => {
    console.log('Called Listener:', data)
})

myLogger.log('Hello people')