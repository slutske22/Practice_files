/*-----------------------------------------------------------------------
███    ███  █████  ██████
████  ████ ██   ██ ██   ██
██ ████ ██ ███████ ██████
██  ██  ██ ██   ██ ██
██      ██ ██   ██ ██

██ ███    ██ ██ ████████ ██  █████  ██      ██ ███████ ███████
██ ████   ██ ██    ██    ██ ██   ██ ██      ██    ███  ██
██ ██ ██  ██ ██    ██    ██ ███████ ██      ██   ███   █████
██ ██  ██ ██ ██    ██    ██ ██   ██ ██      ██  ███    ██
██ ██   ████ ██    ██    ██ ██   ██ ███████ ██ ███████ ███████
-----------------------------------------------------------------------*/



var mapOptions = {
  center: [33.270, -116.650],
  zoom: 8
}


//Create a map and assign it to the map div
var leafletMap = L.map('leafletMapid', mapOptions);

//add a baseLayer
var baseLayer =  new L.tileLayer('https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
         //accesstoken from mapbox.com account
         //mapbox.com username: slutske22
         //mapbox.com PW: ורדינה1!
      });

baseLayer.addTo(leafletMap)



/*-----------------------------------------------------------------------
██████   ██████  ██████  ██    ██ ██████      ███    ███  ██████  ██████
██   ██ ██    ██ ██   ██ ██    ██ ██   ██     ████  ████ ██    ██ ██   ██
██████  ██    ██ ██████  ██    ██ ██████      ██ ████ ██ ██    ██ ██   ██
██      ██    ██ ██      ██    ██ ██          ██  ██  ██ ██    ██ ██   ██
██       ██████  ██       ██████  ██          ██      ██  ██████  ██████
-----------------------------------------------------------------------*/



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

      //  ----------------    Source code  ---------------------------- //




      //  ---------------    My additions  --------------------------- //

      if (this.options.removable && !this.options.editable){
         var userActionButtons = this._userActionButtons = L.DomUtil.create('div', prefix + '-useraction-buttons', wrapper);
         var removeButton = this._removeButton = L.DomUtil.create('a', prefix + '-remove-button', userActionButtons);
         removeButton.href = '#close';
         removeButton.innerHTML = 'Remove this marker';
         this.options.minWidth = 110;

         L.DomEvent.on(removeButton, 'click', this._onRemoveButtonClick, this);
      }

      if (this.options.editable && !this.options.removable){
         var userActionButtons = this._userActionButtons = L.DomUtil.create('div', prefix + '-useraction-buttons', wrapper);
         var editButton = this._editButton = L.DomUtil.create('a', prefix + '-edit-button', userActionButtons);
         editButton.href = '#edit';
         editButton.innerHTML = 'Edit';

         L.DomEvent.on(editButton, 'click', this._onEditButtonClick, this);
      }

      if (this.options.editable && this.options.removable){
         var userActionButtons = this._userActionButtons = L.DomUtil.create('div', prefix + '-useraction-buttons', wrapper);
         var removeButton = this._removeButton = L.DomUtil.create('a', prefix + '-remove-button', userActionButtons);
         removeButton.href = '#close';
         removeButton.innerHTML = 'Remove this marker';
         var editButton = this._editButton = L.DomUtil.create('a', prefix + '-edit-button', userActionButtons);
         editButton.href = '#edit';
         editButton.innerHTML = 'Edit';
         this.options.minWidth = 160;


         L.DomEvent.on(removeButton, 'click', this._onRemoveButtonClick, this);
         L.DomEvent.on(editButton, 'click', this._onEditButtonClick, this);


      }






   },


   _onRemoveButtonClick: function (e) {
      this._source.remove();
      L.DomEvent.stop(e);
   },

   _onEditButtonClick: function (e) {
      //Needs to be defined first to capture width before changes are applied
      var inputFieldWidth = this._inputFieldWidth = this._container.offsetWidth - 2*19;

      this._contentNode.style.display = "none";
      this._userActionButtons.style.display = "none";

      var wrapper = this._wrapper;
      var editScreen = this._editScreen = L.DomUtil.create('div', 'leaflet-popup-edit-screen', wrapper)
      var inputField = this._inputField = L.DomUtil.create('div', 'leaflet-popup-input', editScreen);
      inputField.setAttribute("contenteditable", "true");
      inputField.innerHTML = this.getContent()


      //  -----------  Making the input field grow till max width ------- //
      inputField.style.width = inputFieldWidth + 'px';
      var inputFieldDiv = L.DomUtil.get(this._inputField);

      // create invisible div to measure the text width in pixels
      var ruler = L.DomUtil.create('div', 'leaflet-popup-input-ruler', editScreen);

      let thisStandIn = this;

      // Padd event listener to the textinput to trigger a check
      this._inputField.addEventListener("keydown", function(){
      // Check to see if the popup is already at its maxWidth
      // and that text doesnt take up whole field
         if (thisStandIn._container.offsetWidth < thisStandIn.options.maxWidth + 38
            && thisStandIn._inputFieldWidth + 5 < inputFieldDiv.clientWidth){
            ruler.innerHTML = inputField.innerHTML;

            // console.clear();
            // console.log(`Text width: ${ruler.offsetWidth}`);
            // console.log(`InputField width: ${inputFieldDiv.clientWidth}`);
            // console.log(`Popup width: ${thisStandIn._container.offsetWidth}`);

            if (ruler.offsetWidth + 20 > inputFieldDiv.clientWidth){
               console.log('expand now');
               inputField.style.width = thisStandIn._inputField.style.width = ruler.offsetWidth + 10 + 'px';
               thisStandIn.update();
            }

         }
      }, false)


      // https://blog.mastykarz.nl/measuring-the-length-of-a-string-in-pixels-using-javascript/
      //  ----------------------------------------------------- ------- //



      var inputActions = this._inputActions = L.DomUtil.create('div', 'leaflet-popup-input-actions', editScreen);
      var cancelButton = this._cancelButton = L.DomUtil.create('a', 'leaflet-popup-input-cancel', inputActions);
      cancelButton.href = '#cancel';
      cancelButton.innerHTML = 'Cancel';
      var saveButton = this._saveButton = L.DomUtil.create('a', 'leaflet-popup-input-save', inputActions);
      saveButton.href = "#save";
      saveButton.innerHTML = 'Save';

      L.DomEvent.on(cancelButton, 'click', this._onCancelButtonClick, this)
      L.DomEvent.on(saveButton, 'click', this._onSaveButtonClick, this)


      this.update();
      L.DomEvent.stop(e);
   },


   _onCancelButtonClick: function (e) {
      L.DomUtil.remove(this._editScreen);
      this._contentNode.style.display = "block";
      this._userActionButtons.style.display = "flex";

      this.update();
      L.DomEvent.stop(e);
   },

   _onSaveButtonClick: function (e) {
      var inputField = this._inputField;
      if (inputField.innerHTML.length > 0){
         this.setContent(inputField.innerHTML)
      } else {
         alert('Enter something');
      };

      L.DomUtil.remove(this._editScreen);
      this._contentNode.style.display = "block";
      this._userActionButtons.style.display = "flex";

      this.update();
      L.DomEvent.stop(e);



   }

})


