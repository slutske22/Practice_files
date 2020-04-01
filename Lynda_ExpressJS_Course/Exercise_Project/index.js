import express from 'express';
import data from './data/data.json'

const app = express();
const PORT = 3000;

app.get('/', (request, response) => {
   response.send(`A get request with / route on port ${PORT}`)
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