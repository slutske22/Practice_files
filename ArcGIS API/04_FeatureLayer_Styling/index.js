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

   var trailheadsRenderingRules = {
      type: "simple",
      symbol: {
         type: "picture-marker",
         url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
         width: "18px",
         height: "18px"
      }
   }

   var trailheadsLabels = {
      symbol: {
         type: "text",
         color: "#FFFFFF",
         haloColor: "#5E8D74",
         haloSize: "2px",
         font: {
            size: "12px:",
            family: "Noto Sans",
            style: "italic",
            weight: "normal"
         }
      },
      labelPlacement: "above-center",
      labelExpressionInfo: {
         expression: "$feature.TRL_NAME"
      }
   }

   var trails = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
      renderer: trailheadsRenderingRules,
      labelingInfo: [trailheadsLabels]
   })

   map.add(trails)

})
