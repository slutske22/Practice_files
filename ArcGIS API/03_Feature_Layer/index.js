require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/FeatureLayer"
], function(Map, MapView, FeatureLayer){

   var map = new Map({
      basemap: "topo-vector"
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-118.71511,34.09042],
      zoom: 11,
      map: map
   })


   var trailheadsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
   });
   map.add(trailheadsLayer)

   var trailsLayer = new FeatureLayer({
      
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
      // definitionExpression: "ELEV_GAIN < 250",
      renderer: {
         type: "simple",
         symbol: {
            type: "simple-line",
            color: "green",
            width: "2px"
         }
      },
      outFields: ["TRL_NAME", "ELEV_GAIN"],
      popupTemplate: {
         // Enable a popup
         title: "{TRL_NAME}", // Show attribute value
         content: "The trail elevation gain is {ELEV_GAIN} ft." // Display text in pop-up
      }
   })
   map.add(trailsLayer, 0)

   // var parksLayer = new FeatureLayer({
   //    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
   // })
   // map.add(parksLayer, 0)

})
