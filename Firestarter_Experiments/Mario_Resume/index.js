import './animatemario.js'

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
   center: [210, 264],
   zoom: 2,
   crs: L.CRS.Simple,
   minZoom: 0,
   maxZoom: 3,
   maxBounds: maxBounds,
   zoomDelta: 0.25,
   zoomSnap: 0.25,
   keyboardPanDelta: 0
});


L.imageOverlay('mario_map.png', bounds).addTo(map);

// map.fitBounds(bounds);

map.on('click', (e) => {
   console.log(e.latlng)
})



// ----------------------------------------------------------
//
//             Mario Character
//
// ----------------------------------------------------------

var sp = [156, 272] // starting point in (y,x) coordinates
var size = 15

var Mario = L.imageOverlay('images/mario-front.gif', [[sp[0] - size / 2, sp[1] - size / 2],[sp[0] + size / 2, sp[1] + size / 2]])
Mario.addTo(map);
window.Mario = Mario


// ----------------------------------------------------------
//
//             Mario's Path
//
// ----------------------------------------------------------

const MariosPathLatLngs = [
   L.latLng(155, 271), // moving right
   L.latLng(155, 235),
   L.latLng(200, 235), // moving up
   L.latLng(216, 241),
   L.latLng(245, 240),
   L.latLng(260, 218),
   L.latLng(312, 218)
]


// VISUALIZE MARIO'S PATH ON MAP :
// L.polyline(MariosPathLatLngs).addTo(map)
// MariosPathLatLngs.forEach( (point, index) => {
//    L.circle(point, {radius: 5}).bindPopup(`<pre>${JSON.stringify(point)}, ${index}</pre>`).addTo(map)
// })



map.once('keydown', e => {
   console.log(e.originalEvent)
   Mario.animate(MariosPathLatLngs)
   map.panTo(MariosPathLatLngs[MariosPathLatLngs.length-1], {duration: 5, easeLinearity: 1})
})


document.addEventListener('DOMContentLoaded', () => {
   document.querySelector('#map').focus()
})


