import './animatemario.js'
import { directions, paths } from './paths.js'

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

export var map = L.map('map', {
   center: [205, 274],
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

export var Mario = L.imageOverlay('images/characters/mario-front.gif', [[sp[0] - size / 2, sp[1] - size / 2],[sp[0] + size / 2, sp[1] + size / 2]])
Mario.addTo(map);
window.Mario = Mario


// ----------------------------------------------------------
//
//             Mario's Paths
//
// ----------------------------------------------------------


var position = "starting point"
window.position = position


// VISUALIZE MARIO'S PATH ON MAP :
// L.polyline(paths.path1).addTo(map)
// L.polyline(paths.path2).addTo(map)


map.on('keydown', e => {

   const { key } = e.originalEvent
   console.log("Key pressed:", key, "Current Position:", position, 'latlngs:', directions[position][key].latlngs)

   if (directions[position][key]){

      var { latlngs } = directions[position][key]

      var options = {
         onEnd: () =>  {
            var newPosition = directions[position][key].destination
            position = newPosition
            window.position = position
            console.log(position)
            if (directions[position].trigger){
               directions[position].trigger()
            }
         }
      }

      Mario.animate(latlngs, options)
      
      map.panTo(latlngs[latlngs.length-1], {duration: 5, easeLinearity: 1})

   }

})


// ----------------------------------------------------------
//
//             Overlays, Triggers, and Toggles
//
// ----------------------------------------------------------

map.createPane('variable-overlays')
map.getPane('variable-overlays').style.zIndex = 350

var tube1 = L.imageOverlay('./images/overlays/tube1.png', [[368.5,242],[316.1, 279.7]], {pane: 'variable-overlays'})
tube1.addTo(map)




document.addEventListener('DOMContentLoaded', () => {
   document.querySelector('#map').focus()
})


