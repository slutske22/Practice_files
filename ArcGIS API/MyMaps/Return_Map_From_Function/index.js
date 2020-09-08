const maprefs = {}

const makeMap = (maprefs, mapname) => {

   require([
      "esri/Map", 
      "esri/views/MapView"
   ], function(Map, MapView){
   
      map = new Map({
         basemap: "gray-vector"
      })
   
      view = new MapView({
         container: "viewDiv",
         center: [-100, 38],
         zoom: 4,
         map: map
      })

      maprefs[mapname] = { map, view }
   
   })

}

makeMap(maprefs, "map1")

window.maprefs = maprefs

// example action:
// maprefs.map1.view.goTo({ center: [-129, 55] })

