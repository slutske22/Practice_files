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

const markers = [{
    longlat: [33.270, -116.650],
    popupContent: false,
    markerRef: ''
  },
  // {
  //   longlat: [33.270, -116],
  //   editContent: '',
  //   popupContent: '',
  // },
  // {
  //   longlat: [33, -116],
  //   popupContent: ''
  // },
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

let marker;

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
