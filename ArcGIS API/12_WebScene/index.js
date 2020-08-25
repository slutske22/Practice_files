require([
   "esri/WebScene", 
   "esri/views/SceneView",
   "esri/widgets/Legend"
], function(WebScene, SceneView, Legend){

   var webscene = new WebScene({
      portalItem: {
         id: '579f97b2f3b94d4a8e48a5f140a6639b'
      }
   })

   var view = new SceneView({
      container: "viewDiv",
      map: webscene,
      // camera: {
      //    position: {
      //      x: -118.808,
      //      y: 33.961,
      //      z: 2000 // meters
      //    },
      //    tilt: 75
      // }
   })

   var legend = new Legend({
      view
   })
   view.ui.add(legend, "top-right")

})
