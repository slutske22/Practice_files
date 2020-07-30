require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/Layer"
], function(Map, MapView, Layer){

   var map = new Map({
      basemap: "topo-vector"
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-118.71511,34.09042],
      zoom: 11,
      map: map
   })


   function addLayer(layerItemPromise, index) {
      return layerItemPromise
         .then( layer => {
            map.add(layer, index)
         })
   }

   var trailheadsfromportal = Layer.fromPortalItem({
      portalItem: {
         id: '33fc2fa407ab40f9add12fe38d5801f5'
      }
   })

   var trailsfromportal = Layer.fromPortalItem({
      portalItem: {
         id: '52a162056a2d48409fc3b3cbb672e7da'
      }
   })

   var openspacesfromportal = Layer.fromPortalItem({
      portalItem: {
         id: '83cf97eea04e4a699689c250dd07b975'
      }
   })

   addLayer(trailheadsfromportal, 0)
   addLayer(trailsfromportal, 0)
   addLayer(openspacesfromportal, 0)


})
