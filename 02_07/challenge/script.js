var socialMedia = {
  facebook : 'http://facebook.com/viewsource',
  twitter: 'http://twitter.com/planetoftheweb',
  flickr: 'http://flickr.com/planetotheweb',
  youtube: 'http://youtube.com/planetoftheweb'
};


//12 line code cycling through socialMedia object and adding images and links into the nav.socialmediaicons element through a <ul><li>...</li></ul> through use of the object.keys(socialMedia).forEach loops
function addicons(){
    iconList = document.querySelectorAll('.socialmediaicons');
    output = "<ul>";
    Object.keys(socialMedia).forEach( function(site){
      output = output + '<li><a href="' + socialMedia[site] +
                '"><img src="images/' + site + '.png" alt="' + site + '"></a></li>'
    } );
    output = output + "</ul>"
    for (var i = 0; i < iconList.length; i++) {
      iconList[i].innerHTML = output;
    }
};
addicons();

//11 line code cycling through socialMedia object and adding images and links into the nav.socialmediaicons element through a <ul><li>...</li></ul>, using a for (var X in Y) loop.  Expressed as an immediately invoked function
var social = function(){
      var output = '<ul>';
      myList = document.querySelectorAll('.socialmediaicons');
      for (var key in socialMedia){
        output += '<li><a href="' + socialMedia[key] +
                  '"><img src="images/' + key + '.png" alt="' + key + '"></a></li>'
      }
      output += '</ul>';
      for (var i = 0; i < myList.length; i++) {
        myList[i].innerHTML = output;
      }
}(socialMedia);

///////////////////////////////////////////////
  //MORE PRACTICE WITH FOR (VAR ___ IN _____) LOOPS
////////////////////////////////////////////////////////
var monsters = {
  Canada: "Sasquach",
  Scotland: "Loch Ness",
  Mexico: "Chupacabra",
  Nepal: "Yeti",
  Norway: "Fenrir"
}


Object.keys(monsters).forEach(function( value ) {
  console.log("The " + monsters[value] + " lives in " + value)
});

// //for far in object
// for (let prop in monsters){  //prop used instead of i as the index
//   console.log(prop);           //looping through the property names
//   console.log(monsters[prop]); //looping through monsters.property, which will give us the value of each property
//   //using monsters[prop] instead of monsters.prop because there is no monsters.prop, monsters[prop] is a syntax used within the loop to loop through each property of the monsters object
// }
// for (let prop in monsters){
//   console.log(prop + ": " + monsters[prop]);
// }
