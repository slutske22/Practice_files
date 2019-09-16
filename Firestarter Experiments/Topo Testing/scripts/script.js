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

// use only active activearea
leafletMap.setActiveArea('activeArea')

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
      }).addTo(leafletMap)
      .setOpacity(0);


// Write a function which utilizes the getColor function, pulling data from the colorPicker layer
function getElevation(location){
   var color = colorPicker.getColor(location)
   let R = color[0];
   let G = color[1];
   let B = color[2];

   let height = -10000 + ((R * 256 * 256 + G * 256 + B) * 0.1)
   let heightRounded = Math.round( height * 10) / 10 + ' meters';
   return heightRounded;
}

// Then add the outdoors layer to be the one to be seen by the viewer
// Not ideal as it loads both baselayers.  visual performance issues
// Need to figure out how to get data from the RGB layer without showing it
// This will be the case for all data layers
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

// Make empty array to recieve randomly generated markers
randomMarkerArray = [];

// Useful random number function
function randomNumber(min, max){
   return ( Math.random() * (max - min) ) + min
};

// Define buttons
var randomMarkerButton = document.querySelector('#randomMarker');
var clearMarkersButton = document.querySelector('#clearRandomMarkers');

// Empty variable to recieve the layergroup which is created when a the button is pressed
var randomMarkerGroup;

// When the button is pressed:
randomMarkerButton.addEventListener("click", function(){
   // Get map bounds:
   let mapBoundLeft = leafletMap.getBounds()._southWest.lng;
   let mapBoundRight = leafletMap.getBounds()._northEast.lng;
   let mapBoundTop = leafletMap.getBounds()._northEast.lat;
   let mapBoundBottom = leafletMap.getBounds()._southWest.lat;

   // Make random number within bounds
   let randomLng = randomNumber(mapBoundLeft, mapBoundRight);
   let randomLat = randomNumber(mapBoundTop, mapBoundBottom);

   let position = [randomLat, randomLng];
   let elevation = getElevation( position );

   // Create a random marker
   let randomMarker = L.marker( position )
      .bindPopup(`This is a randomly placed marker<br>
         <br>
         Latitude: ${randomLat}<br>
         Longitude: ${randomLng}<br>
         Elevation: ${elevation}` , {removable: true, editable: true});

   // leafletMap.panTo(position)

   // Give each random marker its own name with its index for easy reference
   randomMarker._name = `Random Marker ${randomMarkerArray.length + 1}`;
   // Push it into the array
   randomMarkerArray.push(randomMarker);

   // Create layerGroup using the array
   randomMarkerGroup = L.layerGroup( randomMarkerArray )
      .addTo(leafletMap);
   // Open popup on most recently added marker
   randomMarkerArray[randomMarkerArray.length - 1].openPopup();

})


clearMarkersButton.addEventListener("click", function(){
   // Remove the layergroup of random markers
   randomMarkerGroup.remove();
   // Empty the array to truly refresh the random marker layer
   randomMarkerArray = [];
}, false);



//------------------------------------------------------------------------//
//                MAP CENTERING ON POPUP OPEN
//------------------------------------------------------------------------//
// A nice little function lifted from https://stackoverflow.com/questions/22538473/leaflet-center-popup-and-marker-to-the-map.  This centers the map at the center of the popup, not at the origin of its source.  Works great for small source popups (markers, small circles, etc.)  Will need to adjust when the source is large, like a large polygon.


leafletMap.on('popupopen', function(e) {
    var px = leafletMap.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= e.target._popup._container.clientHeight/2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    leafletMap.panTo(leafletMap.unproject(px),{animate: true}); // pan to new center
});













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
