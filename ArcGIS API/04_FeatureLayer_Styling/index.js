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

   var trailheads = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
      renderer: trailheadsRenderingRules,
      labelingInfo: [trailheadsLabels]
   })

   map.add(trailheads)




   var trailsRenderRule = {
      type: "simple",
      symbol: {
         type: "simple-line",
         style: "solid",
         color: "#BA55D3"
      },
      visualVariables: [
         {
            type: "size",
            field: "ELEV_GAIN",
            minDataValue: 0,
            maxDataValue: 2300,
            minSize: "3px",
            maxSize: "7px"
         }
      ]
   }

   var trails = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
      renderer: trailsRenderRule,
      opacity: 0.75
   })

   map.add(trails)

   var bikeTrailsRenderingRule = {
      type: "simple",
      symbol: {
         type: "simple-line",
         style: "short-dot",
         width: "1px",
         color: 'green'
      }
   }

   var bikePaths = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
      renderer: bikeTrailsRenderingRule,
      definitionExpress: 'USE_BIKE = "YES"'
   })
   
   map.add(bikePaths)





   const createFillSymbols = (value, color) => ({
      value,
      symbol: {
         color,
         type: "simple-fill",
         style: "solid",
         outline: {
            style: "none"
         }
      },
      label: value
   })

   const openSpacesRenderingRule = {
      type: "unique-value",
      field: "TYPE",
      uniqueValueInfos: [
         createFillSymbols("Natural Areas", "#9E559C"),
         createFillSymbols("Regional Open Space", "#A7C636"),
         createFillSymbols("Local Park", "#149ECE"),
         createFillSymbols("Regional Recreational Park", "#ED5151")
      ]
   }

   const openspacesLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
      renderer: openSpacesRenderingRule,
      opacity: 0.4
   })

   map.add(openspacesLayer)

})
