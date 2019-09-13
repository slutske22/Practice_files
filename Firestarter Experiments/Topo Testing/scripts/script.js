/*-----------------------------------------------------------------------
███    ███  █████  ██████
████  ████ ██   ██ ██   ██
██ ████ ██ ███████ ██████
██  ██  ██ ██   ██ ██
██      ██ ██   ██ ██

██ ███    ██ ██ ████████ ██  █████  ██      ██ ███████ ███████
██ ████   ██ ██    ██    ██ ██   ██ ██      ██    ███  ██
██ ██ ██  ██ ██    ██    ██ ███████ ██      ██   ███   █████
██ ██  ██ ██ ██    ██    ██ ██   ██ ██      ██  ███    ██
██ ██   ████ ██    ██    ██ ██   ██ ███████ ██ ███████ ███████
-----------------------------------------------------------------------*/



var mapOptions = {
  center: [33.270, -116.650],
  zoom: 8
}


//Create a map and assign it to the map div
var leafletMap = L.map('leafletMapid', mapOptions);

//add a baseLayer
var baseLayer =  new L.tileLayer('https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
         //accesstoken from mapbox.com account
         //mapbox.com username: slutske22
         //mapbox.com PW: ורדינה1!
      });

baseLayer.addTo(leafletMap)




/*-----------------------------------------------------------------------
███████ ██      ███████ ██    ██  █████  ████████ ██  ██████  ███    ██
██      ██      ██      ██    ██ ██   ██    ██    ██ ██    ██ ████   ██
█████   ██      █████   ██    ██ ███████    ██    ██ ██    ██ ██ ██  ██
██      ██      ██       ██  ██  ██   ██    ██    ██ ██    ██ ██  ██ ██
███████ ███████ ███████   ████   ██   ██    ██    ██  ██████  ██   ████

████████ ███████ ███████ ████████ ███████
   ██    ██      ██         ██    ██
   ██    █████   ███████    ██    ███████
   ██    ██           ██    ██         ██
   ██    ███████ ███████    ██    ███████
------------------------------------------------------------------------*/


//--------------  USING color picker -----------------------------------//

// First load colorPicker layer using the mapbox topo RGB tileset
var colorPicker = L.tileLayer.colorPicker('https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
         //accesstoken from mapbox.com account
         //mapbox.com username: slutske22
         //mapbox.com PW: ורדינה1!
      }).addTo(leafletMap);

// Write some code which utilizes the getColor function, pulling data from the colorPicker layer
leafletMap.on('click', function(event){
   var color = colorPicker.getColor(event.latlng);
   console.log(color);
})

function getElevation(location){
   var color = colorPicker.getColor(location)
}


var mapBoxOutdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
      }).addTo(leafletMap);










/*-----------------------------------------------------------------------
███    ███  █████  ██████  ██   ██ ███████ ██████  ███████
████  ████ ██   ██ ██   ██ ██  ██  ██      ██   ██ ██
██ ████ ██ ███████ ██████  █████   █████   ██████  ███████
██  ██  ██ ██   ██ ██   ██ ██  ██  ██      ██   ██      ██
██      ██ ██   ██ ██   ██ ██   ██ ███████ ██   ██ ███████
-----------------------------------------------------------------------*/


//------------------------------------------------------------------------//
//                RANDOM MARKER
//------------------------------------------------------------------------//

randomMarkerArray = [];


function randomNumber(min, max){
   return ( Math.random() * (max - min) ) + min
};


randomMarkerButton = document.querySelector('#randomMarker');

randomMarkerButton.addEventListener("click", function(){
   let mapBoundLeft = leafletMap.getBounds()._southWest.lng;
   let mapBoundRight = leafletMap.getBounds()._northEast.lng;
   let mapBoundTop = leafletMap.getBounds()._northEast.lat;
   let mapBoundBottom = leafletMap.getBounds()._southWest.lat;


   let randomLng = randomNumber(mapBoundLeft, mapBoundRight);
   let randomLat = randomNumber(mapBoundTop, mapBoundBottom);

   let randomMarker = L.marker( [randomLat, randomLng], {
      color: 'red',
      weight: 0.5,
	   fillColor: '#f03',
	   fillOpacity: 0.5,
	   radius: 10
   })
      .addTo(leafletMap)
      .bindPopup(`This is a randomly placed marker<br>
         Latitude: ${randomLat}<br>
         Longitude: ${randomLng}` , {removable: true, editable: true})
      .openPopup();

   leafletMap.panTo([randomLat, randomLng])

   randomMarker._name = `Random Marker ${randomMarkerArray.length + 1}`
   randomMarkerArray.push(randomMarker)
   console.clear();
   console.log(`randomMarkerArray:`)
   console.log(randomMarkerArray);

})



















//  ------------  ELEVATION TESTS   -----------------------------------  //
//  ------------  USING CANVAS MODE -----------------------------------  //
//                no idea what im doing here lol                         //

///  from https://labs.mapbox.com/bites/00307/?elev=10#8/37.727/-123.975


var elevTiles = new L.Canvas({
    unloadInvisibleTiles:true,
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
});



elevTiles.drawTile = function (canvas, tile, zoom) {
    tileSize = this.options.tileSize;

    var context = canvas.getContext('2d'),
        imageObj = new Image(),
        tileUID = ''+zoom+'/'+tile.x+'/'+tile.y;

    var drawContext = canvas.getContext('2d');

    // To access / delete elevTiles later
    tile.id = tileUID;

    tileContextsElev[tileUID] = drawContext;

    imageObj.onload = function() {
        // Draw Image Tile
        context.drawImage(imageObj, 0, 0);

        // Get Image Data
        var imageData = context.getImageData(0, 0, tileSize, tileSize);

        elevWorker.postMessage({
            data:{
                tileUID:tileUID,
                tileSize:tileSize,
                array:imageData.data,
                drawElev: drawElev
            },
                type:'tiledata'},
            [imageData.data.buffer]);
    };

    // Source of image tile
    imageObj.crossOrigin = 'Anonymous';
    imageObj.src = 'https://a.tiles.mapbox.com/v4/mapbox.terrain-rgb/'+zoom+'/'+tile.x+'/'+tile.y+'.pngraw?access_token=' + L.mapbox.accessToken;

};
