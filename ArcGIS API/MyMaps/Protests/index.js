import { popupTemplate } from './popupTemplate.js'
import { racialRenderer, covidRenderer, otherRenderer } from './renderers.js'

require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/FeatureLayer",
   "esri/widgets/Legend",
   "esri/widgets/TimeSlider",
], function(Map, MapView, FeatureLayer, Legend, TimeSlider){

   // define layers
   var racialProtestsLayer = new FeatureLayer({
      url: 'https://services8.arcgis.com/3Y7J7SmaNLGLT6ec/arcgis/rest/services/2020_Protests_with_Location/FeatureServer',
      outFields: ['*'],
      renderer: racialRenderer,
      popupTemplate,
      definitionExpression: "Tags LIKE '%racial%' OR Tags LIKE '%police%'"
   })

   var covidProtestsLayer = new FeatureLayer({
      url: 'https://services8.arcgis.com/3Y7J7SmaNLGLT6ec/arcgis/rest/services/2020_Protests_with_Location/FeatureServer',
      outFields: ['*'],
      renderer: covidRenderer,
      popupTemplate,
      definitionExpression: "Tags LIKE '%coronavirus%'"
   })

   var otherProtestLayer = new FeatureLayer({
      url: 'https://services8.arcgis.com/3Y7J7SmaNLGLT6ec/arcgis/rest/services/2020_Protests_with_Location/FeatureServer',
      outFields: ['*'],
      renderer: otherRenderer,
      popupTemplate,
      definitionExpression: "Tags NOT LIKE '%racial%' AND Tags NOT LIKE '%police%'"
   })

   var layers = [otherProtestLayer, covidProtestsLayer, racialProtestsLayer]




   // define map and view
   var map = new Map({
      basemap: "dark-gray-vector",
      layers
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



   // save layerviews to apply filters in timeSlider.watch
   var layerViews = []
   layers.forEach(layer => {
      view.whenLayerView(layer)
         .then( layerView => {
            layerViews.push(layerView)
         })
   })
   

   // legend
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
   

   // timeslider
   var timeSlider = new TimeSlider({
      container: "timeSlider",
      playRate: 100,
      mode: "cumulative-from-start",
      loop: false,
      fullTimeExtent: {
         start: new Date(2020, 0, 1),
         end: new Date(2020, 11, 31) > new Date() ? new Date() : new Date(2020, 11, 31)
      },
      stops: {
         interval: {
           value: 1,
           unit: "days"
         }
      },
      tickConfigs: [{
         mode: 'count',
         values: new Date(2020, 11, 31) > new Date() ? (new Date()).getMonth() + 1 : 12,
         labelsVisible: true,
         labelFormatFunction: value => {
            const date = new Date(value)
            return date.toLocaleString('default', { month: 'short' } )
         }
      }]
   })

   view.ui.add(timeSlider, "bottom-right");

   // update layer view filter to reflect current timeExtent, all protests in layer up to timeExtend
   timeSlider.watch("timeExtent", function(value){

      const dateString = value.end.getTime()

      layerViews.forEach( layerView => {
         layerView.effect = {
            filter: {
               where: `Date <= '${dateString}'`
            },
            excludedEffect: "opacity(0%)",
         }
      })

   });



})
