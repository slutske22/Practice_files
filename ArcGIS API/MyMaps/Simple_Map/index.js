import popupTemplate from './popupTemplate.js'
import * as renderers from './renderers.js'

// Color Ramps:
// https://developers.arcgis.com/javascript/latest/guide/esri-color-ramps/index.html

require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/FeatureLayer",
   "esri/widgets/Legend",
   "esri/smartMapping/statistics/classBreaks"
], function(Map, MapView, FeatureLayer, Legend, classBreaks){




   var COVIDLayer = new FeatureLayer({
      url: "https://services1.arcgis.com/4yjifSiIG17X0gW4/arcgis/rest/services/US_County_COVID19_Trends/FeatureServer",
      outFields: ["*"],
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


   classBreaks({
      layer: COVIDLayer,
      field: "totCases",
      classificationMethod: "quantile",
      numClasses: 5
   })
   .then(function(response){
      const { maxValue } = response;
      COVIDLayer.renderer = renderers.totalCases(0, maxValue)
   })

})


