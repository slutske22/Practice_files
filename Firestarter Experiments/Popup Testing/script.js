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





//  Adding new options to the default options of a popup
L.Popup.mergeOptions({
   removable: false,
   editable: false
})

// Modifying the popup mechanics
L.Popup.include({


   // modifying the _initLayout method to include edit and remove buttons, if those options are enabled

   //  ----------------    Source code  ---------------------------- //
   // original from https://github.com/Leaflet/Leaflet/blob/master/src/layer/Popup.js
   _initLayout: function () {
      var prefix = 'leaflet-popup',
          container = this._container = L.DomUtil.create('div',
         prefix + ' ' + (this.options.className || '') +
         ' leaflet-zoom-animated');

      var wrapper = this._wrapper = L.DomUtil.create('div', prefix + '-content-wrapper', container);
      this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

      L.DomEvent.disableClickPropagation(wrapper);
      L.DomEvent.disableScrollPropagation(this._contentNode);
      L.DomEvent.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);

      this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
      this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);

      if (this.options.closeButton) {
         var closeButton = this._closeButton = L.DomUtil.create('a', prefix + '-close-button', container);
         closeButton.href = '#close';
         closeButton.innerHTML = '&#215;';

         L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
      }

      //  ------------    My additions  --------------------- //

      if (this.options.removable){
         console.log(this.getContent() + ' is removable');
         var removeButton = this._removeButton = L.DomUtil.create('a', prefix + '-remove-button', wrapper);
         removeButton.href = '#close';
         removeButton.innerHTML = 'Remove this marker';

         L.DomEvent.on(removeButton, 'click', this._onRemoveButtonClick, this);
      }

      if (this.options.editable){
         var editButton = this._editButton = L.DomUtil.create('a', prefix + '-edit-button', wrapper);
         editButton.href = '#edit';
         editButton.innerHTML = 'Edit';

         L.DomEvent.on(editButton, 'click', this._onEditButtonClick, this);
      }



   },
   //  ----------------    Source code  ---------------------------- //


   _onRemoveButtonClick: function (e) {
      this._source.remove(leafletMap);  //  this could be written better
      L.DomEvent.stop(e);
   },

   _onEditButtonClick: function (e) {
      console.log(this.getContent() + ' is editable');
      L.DomEvent.stop(e);
   },


})




var centerMarkerPopup = new L.Popup( {removable: true, editable: true} )
   .setLatLng([[33.270, -116.650]])
   .setContent("This is the Center Marker")

var centerMarker =  L.marker( [33.270, -116.650] );
centerMarker
   .addTo(leafletMap)
   .bindPopup(centerMarkerPopup)
   .openPopup()


var anotherMarkerPopup = new L.Popup( {removable: true} )
   .setLatLng([[33.270, -116]])
   .setContent("This is Another Marker")

var anotherMarker =  L.marker( [33.270, -116] );
anotherMarker
   .addTo(leafletMap)
   .bindPopup(anotherMarkerPopup)

var thirdMarker = L.marker( [33.270, -115.5] )
   .addTo(leafletMap)
