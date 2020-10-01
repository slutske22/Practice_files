import * as renderers from './renderers.js'

require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/TileLayer",
   "esri/layers/FeatureLayer",
   "esri/geometry/SpatialReference",
   "esri/widgets/LayerList",
   "esri/widgets/TimeSlider",
], function(Map, MapView, TileLayer, FeatureLayer, SpatialReference, LayerList, TimeSlider){


   const arcticReference = new TileLayer({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Polar/Arctic_Ocean_Reference/MapServer',
      listMode: 'hide'
   })

   const seaIceSummer = new FeatureLayer({
      id: 'seaIceSummer',
      url: 'https://services5.arcgis.com/0cdFOdQ7VcrIdCxr/arcgis/rest/services/Arctic_Sea_Ice_Combo_1978_2019/FeatureServer/0',
      maxScale: 0, // no max,
      outFields: ["*"],
      definitionExpression: "Rec_Month = 8", // get only August (other option is 9 for September)
      renderer: renderers.summerIce
   })

   const seaIceWinter = new FeatureLayer({
      id: 'seaIceWinter',
      url: 'https://services5.arcgis.com/0cdFOdQ7VcrIdCxr/arcgis/rest/services/Arctic_Sea_Ice_Combo_1978_2019/FeatureServer/1',
      maxScale: 0, // no max
      outFields: ["*"],
      definitionExpression: "Rec_Month = 2", // get only February (other option is 3 for March)
      renderer: renderers.winterIce
   })

   const graticule_ocean_5deg = new FeatureLayer({
      url: 'https://services.arcgis.com/nGt4QxSblgDfeJn9/ArcGIS/rest/services/Graticule/FeatureServer/2',
      listMode: 'hide'
   })

   const graticule_land_10deg = new FeatureLayer({
      url: 'https://services.arcgis.com/nGt4QxSblgDfeJn9/ArcGIS/rest/services/Graticule/FeatureServer/9',
      listMode: 'hide'
   })

   const graticule = [graticule_ocean_5deg, graticule_land_10deg]
   const iceLayers = [seaIceWinter, seaIceSummer]

   const map = new Map({
      spatialReference: new SpatialReference({
         wkid: 3031
      }),
      // nice deep blue arctic imagery layer
      basemap: {
         portalItem: {
           id: "7ec08e5438304dbfa1e26181503e6fa8"
         }
       },
      layers: [arcticReference, ...graticule, ...iceLayers]
   })

   const view = new MapView({
      container: "viewDiv",
      center: [-100, 38],
      zoom: 5,
      map: map
   })

   const layerViews = []
   iceLayers.forEach(layerView => {
      view.whenLayerView(layerView)
      .then( layerView => {
         layerViews.push(layerView)
         layerView.filter = {
            where: "Rec_Year = 1979"
         }
      })
   })

   // Layer List
   const layerList = new LayerList({
      view,
      statusIndicatorsVisible: false,
      listItemCreatedFunction: function (e) {
         switch(e.item.layer.id){
            case 'seaIceSummer':
               e.item.title = 'Ice in Summer'
               break
            case 'seaIceWinter':
               e.item.title = 'Ice in Winter'
               break

         }
      }
   })

   view.ui.add(layerList, 'top-right')

   // timeslider
   var timeSlider = new TimeSlider({
      container: "timeSlider",
      playRate: 250,
      mode: "instant",
      loop: false,
      fullTimeExtent: {
         start: new Date(1979, 0, 1),
         end: new Date(2019, 0, 1)
      },
      stops: {
         interval: {
           value: 1,
           unit: "years"
         }
      }
   })

   view.ui.add(timeSlider, "bottom-right");

   // update layer view filter to reflect current timeExtent, use sea ice polygon from timeExtent's current year
   timeSlider.watch("timeExtent", function(value){

      const year = value.end.getFullYear()

      layerViews.forEach( layerView => {
         layerView.filter = {
            where: `Rec_Year = ${year}`
         }
      })

   });


})
