var fs = require('fs');

var data = {
   name: 'Alice'
}

fs.writeFile('data.json', JSON.stringify(data) , (err) =>{
   if (err) throw err
   console.log("You saved the data.json file", err);
});
