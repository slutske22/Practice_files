import express from 'express';
import data from './data/data.json'

const app = express();
const PORT = 3000;

app.use(express.static('public'))

// To load resources out of the images folder when using '/images' path
app.use('/images', express.static('images'))

app.get('/', (request, response) => 

   // get data
   response.json(data)

)

app.get('/item/:id', (req, res, next) => {

   // Middleware that pulls the data:
   console.log(req.params.id)
   let user = Number(req.params.id)
   console.log(user)
   console.log(data[user])
   // Middleware that uses the req object
   console.log(`Request from ${req.originalUrl}`)
   console.log(`Request method is ${req.method}`)
   // Everything Above is middleware

   res.send(data[user])
   next()
}, (req, res) => {
   console.log('did you get the right data?')
})


app.get('/images', (req, res) => {
   // response.send(`A put request with /item route on port ${PORT}`)
   // res.end()
   // res.redirect('http://www.google.com')
   res.download('images/logo.svg')
})



app.post('/newitem', (request, response) => {
   response.send(`A post request with /newitem route on port ${PORT}`)
})


// app.put('/item', (request, response) => {
//    response.send(`A put request with /item route on port ${PORT}`)
// })

// app.delete('/item', (request, response) => {
//    response.send(`A delete request with /item route on port ${PORT}`)
// })

app.listen(PORT, () => {
   console.log(`Your server is running on port ${PORT}`)
   // console.log(data)
})




app.route('/item')
   .get( (request, response) => {
      response.send(`A get request with /item route on port ${PORT}`)
   })
   .put( (request, response) => {
      response.send(`A put request with /item route on port ${PORT}`)
   })
   .delete( (request, response) => {
      response.send(`A delete request with /item route on port ${PORT}`)
   })