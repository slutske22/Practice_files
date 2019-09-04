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





// Creating the nodes to be added
// var removeMeNode = document.createElement("a");
// var removeMeText = document.createTextNode("Remove this marker");
// removeMeNode.appendChild(removeMeText);
// removeMeNode.classList.add("popupMod", "remove");
// removeMeNode.setAttribute("href", "#close");
//
// var editMeNode = document.createElement("a");
// var editMeText = document.createTextNode("Edit");
// editMeNode.appendChild(editMeText);
// editMeNode.classList.add("popupMod", "edit");
// editMeNode.setAttribute("href", "#edit");


var templateRemoveMe =
   `<a class="popupMod remove" href="#close">Remove this marker</a>`



L.Marker.include({

   allowRemoval: function(){


         // myContainer = this.getPopup()._wrapper;
         // let templateRemoveMe = L.DomUtil.create('a', 'popupMod remove', myContainer)
         // templateRemoveMe.innerHTML = "Remove this marker";
         // let removeButton = L.DomUtil.get(templateRemoveMe)
         //
         // let thisStandIn = this;
         //
         // removeButton.addEventListener("click", function(){
         //    thisStandIn.remove(leafletMap)
         // }, false)

         this.on("click", function(e){
            console.log( 'e.target :' );
            console.log( e.target );
         })

         this.options.removable = true;

         this.getPopup()._initLayout = this.initLayoutWithRemove;

         // https://github.com/Leaflet/Leaflet/blob/master/src/layer/Popup.js

   },


   initLayoutWithRemove: function () {
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
   },


})




var centerMarkerPopup = new L.Popup()
   .setLatLng([[33.270, -116.650]])
   .setContent("This is the Center Marker")

var centerMarker =  L.marker( [33.270, -116.650] );
centerMarker
   .addTo(leafletMap)
   .bindPopup(centerMarkerPopup)
   .openPopup()
   .allowRemoval();


var anotherMarkerPopup = new L.Popup()
   .setLatLng([[33.270, -116]])
   .setContent("This is Another Marker")

var anotherMarker =  L.marker( [33.270, -116] );
anotherMarker
   .addTo(leafletMap)
   .bindPopup(anotherMarkerPopup)

var thirdMarker = L.marker( [33.270, -115.5] )
   .addTo(leafletMap)