/*-----------------------------------------------------------------------
███    ███  █████  ██████  ██   ██ ███████ ██████  ███████
████  ████ ██   ██ ██   ██ ██  ██  ██      ██   ██ ██
██ ████ ██ ███████ ██████  █████   █████   ██████  ███████
██  ██  ██ ██   ██ ██   ██ ██  ██  ██      ██   ██      ██
██      ██ ██   ██ ██   ██ ██   ██ ███████ ██   ██ ███████
-----------------------------------------------------------------------*/




var centerMarker =  L.marker( [33.270, -116.650] );
centerMarker
   .addTo(leafletMap)
   .bindPopup( "Center Marker" , {removable: true} )


var anotherMarker =  L.marker( [33.270, -116] );
anotherMarker
   .addTo(leafletMap)
   .bindPopup( "Another Marker" , {editable: true} )


var thirdMarker = L.marker( [33.270, -115.5] )
   .addTo(leafletMap)
   .bindPopup( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' , {editable: true, removable: true} )
   .openPopup()




/*-----------------------------------------------------------------------
███████ ██      ███████ ██    ██  █████  ████████ ██  ██████  ███    ██
██      ██      ██      ██    ██ ██   ██    ██    ██ ██    ██ ████   ██
█████   ██      █████   ██    ██ ███████    ██    ██ ██    ██ ██ ██  ██
██      ██      ██       ██  ██  ██   ██    ██    ██ ██    ██ ██  ██ ██
███████ ███████ ███████   ████   ██   ██    ██    ██  ██████  ██   ████

████████ ███████ ███████ ████████ ███████
   ██    ██      ██         ██    ██
   ██    █████   ███████    ██    ███████
   ██    ██           ██    ██         ██
   ██    ███████ ███████    ██    ███████
------------------------------------------------------------------------*/


///  from https://labs.mapbox.com/bites/00307/?elev=10#8/37.727/-123.975


var elevTiles = new L.Canvas({
    unloadInvisibleTiles:true,
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
});



elevTiles.drawTile = function (canvas, tile, zoom) {
    tileSize = this.options.tileSize;

    var context = canvas.getContext('2d'),
        imageObj = new Image(),
        tileUID = ''+zoom+'/'+tile.x+'/'+tile.y;

    var drawContext = canvas.getContext('2d');

    // To access / delete elevTiles later
    tile.id = tileUID;

    tileContextsElev[tileUID] = drawContext;

    imageObj.onload = function() {
        // Draw Image Tile
        context.drawImage(imageObj, 0, 0);

        // Get Image Data
        var imageData = context.getImageData(0, 0, tileSize, tileSize);

        elevWorker.postMessage({
            data:{
                tileUID:tileUID,
                tileSize:tileSize,
                array:imageData.data,
                drawElev: drawElev
            },
                type:'tiledata'},
            [imageData.data.buffer]);
    };

    // Source of image tile
    imageObj.crossOrigin = 'Anonymous';
    imageObj.src = 'https://a.tiles.mapbox.com/v4/mapbox.terrain-rgb/'+zoom+'/'+tile.x+'/'+tile.y+'.pngraw?access_token=' + L.mapbox.accessToken;

};
