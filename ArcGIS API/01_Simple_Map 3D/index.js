require([
   "esri/Map", 
   "esri/views/SceneView",
], function(Map, SceneView){

   var map = new Map({
      basemap: "topo-vector",
      ground: "world-elevation"
   })

   var view = new SceneView({
      container: "viewDiv",
      map: map,
      camera: {
         position: {
           x: -118.808,
           y: 33.961,
           z: 2000 // meters
         },
         tilt: 75
      }
   })

})
