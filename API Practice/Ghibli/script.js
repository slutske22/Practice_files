// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

request.onload = function(){
   // Begin accessing JSON data here
   var data = JSON.parse(this.response)

   if (request.status >= 200 && request.status < 400) {
      data.forEach(movie => {

         // Create a div with a card class
         const card = document.createElement('div');
         card.setAttribute('class', 'card');

         // Create an h1 and set the text context as the films title
         const h1 = document.createElement('h1');
         h1.textContent = movie.title;

         // Creat a p and set the text content to the descripton
         const p = document.createElement('p');
         // movie.description = movie.description.substring(0,300);
         p.textContent = movie.description;

         // Append cards to container element
         container.appendChild(card);

         // Append each card with h1 and p
         card.appendChild(h1);
         card.appendChild(p);


         console.log(movie.title)



      })
   } else {
     console.log('error')
   }
}

// Send request
request.send();


const app = document.querySelector('#root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);
