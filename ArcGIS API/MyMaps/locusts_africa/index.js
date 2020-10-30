require([
   "esri/Map", 
   "esri/views/MapView",
   'esri/layers/FeatureLayer'
], function(Map, MapView, FeatureLayer){

   function toDateString(date) {
      const y = `${date.getUTCFullYear()}`;
      const m = `${date.getUTCMonth()}`.padStart(2, '0');
      const d = `${date.getUTCDate()}`.padStart(2, '0');
      const h = `${date.getUTCHours()}`.padStart(2, '0');
      const mm = `${date.getUTCMinutes()}`.padStart(2, '0');
      const s = `${date.getUTCSeconds()}`.padStart(2, '0');
      return `${y}-${m}-${d} ${h}:${mm}:${s}`;
   }

   const start = (new Date('01-01-2020')).getTime() / 1000
   const end = (new Date('12-31-2020')).getTime() / 1000

   console.log(start, end)

   const locustsSwarms = new FeatureLayer({
      url:
         'https://services5.arcgis.com/sjP4Ugu5s0dZWLjd/arcgis/rest/services/Swarms_Public/FeatureServer',
      outFields: ['*'],
      definitionExpression: `STARTDATE >= date'1-1-2020' AND FINISHDATE <= date'12-1-2020'`,
   });
   
   const locustBands = new FeatureLayer({
      url:
         'https://services5.arcgis.com/sjP4Ugu5s0dZWLjd/arcgis/rest/services/Bands_Public/FeatureServer',
      outFields: ['*'],
      definitionExpression: `STARTDATE >= date'1-1-2020' AND FINISHDATE <= date'12-1-2020'`,
   });

   const locustAdults = new FeatureLayer({
      url: 'https://services5.arcgis.com/sjP4Ugu5s0dZWLjd/arcgis/rest/services/Adults_Public/FeatureServer',
      outFields: ['*'],
      definitionExpression: `STARTDATE >= date'1-1-2020' AND FINISHDATE <= date'12-1-2020'`,
   })

   const locustHoppers = new FeatureLayer({
      url: 'https://services5.arcgis.com/sjP4Ugu5s0dZWLjd/arcgis/rest/services/Hoppers_Public/FeatureServer',
      outFields: ['*'],
      definitionExpression: `STARTDATE >= date'1-1-2020' AND FINISHDATE <= date'12-1-2020'`,
   })

   const locustControlOps = new FeatureLayer({
      url: 'https://services5.arcgis.com/sjP4Ugu5s0dZWLjd/arcgis/rest/services/Locust_Control_Operations_Public/FeatureServer'
   })

   var map = new Map({
      basemap: "gray-vector",
      layers: [locustsSwarms, locustBands, locustAdults, locustHoppers]
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
