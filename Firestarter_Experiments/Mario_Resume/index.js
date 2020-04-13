// Mario Graphics:

// http://www.mariouniverse.com/maps-snes-smw/

// ----------------------------------------------------------
//
//             Initialize Map
//
// ----------------------------------------------------------

var bounds = [[0,0], [522,1000]];

const buffer = 350
var maxBounds = [
   [bounds[0][0] - buffer, bounds[0][1] - buffer],
   [bounds[1][0] + buffer, bounds[1][1] + buffer]
]

var map = L.map('map', {
   crs: L.CRS.Simple,
   minZoom: 0,
   maxZoom: 3,
   maxBounds: maxBounds,
   zoomDelta: 0.25,
   zoomSnap: 0.25
});


var image = L.imageOverlay('mario_map.png', bounds).addTo(map);

map.fitBounds(bounds);

map.on('click', (e) => {
   console.log(e.latlng)
})



// ----------------------------------------------------------
//
//             Mario Character
//
// ----------------------------------------------------------


var image = L.imageOverlay('images/mario-front.gif', [[145, 262],[165, 282]]).addTo(map);