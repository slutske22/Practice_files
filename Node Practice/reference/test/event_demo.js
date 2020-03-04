const EventEmitter = require('events')

// Create an emmitter class
class MyEmitter extends EventEmitter{

}

// Init object

const myEmitter = new MyEmitter()

myEmitter.on('event', () => {
    console.log('Event fired')
})

// Emit event

myEmitter.emit('event')