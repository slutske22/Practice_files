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

   const popupTrailhead = {
      title: "{TRL_NAME}",
      content: "<b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
   }

   var trailheads = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
      outfields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
      popupTemplate: popupTrailhead
   })

   map.add(trailheads)

   const popupTrails = {
      title: "Trail Information",
      // content: "This is {TRL_NAME} with {ELEV_GAIN} feet of climbing"

      content: [
         {
            type: "media",
            mediaInfos: [
               {
                  type: "column-chart",
                  caption: "",
                  value: {
                     fields: ["ELEV_MIN", "ELEV_MAX"],
                     normalizedField: null,
                     tooltipField: "Min and max elevation values"
                  }
               }
            ]
         }
      ]

      // expressionInfos: [
      //    {
      //      name: "elevation-ratio",
      //      title: "Elevation change",
      //      expression: "Round((($feature.ELEV_MAX - $feature.ELEV_MIN)/($feature.LENGTH_MI)/5280)*100,2)"
      //    }
      //  ],
      //  content:  "The {TRL_NAME} trail average slope per mile is: {expression/elevation-ratio}% over a total of {LENGTH_MI} miles"
   }

   const trails = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
      outfields: ["TRL_NAME", "ELEV_GAIN", "ELEV_MIN", "ELEV_MAX", "LENGTH_MI"],
      popupTemplate: popupTrails
   })

   map.add(trails)

   const popupOpenSpaces = {
      title: "{PARK_NAME}",
      content: [
         {
            type: "fields",
            fieldInfos: [
               {
                  fieldName: "AGNCY_NAME",
                  label: "Agency",
                  isEditable: true,
                  tooltip: "Agency",
                  visible: true,
                  format: null,
                  stringFieldOption: 'text-box'
               },
               {
                  fieldName: "TYPE",
                  label: "Type",
                  isEditable: true,
                  tooltip: "Agency",
                  visible: true,
                  format: null,
                  stringFieldOption: 'text-box'
               },
               {
                  fieldName: "ACCESS_TYP",
                  label: "Access",
                  isEditable: true,
                  tooltip: "Agency",
                  visible: true,
                  format: null,
                  stringFieldOption: 'text-box'
               },
               {
                  fieldName: "GIS_ACRES",
                  label: "Acres",
                  isEditable: true,
                  tooltip: "Agency",
                  visible: true,
                  format: {
                     places: 2,
                     digitSeparator: true
                  },
                  stringFieldOption: 'text-box'
               },
            ] 
         }
      ]
   }

   const openSpaces = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
      outfields: ["AGNCY_NAME", "TYPE", "ACCESS_TYP", "GIS_ACRES"],
      popupTemplate: popupOpenSpaces
   })

   map.add(openSpaces)

})
