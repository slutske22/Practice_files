require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/FeatureLayer"
], function(Map, MapView, FeatureLayer){

   const firesLayer = new FeatureLayer({
      url: "https://services7.arcgis.com/WSiUmUhlFx4CtMBB/arcgis/rest/services/AUBushfireBurnArea/FeatureServer"
   })

   const biodiversityHotspots = new FeatureLayer({
      url: "https://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/Biodiversity_Hotspots_2016_WFL1/FeatureServer"
   })

   var map = new Map({
      basemap: "gray-vector",
      layers: [biodiversityHotspots, firesLayer]
   })

   var view = new MapView({
      container: "viewDiv",
      center: [135, -26],
      zoom: 4,
      map: map
   })

})
