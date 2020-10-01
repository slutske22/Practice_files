require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/TileLayer",
   "esri/layers/FeatureLayer",
   "esri/layers/MapImageLayer",
   "esri/geometry/SpatialReference",
], function(Map, MapView, TileLayer, FeatureLayer, MapImageLayer, SpatialReference){


   const arcticReference = new TileLayer({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Polar/Arctic_Ocean_Reference/MapServer'
   })

   const seaIceSummer = new FeatureLayer({
      url: 'https://services5.arcgis.com/0cdFOdQ7VcrIdCxr/arcgis/rest/services/Arctic_Sea_Ice_Combo_1978_2019/FeatureServer/0'
   })

   const seaIceWinter = new FeatureLayer({
      url: 'https://services5.arcgis.com/0cdFOdQ7VcrIdCxr/arcgis/rest/services/Arctic_Sea_Ice_Combo_1978_2019/FeatureServer/1'
   })

   const graticule_ocean_5deg = new FeatureLayer({
      url: 'https://services.arcgis.com/nGt4QxSblgDfeJn9/ArcGIS/rest/services/Graticule/FeatureServer/2'
   })

   const graticule_land_10deg = new FeatureLayer({
      url: 'https://services.arcgis.com/nGt4QxSblgDfeJn9/ArcGIS/rest/services/Graticule/FeatureServer/9'
   })

   const graticule = [graticule_ocean_5deg, graticule_land_10deg]

   var map = new Map({
      spatialReference: new SpatialReference({
         wkid: 3031
      }),
      // nice deep blue arctic imagery layer
      basemap: {
         portalItem: {
           id: "7ec08e5438304dbfa1e26181503e6fa8"
         }
       },
      layers: [arcticReference, seaIceSummer, ...graticule]
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-100, 38],
      zoom: 5,
      map: map
   })

})
