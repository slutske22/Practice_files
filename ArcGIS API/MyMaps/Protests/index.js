import { popupTemplate } from './popupTemplate.js'

require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/FeatureLayer",
   "esri/smartMapping/renderers/location"
], function(Map, MapView, FeatureLayer, locationRendererCreator){

   var renderer = {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
         type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
         color: "rgba(153, 51, 51, 0.5)",
         size: '3px',
         outline: {
            color: "rgb(153, 51, 51)",
            width: 0.5
         }
      },
      visualVariables: [
         {
            type: 'size',
            field: 'Attendees',
            stops: [
               {
                 value: 1, 
                 size: 3 
               },
               {
                 value: 500, 
                 size: 10 
               },
               {
                  value: 100000, 
                  size: 50 
                }
            ]
         }
      ]
   };

   // locationRendererCreator.createRenderer({
   //    layer: protestsLayer,
   //    view: view,
   //    sizeOptimizationEnabled: true
   // }).then(function(rendererResponse){
   //    // the renderer contains a size variable with stops
   //    // mapping icon sizes to scale values
   //    protestsLayer.renderer = rendererResponse.renderer;
   // }).catch(function(error){
   //    console.error(error);
   // });

   var protestsLayer = new FeatureLayer({
      url: 'https://services8.arcgis.com/3Y7J7SmaNLGLT6ec/arcgis/rest/services/2020_Protests_with_Location/FeatureServer',
      outFields: ['*'],
      renderer,
      popupTemplate
   })

   var map = new Map({
      basemap: "dark-gray-vector",
      layers: [protestsLayer]
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-100, 38],
      zoom: 4,
      map: map
   })

})
