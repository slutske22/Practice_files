require([
   "esri/Map",
   "esri/views/MapView",
   "esri/layers/FeatureLayer",
   "esri/layers/TileLayer",
   "esri/widgets/TimeSlider",
], function (Map, MapView, FeatureLayer, TileLayer, TimeSlider, heatmapRendererCreator, heatmapSchemes) {

   var fireflyLayer = new TileLayer({
      url: 'https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer'
   })

   var referenceLayer = new TileLayer({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Reference/MapServer'
   })

   var covidLayer = new FeatureLayer({
      url:
         "https://services8.arcgis.com/bc1qjUYAgNrEBXVh/arcgis/rest/services/COVID19_Time_Series_Combined/FeatureServer",
      outFields: ["*"],
      renderer: {
         type: "heatmap",
         field: "Confirmed",
         colorStops: [
            { ratio: 0, color: "rgba(255, 255, 255, 0)" },
            { ratio: 0.025, color: "rgba(255, 255, 255, 0.7)" },
            { ratio: 0.1, color: "rgba(255, 255, 0, 1)" },
            { ratio: 0.25, color: "rgba(255, 140, 0, 1)" },
            { ratio: 1, color: "rgba(255, 0, 0, 1)" }
         ],
         minPixelIntensity: 1,
         maxPixelIntensity: 100000000,
      },
   });

   // define map and view
   var map = new Map({
      layers: [fireflyLayer, covidLayer, referenceLayer]
   });

   var view = new MapView({
      container: "viewDiv",
      center: [0, 20],
      zoom: 2,
      map: map,
      highlightOptions: {
         fillOpacity: 0,
         color: [50, 50, 50],
      },
   });

   var timeSlider = new TimeSlider({
      container: "timeSliderDiv",
      view: view,
      mode: "time-window",
      fullTimeExtent: {
         start: new Date(2020, 1, 1),
         end: new Date(2020, 11, 1),
      },
      playRate: 4000,
      stops: {
         interval: {
            value: 1,
            unit: "months",
         },
      },
      tickConfigs: [
        {
          mode: "count",
          values:
            new Date(2020, 11, 31) > new Date() ? new Date().getMonth() + 1 : 12,
          labelsVisible: true,
          labelFormatFunction: (value) => {
            const date = new Date(value);
            console.log(date)
            return date.toLocaleString("default", { month: "short" });
          }
        }
      ]
   });
   updateDefintionExpression(timeSlider.timeExtent);

   view.ui.add(timeSlider, "bottom-right");

   timeSlider.watch("timeExtent", function (value) {
      updateDefintionExpression(value);
   });

   function updateDefintionExpression(timeExtent) {
      const start = toDateString(timeExtent.start);
      const end = toDateString(timeExtent.end);
      covidLayer.definitionExpression = `Date >= DATE '${start}' AND Date <= DATE '${end}'`;
   }

   function toDateString(date) {
      const y = `${date.getUTCFullYear()}`;
      const m = `${date.getUTCMonth()}`.padStart(2, "0");
      const d = `${date.getUTCDate()}`.padStart(2, "0");
      const h = `${date.getUTCHours()}`.padStart(2, "0");
      const mm = `${date.getUTCMinutes()}`.padStart(2, "0");
      const s = `${date.getUTCSeconds()}`.padStart(2, "0");
      return `${y}-${m}-${d} ${h}:${mm}:${s}`;
   }
});
