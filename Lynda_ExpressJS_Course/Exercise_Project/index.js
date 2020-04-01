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

app.get('/item/:id', (req,res) => {
   console.log(req.params.id)
   let user = Number(req.params.id)
   console.log(user)
   console.log(data[user])
   res.send(data[user])
})

app.post('/newitem', (request, response) => {
   response.send(`A post request with /newitem route on port ${PORT}`)
})

app.put('/item', (request, response) => {
   response.send(`A put request with /item route on port ${PORT}`)
})

app.delete('/item', (request, response) => {
   response.send(`A delete request with /item route on port ${PORT}`)
})

app.listen(PORT, () => {
   console.log(`Your server is running on port ${PORT}`)
   // console.log(data)
})