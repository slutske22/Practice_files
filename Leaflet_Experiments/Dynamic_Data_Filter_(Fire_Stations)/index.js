var mapOptions = {
  center:   {
    "lat": 32.82158745209222,
    "lng": -116.83418154716493
  },
  zoom: 10,
  wheelPxPerZoomLevel: 100
}

const map = L.map('mapID', mapOptions)
window.map = map

var mapBoxOutdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
   }).addTo(map);

var CAFireStations;
var AllFireStations;
var firestationsLayer;

fetch('./CA.json')
   .then(res => res.json())
   .then(res => {
      CAFireStations = res.data
      window.CAFireStations = CAFireStations
      applyFireStations()
   })
   .catch( error => console.log(error) )


fetch('./FireStations_Global.json')
   .then(res => res.json())
   .then(res => {
      AllFireStations = res.features
      window.AllFireStations = AllFireStations
      applyFireStations()
   })
   .catch( error => console.log(error) )



var fireHouseIcon = L.icon({
   iconUrl: 'fire-station.png',
   shadowUrl: 'fire-station.png',

   iconSize:     [32, 32], // size of the icon
   shadowSize:   [0, 0], // size of the shadow
   iconAnchor:   [16, 16], // point of the icon which will correspond to marker's location
   shadowAnchor: [4, 62],  // the same for the shadow
   popupAnchor:  [-3, -10] // point from which the popup should open relative to the iconAnchor
});


function applyFireStations(){

   if (AllFireStations){

      const stationsInExtent = AllFireStations.filter( station => {
         let stationCoords = {
            lat: station.geometry.coordinates[1],
            lng: station.geometry.coordinates[0]
         }
         if ( map.getBounds().contains(stationCoords) ) {
            return true
         }
      })

      window.stationsInExtent = stationsInExtent

      // console.log(stationsInExtent)
      var stationsOnMap = stationsInExtent.map( (station, index) => {

         let stationCoords = {
            lat: station.geometry.coordinates[1],
            lng: station.geometry.coordinates[0]
         }

         let popupContent = `
               <h3>${station.properties.name}</h3>
               <p>
                  ${station.properties['addr:housenumber'] || ''}
                  ${station.properties['addr:street'] || ''} <br>
                  ${station.properties['addr:city'] || ''}
                  ${station.properties['gnis:county_name'] || ''},
                  ${station.properties['addr:state'] || ''},
                  ${station.properties['addr:postcode'] || ''}
               </p>
            `

         let marker =  map.getZoom() < 13
            ? L.circleMarker(stationCoords, {radius: map.getZoom() < 10 ? 2 : 5, fillColor: 'darkred', color: 'darkred', weight: 1, fillOpacity: 0.5}).bindPopup(popupContent)
            : L.marker(stationCoords, {icon: fireHouseIcon}).bindPopup(popupContent)

         marker.on('click', () => {console.log(index)})

         return marker

      })

      if (firestationsLayer){
         firestationsLayer.remove()
      }

      firestationsLayer = L.layerGroup(stationsOnMap)

      if (map.getZoom() > 5){
         firestationsLayer.addTo(map)
      }

   }

}


applyFireStations()

map.on('load moveend', applyFireStations)
