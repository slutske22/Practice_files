require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/VectorTileLayer",
   "esri/geometry/SpatialReference",
], function(Map, MapView, SpatialReference, VectorTileLayer){



   var baseLayer = new VectorTileLayer({

   })

   var map = new Map({
      // basemap: "gray-vector",
      // layers: [baseLayer],
      // spatialReference: new SpatialReference({
      //    wkid: "8857"
      // })
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-100, 38],
      zoom: 2,
      map: map
   })

   map.add(baseLayer)

})
