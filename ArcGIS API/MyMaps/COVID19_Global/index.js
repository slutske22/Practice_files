require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/TileLayer",
   "esri/layers/FeatureLayer",
   "esri/widgets/TimeSlider"
], function(Map, MapView, TileLayer, FeatureLayer, TimeSlider){

   var fireflyLayer = new TileLayer({
      url: 'https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer'
   })

   var referenceLayer = new TileLayer({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Reference/MapServer'
   })

   var covidLayer = new FeatureLayer({
      url: 'https://services8.arcgis.com/bc1qjUYAgNrEBXVh/arcgis/rest/services/COVID19_Time_Series_Combined/FeatureServer',
      renderer: {
         type: "heatmap",
         field: "Deaths",
         colorStops: [
           { ratio: 0, color: "rgba(255, 255, 255, 0)" },
           { ratio: 0.5, color: "rgba(255, 140, 0, 1)" },
           { ratio: 1, color: "rgba(255, 0, 0, 1)" }
         ],
         minPixelIntensity: 0,
         maxPixelIntensity: 5000000
      }
   })

   var map = new Map({
      // basemap,
      layers: [fireflyLayer, covidLayer, referenceLayer]
   })

   var view = new MapView({
      container: "viewDiv",
      center: [0, 20],
      zoom: 2,
      map: map
   })


   var timeSlider = new TimeSlider({
      container: "timeSliderDiv",
      view: view,
      // show data within a given time range
      // in this case data within one year
      mode: "time-window",
      fullTimeExtent: {
         start: new Date(2020, 0, 1),
         end: new Date(2020, 11, 31) > new Date() ? new Date() : new Date(2020, 11, 31)
      },
      stops: {
         interval: {
           value: 10,
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
   });

   view.ui.add(timeSlider, "bottom-right");

   var covidLayerView;
   view.whenLayerView(covidLayer)
      .then(layerView => {

         console.log(covidLayer.timeInfo)

         covidLayerView = layerView
         const fullTimeExtent = covidLayer.timeInfo.fullTimeExtent
         const start = fullTimeExtent.start
         // timeSlider.fullTimeExtent = fullTimeExtent
         // timeSlider.values = [start]

      })


   timeSlider.watch("timeExtent", function(value){
      // update layer view filter to reflect current timeExtent

      console.log(value)

      covidLayerView.filter = {
         timeExtent: value
      }
   })

})
