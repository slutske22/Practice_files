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
const markersArray = [{
   longlat: [33.270, -116.650],
   removable: true,
   editable: false,
   content: 'Marker A'
  },
  {
    longlat: [33.270, -116],
    removable: false,
    editable: false,
    content: 'Marker B'
  },
  {
    longlat: [33.270, -115.5],
    removable: true,
    editable: false,
    content: 'Marker D'
  },
  {
    longlat: [32.7, -116.650],
    removable: true,
    editable: true,
    content: 'Marker E. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
    },
    {
    longlat: [32.7, -116],
    removable: false,
    editable: true,
    content: 'Marker F.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
    },
    {
    longlat: [32.7, -115.5],
    removable: false,
    editable: false,
    content: 'Marker G'
    },
];

var templateRemoveMe =
   `<div class="popupModWrapper"><a class="popupMod removeOnly" href="#close">Remove this marker</a></div>`;
var templateEditMe =
   `<div class="popupModWrapper"><a class="popupMod edit only" href="#close">Edit</a></div>`;
var templateRemoveAndEditMe =
   `<div class="popupModWrapper"><a class="popupMod remove" href="#close">Remove this marker</a><a class="popupMod edit" href="#close">Edit</a></div>`;
var templateEditInput =
   `<input type="text" class="popupInput">`


markersArray.forEach( function(markerItem){

   markerContent = `<div class="innerContent">${markerItem.content}</div>`

   var marker = L.marker(markerItem.longlat).addTo(leafletMap)

      if (markerItem.removable && !markerItem.editable){
         markerContent = markerContent + templateRemoveMe;
      }

      if (markerItem.editable && !markerItem.removable){
         markerContent = markerContent + templateEditMe;
      }

      if (markerItem.removable && markerItem.editable){
         markerContent = markerContent + templateRemoveAndEditMe;
      }

      marker.bindPopup(markerContent);


      leafletMap.on('popupopen', function(e) {

         var marker = e.popup._source;
         console.log(e)
         $(e.popup._wrapper).find('.remove').on('click', function() {
            // console.log('close', e)
            leafletMap.removeLayer(marker);
         }) // $(e.popup._wrapper).on

         $(e.popup._wrapper).find('.edit').on('click', function() {

            marker.getPopup().setContent(templateEditInput)

         })

      })




})  // For each
//-------------------------------------------------------------------



// // Some bullshit I'm trying
// //-------------------------------------------------------------------
// const markerTypes = {
//    limited: {
//       allowRemove: false,
//       allowEdit: false
//    },
//    removable: {
//       allowRemove: true,
//       allowEdit: false
//    },
//    editable: {
//       allowRemove: false,
//       allowEdit: true
//    },
//    removableAndEditable: {
//       allowRemove: true,
//       allowEdit: true
//    },
// }
//
//
// function CreateMarker(type,location,content){
//    this.markerType = type;
//    this.create = function(){
//
//       let marker = L.marker(location).addTo(leafletMap);
//       marker.bindPopup(content);
//
//       if ( this.markerType === 'limited' ){
//          return
//       } else if ( this.markerType === 'removable' ){
//
//       } else if ( this.markerType === 'editable' ){
//
//       } else if ( this.markerType === 'removableAndEditable' ){
//
//       }
//    }
//
// }
//
// var marker = new CreateMarker('limited', [33.270, -116], 'My content goes here' );
// marker.create();
// //-------------------------------------------------------------------
//





//  Very promising  http://embed.plnkr.co/8qVoW5/



//  Or:  https://codepen.io/timlohnes/pen/dWYPXY


//  Even better:   https://venues.here.com/documentation/sdk/v1/example/custom-popup
