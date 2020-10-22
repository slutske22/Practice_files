// http://www.liedman.net/tiled-maps/


var mapOptions = {
  center: [33.270, -116.650],
  zoom: 12
};


var mapboxAccessToken = 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'


// CREATE MAP
var map = L.map('mapid', mapOptions);

// ADDBASELAYER
var mapBoxOutdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
   })
   
mapBoxOutdoors.addTo(map);





// CREATE ELEVATION LAYER
var elevationLayer = L.gridLayer()

var contexts = {}
var zFactor
var workers = []

for (let i = 0; i < 16; i++) {
   workers[i] = new Worker('worker.js')
}

elevationLayer.redrawQueue = []

elevationLayer.createTile = function(canvas, tilePoint, zoom){

   var demImg = new Image()
   var ctx = canvas.getContext('2d')
   var demCtx
   var renderedZFactor
   var id = uniqueId()

   contexts[id] = ctx

   function redraw(){

      var transferable = []
      var data = { id: id }

      if (renderedZFactor !== zFactor){
         data.raster = demCtx.getImageData(0, 0, 256, 256).data.buffer
         data.zFactor = zFactor
         transferable.push(data.raster)
      }

      var workerIndex = (tilePoint.x + tilePoint.y) % workers.length
      workers[workerIndex].postMessage(data, transferable)

      renderedZFactor = zFactor

   }

   demImg.onload = function(){
      var c = document.createElement('canvas')
      c.width = c.height = 256
      demCtx = c.getContext('2d')
      demCtx.drawImage(0, 0, demImg)

      redraw()
      elevationLayer.redrawQueue.push(redraw)

   }

   demImg.crossOrign = "*"
   demImg.src = L.Util.template(`https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${mapboxAccessToken}`, L.extend({z: zoom}, tilePoint))

}

elevationLayer.redrawTiles = function () {
   elevationLayer.redrawQueue.forEach( function(redraw){
      redraw()
   })
}


// REDRAW TILES ON VIEW RESET
map.on('viewreset', () => {
   console.log('view')
})


function updateTile(e){
   var ctx = contexts[e.data.id]
   var imgData = ctx.createImageData(256,256)

   var shades = new Uint8ClampedArray(e.data.shades)
   imgData.data.set(shades)
   ctx.putImageData(imgData, 0, 0)
}


elevationLayer.addTo(map)


// UTIL FUNCTIONS

var uniqueId = ( function(){
   var lastId = 0
   return function(){
      return ++lastId
   }
} )()



