const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
   res.send(req.rawHeaders)
})

app.listen(5000, () => console.log('Server started on port 5000'))