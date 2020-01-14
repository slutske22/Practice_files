
var mapOptions = {
  center: [33.270, -116.650],
  zoom: 8
}


//Create a map and assign it to the map div
var map = L.map('leafletMapid', mapOptions);

//add a baseLayer
var baseLayer =  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
         //accesstoken from mapbox.com account
         //mapbox.com username: slutske22
         //mapbox.com PW: ורדינה1!
      });

baseLayer.addTo(map)



var searchOptions = {
  position: 'topright',
  expanded: true,
  collapseAfterResult: false,
  providers: [L.esri.Geocoding.arcgisOnlineProvider()]
}

const geoCoder = L.esri.Geocoding.geosearch(searchOptions)
geoCoder.addTo(map)

geoCoder.addEventListener('results', function(e){
   console.log(e)
})
