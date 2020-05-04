// http://www.liedman.net/tiled-maps/


import './tools/leaflet.tilelayer.colorpicker.js'

var mapOptions = {
  center: {lat: 42.93669471266819, lng: -122.13191986083986},
  zoom: 12
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

// Alternatively, You can define a new gridlayer class and invoke and instance:
var TopoLayer = L.GridLayer.extend({

   // object to hold canvas contexts as they are created and updated
   _contexts: {},

   // array to recieve worker objects when they get created
   _workers: [],

   // add worker initialization to beforeAdd Method
	beforeAdd: function (map) {

      map._addZoomLimit(this);

      // object to hold canvas contexts as they are created and updated
      this._contexts = {}

      // array to recieve worker objects when they get created
      this._workers = []

      for (let i = 0; i < 16; i++){
         var number = i < 9
            ? `0${i+1}`
            : i + 1
            this._workers[i] = new Worker('worker.slopeaspect.js', {name: `Worker ${number}`})
            this._workers[i].onmessage = this.updateTile
      }

      console.log(this)

	},

   // terminate all workers when layer is removed
	onRemove: function (map) {
      for (let i = 0; i < 16; i++){
         this._workers[i].terminate()
      }
		this._removeAllTiles();
		L.DomUtil.remove(this._container);
		map._removeZoomLimit(this);
		this._container = null;
		this._tileZoom = undefined;
	},

   // createTile method required - creates a new tile of the gridlayer
   createTile: function(coords){

      var tile = L.DomUtil.create('canvas', 'leaflet-tile')
      var size = this.getTileSize()
      tile.width = size.x
      tile.height = size.y

      var ctx = tile.getContext('2d')
      var demCtx
      var id = uniqueId()

      this._contexts[id] = ctx

      // define a new image element and its attributes
      var demImg = new Image()
      var { x, y, z } = coords
      demImg.crossOrigin = "*"
      demImg.src = `https://api.mapbox.com/v4/mapbox.terrain-rgb/${z}/${x}/${y}.pngraw?access_token=${mapboxAccessToken}`
      demImg.onload = function(){
         var c = document.createElement('canvas')
         c.width = c.height = 256
         demCtx = c.getContext('2d')
         demCtx.drawImage(demImg, 0, 0)
         redraw()
      }

      const redraw = () => {

         // console.log(this)

         var data = { id: id }
         data.raster = demCtx.getImageData(0, 0, 256, 256)
         var workerIndex = (x + y) % this._workers.length
         this._workers[workerIndex].postMessage(data)

      }

      return tile

   },

   updateTile: function(e){

      var ctx = this._contexts[e.data.id]
      var imgData = ctx.createImageData(256, 256)
      
      var shades = e.data.shades
      imgData.data.set(shades)
      ctx.putImageData(imgData, 0, 0)

   }



})

var elevationLayer = new TopoLayer()
window.elevationLayer = elevationLayer


var elevationLayer2 = new TopoLayer()
window.elevationLayer2 = elevationLayer2





