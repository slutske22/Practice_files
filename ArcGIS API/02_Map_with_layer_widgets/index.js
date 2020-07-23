require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/widgets/BasemapToggle",
   "esri/widgets/BasemapGallery"
], function(Map, MapView, BasemapToggle, BasemapGallery){

   var map = new Map({
      basemap: "gray"
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-118.71511,34.09042],
      zoom: 11,
      map: map
   })

   var basemapToggle = new BasemapToggle({
      view,
      nextBasemap: "topo-vector"
   })

   view.ui.add(basemapToggle, "bottom-right")

   var baseMapGallery = new BasemapGallery({
      view,
      source: {
         portal: {
            url: "https://www.arcgis.com",
            useVectorBasemaps: true
         }
      }
   })

   view.ui.add(baseMapGallery, "top-right")

})
