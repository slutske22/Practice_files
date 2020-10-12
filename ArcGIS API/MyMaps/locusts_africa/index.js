require([
   "esri/Map", 
   "esri/views/MapView",
   'esri/layers/FeatureLayer'
], function(Map, MapView, FeatureLayer){

   const locustsSwarms = new FeatureLayer({
      url: 'https://services5.arcgis.com/sjP4Ugu5s0dZWLjd/arcgis/rest/services/Swarms_Public/FeatureServer'
   })

   const locustBands = new FeatureLayer({
      url: 'https://services5.arcgis.com/sjP4Ugu5s0dZWLjd/arcgis/rest/services/Bands_Public/FeatureServer'
   })

   const locustAdults = new FeatureLayer({
      url: 'https://services5.arcgis.com/sjP4Ugu5s0dZWLjd/arcgis/rest/services/Adults_Public/FeatureServer'
   })

   const locustHoppers = new FeatureLayer({
      url: 'https://services5.arcgis.com/sjP4Ugu5s0dZWLjd/arcgis/rest/services/Hoppers_Public/FeatureServer'
   })

   const locustControlOps = new FeatureLayer({
      url: 'https://services5.arcgis.com/sjP4Ugu5s0dZWLjd/arcgis/rest/services/Locust_Control_Operations_Public/FeatureServer'
   })

   var map = new Map({
      basemap: "gray-vector",
      layers: [locustsSwarms, locustBands]
   })

   var view = new MapView({
      container: "viewDiv",
      center: [38, 18],
      zoom: 3,
      map: map
   })

   view.on('click', e => {
      console.log('extent', view.extent)
      console.log('mapPoint', e.mapPoint)
   })

})
