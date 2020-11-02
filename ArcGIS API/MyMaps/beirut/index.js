require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/TileLayer",
   "esri/widgets/Swipe"
], function(Map, MapView, TileLayer, Swipe){

   const blastImagery = new TileLayer({
      url: 'https://tiles.arcgis.com/tiles/WOCTeelWa8YfhXRF/arcgis/rest/services/Beirut_Port_05082020/MapServer'
   })


   var map = new Map({
      basemap: "ffff",
      layers: [blastImagery]
   })

   var view = new MapView({
      container: "viewDiv",
      center: [35.51797651297456, 33.90197505204445],
      zoom: 16,
      map: map,
   })

   view.on('click', e => console.log(e.mapPoint))

   // const swipe = new Swipe({
   //    leadingLayers: [],
   //    trailingLayers: [blastImagery],
   //    view,
   //    position: 50,
   // });

   // view.ui.add(swipe);

})
