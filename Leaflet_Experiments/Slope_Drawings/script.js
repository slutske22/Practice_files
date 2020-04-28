// http://www.liedman.net/tiled-maps/


import './tools/leaflet.tilelayer.colorpicker.js'

var mapOptions = {
  center: {lat: 61.09569262408175, lng: -142.06970214843753},
  zoom: 8
};


var mapboxAccessToken = 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'


// CREATE MAP
var map = L.map('mapid', mapOptions);
window.map = map

// ADDBASELAYER
var mapBoxOutdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA',
      opacity: 0.5
   })
   
mapBoxOutdoors.addTo(map);


// ADD COLORPICKER FOR TESTING PURPOSES
var MAPBOX_TERRAIN_RGB = "https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=" + mapboxAccessToken;

const colorpicker = L.tileLayer.colorPicker(MAPBOX_TERRAIN_RGB, {
   attribution: "© <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a>" +
        " © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>" +
        " <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
   opacity: 0
})

colorpicker.addTo(map)

map.on("mousemove", function(event) {
   var a = colorpicker.getColor(event.latlng);
   var h = NaN;
   if (a !== null)
     h = -10000 + ((a[0] * 256 * 256 + a[1] * 256 + a[2]) * 0.1);
   map.attributionControl.setPrefix(isNaN(h) ? "N/A" : h.toFixed(1) + "m");
 });


var searchControl = L.esri.Geocoding.geosearch({position: 'topright', useMapBounds: false})
searchControl.addTo(map);





// UTIL FUNCTIONS

var uniqueId = ( function(){
   var lastId = 0
   return function(){
      return ++lastId
   }
} )()



// ANOTHER WAY

// // Alternatively, You can define a new gridlayer class and invoke and instance:
// var TopoLayer = L.GridLayer.extend({

//    createTile: function(coords){

//       var tile = L.DomUtil.create('canvas', 'leaflet-tile')
//       var size = this.getTileSize()
//       tile.width = size.x
//       tile.height = size.y

//       var ctx = tile.getContext('2d')
//       var demImg = new Image()
//       var demCtx
//       var renderedZFactor
//       var id = uniqueId()

//       this.contexts[id] = ctx

//       demImg.crossOrign = "*"
//       demImg.src = `https://api.mapbox.com/v4/mapbox.terrain-rgb/${coords.z}/${coords.x}/${coords.y}.pngraw?access_token=${mapboxAccessToken}`
//       demImg.img = new Image(256, 256)
//       demImg.img.src = demImg.src

//       ctx.drawImage(demImg.img, 0, 0)

//       function redraw(){

//          var data = { id: id }
//          var workerIndex = (coords.x + coords.y) % this.workers.length

//       }





//       return tile

//    },

//    contexts: {},

//    workers: [],

//    onAdd: function(){
//       for (let i = 0; i < 16; i++){
//          this.workers[i] = new Worker('worker.js')
//       }
//    },

//    zFactor: undefined,

//    redrawQueue: [],

//    redrawTiles: function(){

//    }

// })

// var elevationLayer = new TopoLayer()


// elevationLayer.workers = []

// for (let i = 0; i < 16; i++){
//    elevationLayer.workers[i] = new Worker('worker.js')
// }

// elevationLayer.addTo(map)





// Define a GridLayer
var elevationLayer = L.gridLayer()

// Add Variables and methods to the new GridLayer
elevationLayer.contexts = {}
elevationLayer.workers = []

// createTile method required - runs when onAdd runs (I think)
elevationLayer.createTile = function(coords){

   var tile = L.DomUtil.create('canvas', 'leaflet-tile')
   var size = this.getTileSize()
   tile.width = size.x
   tile.height = size.y

   var ctx = tile.getContext('2d')
   var demCtx
   var renderedZFactor
   var id = uniqueId()

   this.contexts[id] = ctx

   // Define a new image element and its attributes
   var demImg = new Image()
   demImg.crossOrigin = "*"
   demImg.src = `https://api.mapbox.com/v4/mapbox.terrain-rgb/${coords.z}/${coords.x}/${coords.y}.pngraw?access_token=${mapboxAccessToken}`
   demImg.onload = function(){
      var c = document.createElement('canvas')
      c.width = c.height = 256
      demCtx = c.getContext('2d')
      demCtx.drawImage(demImg, 0, 0)
      redraw()
   }

   ctx.drawImage(demImg, 0, 0)

   function redraw(){

      var data = { id: id }

      data.raster = demCtx.getImageData(0, 0, 256, 256)

      var workerIndex = (coords.x + coords.y) % elevationLayer.workers.length

      elevationLayer.workers[workerIndex].postMessage(data)

   }

   return tile

}

elevationLayer.updateTile = function(e){

   var ctx = elevationLayer.contexts[e.data.id]
   var imgData = ctx.createImageData(256, 256)

   var shades = e.data.shades
   imgData.data.set(shades)
   ctx.putImageData(imgData, 0, 0)

   // console.log(e.data)

}

for (let i = 0; i < 16; i++){
   var name = i < 9 ? `0${i+1}` : i +1
   elevationLayer.workers[i] = new Worker('worker.dem.js', { name: `Worker.dem ${name}` })
   elevationLayer.workers[i].onmessage = elevationLayer.updateTile
}

elevationLayer.addTo(map)