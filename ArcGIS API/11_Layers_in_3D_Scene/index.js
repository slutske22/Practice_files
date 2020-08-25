require([
   "esri/Map", 
   "esri/views/SceneView",
   "esri/layers/FeatureLayer",
], function(Map, SceneView, FeatureLayer){

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

   var trailheaderLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
   })
   map.add(trailheaderLayer)

   // Trails feature layer (lines)
   var trailsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
      definitionExpression: "ELEV_GAIN > 250",
      renderer: {
         type: "simple",
         symbol: {
            type: "simple-line",
            color: "green",
            width: "2px"
         }
      },
      outFields: ["*"],
      popupTemplate: {
         // Enable a popup
         title: "{TRL_NAME}", // Show attribute value
         content: "The trail elevation gain is {ELEV_GAIN} ft." // Display text in pop-up
       }
   });
   map.add(trailsLayer, 0);
 
   // Parks and open spaces (polygons)
   var parksLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
   });
   map.add(parksLayer, 0);
   
})
