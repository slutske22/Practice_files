var mapOptions = {
  center: [33.270, -116.650],
  zoom: 8
}


//Create a map and assign it to the map div
var leafletMap = L.map('leafletMapid', mapOptions);

//add a baseLayer
var baseLayer =  new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
         //accesstoken from mapbox.com account
         //mapbox.com username: slutske22
         //mapbox.com PW: ורדינה1!
      });

baseLayer.addTo(leafletMap)

var mapOptions = {
  center: [33.270, -116.650],
  zoom: 8
}


//  Yona's method

//-------------------------------------------------------------------
const markers = [{
    longlat: [33.270, -116.650],
    popupContent: false,
    markerRef: ''
  },
  {
    longlat: [33.270, -116],
    editContent: '',
    popupContent: '',
  },
  {
    longlat: [33, -116],
    popupContent: ''
  },
];


markers.forEach( function(markerItem){

  var marker = L.marker(markerItem.longlat).addTo(leafletMap)
    .bindPopup('<strong>Science Hall</strong><br>Where the <button>GISC</button> was born.')
    .openPopup();

  leafletMap.on('popupopen', function(e) {
    var marker = e.popup._source;
    // console.log('e', e, $(e.popup._wrapper))
    $(e.popup._wrapper).find('button').on('click', function() {
      // console.log('close', e)
      leafletMap.removeLayer(marker);
   }) // $(e.popup._wrapper).on
}); // leafletMap.on
})  // For each
//-------------------------------------------------------------------



// Some bullshit I'm trying
//-------------------------------------------------------------------
const markerTypes = {
   limited: {
      allowRemove: false,
      allowEdit: false
   },
   removable: {
      allowRemove: true,
      allowEdit: false
   },
   editable: {
      allowRemove: false,
      allowEdit: true
   },
   removableAndEditable: {
      allowRemove: true,
      allowEdit: true
   },
}


function CreateMarker(type,location,content){
   this.markerType = type;
   this.create = function(){

      let marker = L.marker(location).addTo(leafletMap);
      marker.bindPopup(content);

      if ( this.markerType === 'limited' ){
         return
      } else if ( this.markerType === 'removable' ){

      } else if ( this.markerType === 'editable' ){

      } else if ( this.markerType === 'removableAndEditable' ){

      }
   }

}

var marker = new CreateMarker('limited', [33.270, -116], 'My content goes here' );
marker.create();
//-------------------------------------------------------------------



//  Very promising  http://embed.plnkr.co/8qVoW5/


// var template = '<form id="popup-form">\
//   <label for="input-speed">New speed:</label>\
//   <input id="input-speed" class="popup-input" type="number" />\
//   <table class="popup-table">\
//     <tr class="popup-table-row">\
//       <th class="popup-table-header">Arc numer:</th>\
//       <td id="value-arc" class="popup-table-data"></td>\
//     </tr>\
//     <tr class="popup-table-row">\
//       <th class="popup-table-header">Current speed:</th>\
//       <td id="value-speed" class="popup-table-data"></td>\
//     </tr>\
//   </table>\
//   <button id="button-submit" type="button">Save Changes</button>\
// </form>';
//
// function layerClickHandler (e) {
//
//   var marker = e.target,
//       properties = e.target.feature.properties;
//
//   if (marker.hasOwnProperty('_popup')) {
//     marker.unbindPopup();
//   }
//
//   marker.bindPopup(template);
//   marker.openPopup();
//
//   L.DomUtil.get('value-arc').textContent = properties.arc;
//   L.DomUtil.get('value-speed').textContent = properties.speed;
//
//   var inputSpeed = L.DomUtil.get('input-speed');
//   inputSpeed.value = properties.speed;
//   L.DomEvent.addListener(inputSpeed, 'change', function (e) {
//     properties.speed = e.target.value;
//   });
//
//   var buttonSubmit = L.DomUtil.get('button-submit');
//   L.DomEvent.addListener(buttonSubmit, 'click', function (e) {
//     marker.closePopup();
//   });
//
// }
//
// var map = L.map('leaflet', {
//   'center': [0, 0],
//   'zoom': 0,
//   'layers': [
//     L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
//     }),
//     L.geoJson({
//       "type": "FeatureCollection",
//       "features": [{
//         "type": "Feature",
//         "geometry": {
//           "type": "Point",
//           "coordinates": [0,0]
//         },
//         "properties": {
//           "arc": 321,
//           "speed": 123
//         }
//       }]
//     }, {
//       onEachFeature: function (feature, layer) {
//         layer.on('click', layerClickHandler);
//       }
//     })
//   ]
// });



//  Or:  https://codepen.io/timlohnes/pen/dWYPXY


//  Even better:   https://venues.here.com/documentation/sdk/v1/example/custom-popup
