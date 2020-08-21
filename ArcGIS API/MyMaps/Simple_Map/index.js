// Color Ramps:
// https://developers.arcgis.com/javascript/latest/guide/esri-color-ramps/index.html

require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/FeatureLayer",
   "esri/widgets/Legend"
], function(Map, MapView, FeatureLayer, Legend){


   var defaultSymbol = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      outline: {
         // autocasts as new SimpleLineSymbol()
         color: [128, 128, 128, 0.2],
         width: "0.5px"
      }
   }
   
   var renderer = {
      type: "simple",
      symbol: defaultSymbol,
      label: "US County",
      visualVariables: [
         {
            type: "color",
            field: "totCases",
            legendOptions: {
               title: "Total cases per US county"
             },
             stops: [
               {
                  value: 0,
                  color: "#ebe6df",
                  label: "1"
               },
               {
                  value: 500,
                  color: "#7bccc4",
                  label: "500"
               },
               {
                  value: 11000,
                  color: "#436480",
                  label: "11000"
               }
             ]
         }
      ]
   }

   var popupTemplate = {
      title: "{Cty_NAME}, {ST_ABBREV}",
      content: `
         <div class="covid-popup">
            <div class="case-group">
               <p>Active Cases: <b>{actCases}</b> <span class="small">(Approx)</span></p>
               <p>Total Cases: <b>{totCases}</b></p>
               <p>Total Deaths: <b>{Deaths}</b></p>
               <p><b>{Case100K}</b> cases per 100k persons</p>
               <p><span class="small">2019 Estimated Population: {TOTPOP_CY}</span></p>
            </div>
         </div>`,
      fieldInfos: [
         {
            fieldName: "actCases",
            format: {
               digitSeparator: true,
               places: 0
            }
         },
         {
            fieldName: "totCases",
            format: {
               digitSeparator: true,
               places: 0
            }
         },
         {
            fieldName: "Deaths",
            format: {
               digitSeparator: true,
               places: 0
            }
         },
         {
            fieldName: "Case100K",
            format: {
               digitSeparator: true,
               places: 2
            }
         },
         {
            fieldName: "Deaths",
            format: {
               digitSeparator: true,
               places: 0
            }
         },
         {
            fieldName: "TOTPOP_CY",
            format: {
               digitSeparator: true,
               places: 0
            }
         },
      ]
   }

   var COVIDLayer = new FeatureLayer({
      url: "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/US_County_COVID19_Trends/FeatureServer",
      outFields: ["*"],
      renderer,
      popupTemplate
   })

   var map = new Map({
      basemap: "gray-vector",
      layers: [COVIDLayer]
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-100, 38],
      zoom: 4,
      map: map
   })

   var legend = new Legend({
      view: view,
      layerInfos: [
         {
            layer: COVIDLayer,
         }
      ]
   })

   view.ui.add(legend, 'top-right')

})


