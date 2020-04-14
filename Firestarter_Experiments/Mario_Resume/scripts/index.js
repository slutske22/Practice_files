import './animatemario.js'
import { directions } from './paths.js'

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


L.imageOverlay('images/mario_map.png', bounds).addTo(map);

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

var Mario = L.imageOverlay('images/characters/mario-front.gif', [[sp[0] - size / 2, sp[1] - size / 2],[sp[0] + size / 2, sp[1] + size / 2]])
Mario.addTo(map);
window.Mario = Mario


// ----------------------------------------------------------
//
//             Mario's Path
//
// ----------------------------------------------------------

var position = "starting point"
window.position = position

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

map.on('keydown', e => {

   const { key } = e.originalEvent
   console.log("Key pressed:", key, "Current Position:", position, 'latlngs:', directions[position][key].latlngs)

   if (directions[position][key]){

      var { latlngs } = directions[position][key]

      var options = {
         distance: 100000, 
         interval: 20, 
         onEnd: () =>  {
            // position = directions[position][key].destination
            var newPosition = directions[position][key].destination
            position = newPosition
            window.position = position
            console.log(position)
         }
      }

      Mario.animate(latlngs, options)
      
      map.panTo(latlngs[latlngs.length-1], {duration: 5, easeLinearity: 1})

   }

})


document.addEventListener('DOMContentLoaded', () => {
   document.querySelector('#map').focus()
})


