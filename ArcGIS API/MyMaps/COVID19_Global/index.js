require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/TileLayer",
   "esri/layers/FeatureLayer"
], function(Map, MapView, TileLayer, FeatureLayer){

   var fireflyLayer = new TileLayer({
      url: 'https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer'
   })

   var referenceLayer = new TileLayer({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Reference/MapServer'
   })

   var covidLayer = new FeatureLayer({
      url: 'https://services8.arcgis.com/bc1qjUYAgNrEBXVh/arcgis/rest/services/COVID19_Time_Series_Combined/FeatureServer'
   })

   var map = new Map({
      // basemap,
      layers: [fireflyLayer, covidLayer, referenceLayer]
   })

   var view = new MapView({
      container: "viewDiv",
      center: [0, 20],
      zoom: 3,
      map: map
   })

})
