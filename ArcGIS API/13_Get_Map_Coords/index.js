require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/widgets/CoordinateConversion"
], function(Map, MapView, CoordinateConversion){


   // Set up map

   var map = new Map({
      basemap: "topo-vector"
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-118.71511,34.09042],
      zoom: 11,
      map: map
   })


   // Custom made coordinate viewer

   var coordsWidget = document.createElement('div')
   coordsWidget.id = 'coordsWidget'
   coordsWidget.className = 'esri-widget esri-component'
   coordsWidget.style.padding = "7px 15px 5px";

   view.ui.add(coordsWidget, 'bottom-right')


   function showCoords(point){
      const coords = `Lat/Lng: ${point.latitude.toFixed(3)}, ${point.longitude.toFixed(3)} | Scale 1:${Math.round(view.scale)} | Zoom: ${view.zoom}`
      coordsWidget.innerHTML = coords
   }

   view.watch('stationary', e => {
      showCoords(view.center)
   })

   view.on('pointer-move', e => {
      showCoords(view.toMap({ x: e.x, y: e.y }))
   })

   view.on('click', e => {
      console.log(view.toMap({ x: e.x, y: e.y }))
   })





   // Premade coordinate converter

   const coordConverter = new CoordinateConversion({
      view
   })

   view.ui.add(coordConverter, 'top-right')



   // Reset button

   var resetButton = document.createElement('button')
   resetButton.innerHTML = "Reset View"
   resetButton.id = 'resetButton'
   resetButton.className = 'esri-widget esri-component'
   resetButton.style.padding = "7px 15px 5px";
   resetButton.style.cursor = 'pointer'

   view.ui.add(resetButton, 'bottom-left')

   resetButton.addEventListener('click', () => {
      view.goTo({
         center: [-118.71511,34.09042],
         zoom: 11,
      }, {
         duration: 1000
      })
   })




})
