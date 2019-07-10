var socialMedia = {
  facebook : 'http://facebook.com/viewsource',
  twitter: 'http://twitter.com/planetoftheweb',
  flickr: 'http://flickr.com/planetotheweb',
  youtube: 'http://youtube.com/planetoftheweb',
  google: 'http://google.com',
  meetup: 'http://meetup.com'
};


//Using object.values to pull out socialMedia's values into an array
var values = Object.values(socialMedia);
console.log("values array = " + values);
//
// // create an array of arrays using entries
// var entries = Object.entries(socialMedia);
// console.log(entries);


//Using object.keys to pull out socialMedia's property names into an array
var titles = Object.keys(socialMedia)
console.log("titles array = " + titles);

//morphing titles array into image location href addresses
var titlesSrc = [];
for (i = 0; i < titles.length; i++) {
  titlesSrc[i] = "images/" + titles[i] + ".png";
}
console.log("titlesSrc array = " + titlesSrc)



var navList = document.querySelectorAll(".socialmediaicons");
var items = document.createElement("li");
var iconList = [];

function addicons(){
    //create list of <li> with values for the link href and img src, cycling through the arrays to populate each <li>
    for (var j = 0; j < values.length; j++){
      iconList = iconList + '<li><a href ="' + values[j] +
      '"><img src="' + titlesSrc[j] +'"></a></li>'
    }

    for (var i = 0; i < navList.length; i++){
      navList[i].innerHTML = '<ul>' + iconList + '</ul>'
    }
};

addicons();
