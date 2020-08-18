require([
   "esri/WebMap", 
   "esri/views/MapView",
   "esri/widgets/Legend",
   "esri/widgets/ScaleBar"
], function(WebMap, MapView, Legend, ScaleBar){

   var map = new WebMap({
      portalItem: {
         id: '098a752b267443aeb913268e32f7f046'
      }
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-95.3698,29.7604],
      zoom: 9,
      map: map
   })

   var legend = new Legend({
      view
   })
   view.ui.add(legend, "top-right")

   var scalebar = new ScaleBar({
      view
   })
   view.ui.add(scalebar, "bottom-left")

})
