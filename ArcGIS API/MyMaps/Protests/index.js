import { popupTemplate } from './popupTemplate.js'
import { racialRenderer, nonRacialRenderer } from './renderers.js'

require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/FeatureLayer",
   "esri/widgets/Legend",
   "esri/widgets/TimeSlider",
], function(Map, MapView, FeatureLayer, Legend, TimeSlider){


   var racialProtestsLayer = new FeatureLayer({
      url: 'https://services8.arcgis.com/3Y7J7SmaNLGLT6ec/arcgis/rest/services/2020_Protests_with_Location/FeatureServer',
      outFields: ['*'],
      renderer: racialRenderer,
      popupTemplate,
      definitionExpression: "Tags LIKE '%racial%' OR Tags LIKE '%police%'"
   })

   var noneRacialProtestsLayer = new FeatureLayer({
      url: 'https://services8.arcgis.com/3Y7J7SmaNLGLT6ec/arcgis/rest/services/2020_Protests_with_Location/FeatureServer',
      outFields: ['*'],
      renderer: nonRacialRenderer,
      popupTemplate,
      definitionExpression: "Tags NOT LIKE '%racial%' AND Tags NOT LIKE '%police%'"
   })

   var map = new Map({
      basemap: "dark-gray-vector",
      layers: [noneRacialProtestsLayer, racialProtestsLayer]
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-100, 38],
      zoom: 3,
      map: map,
      highlightOptions: {
         fillOpacity: 0,
         color: [50, 50, 50]
      }
   })

   // client side filtering on layer load
   var protestLayerView //  for access later on
   // view.whenLayerView(racialProtestsLayer)
   // .then(layerView => {
   //    protestLayerView = layerView
   //    protestLayerView.effect = {
   //       filter: {
   //          where: "Tags LIKE '%racial%' OR '%Racial%' OR '%police%' OR '%Police%'"
   //       },
   //       excludedEffect: "opacity(25%) invert(1)",
   //    }
   // })
   

   var legend = new Legend({
      view: view,
      label: "Number of Attendees",
      layerInfos: [
         {
            title: "Protests 2020",
            layer: racialProtestsLayer,
         }
      ]
   })

   view.ui.add(legend, 'bottom-left')
   


   var timeSlider = new TimeSlider({
      container: "timeSlider",
      playRate: 100,
      mode: "cumulative-from-start",
      fullTimeExtent: {
         start: new Date(2019, 12, 31),
         end: new Date(2020, 12, 31)
      },
      stops: {
         interval: {
           value: 1,
           unit: "days"
         }
      },
      tickConfigs: [
         {
            labelsVisible: true,
            labelFormatFunction: (value) => {
              const date = new Date(value);
              return `'${date.getMonth()}`;
            }
         }
      ]
   })

   view.ui.add(timeSlider, "bottom-right");


   timeSlider.watch("timeExtent", function(value){

      // update layer view filter to reflect current timeExtent, all protests in layer up to timeExtend
      console.log(value.end)
      const dateString = `${value.end.toLocaleString()}`
      console.log(dateString)

      // protestLayerView.effect = {
      //    filter: {
      //       where: `Date <= '${dateString}'`
      //    },
      //    excludedEffect: "opacity(10%)",
      // }

    });


})
