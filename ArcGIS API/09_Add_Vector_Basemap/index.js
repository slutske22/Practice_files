require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/Basemap",
   "esri/layers/VectorTileLayer",
   "esri/layers/TileLayer"
], function(Map, MapView, Basemap, VectorTileLayer, TileLayer){

   var basemap = new Basemap({

      baseLayers: [
         new TileLayer({
            portalItem: {
               id: '1b243539f4514b6ba35e7d995890db1d'
            }
         }),
         new VectorTileLayer({
            portalItem: {
               id: 'd2ff12395aeb45998c1b154e25d680e5'
            },
            opacity: 0.5
         })
      ]

   })

   var map = new Map({
      basemap: basemap
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-118.71511,34.09042],
      zoom: 6,
      map: map
   })


})
