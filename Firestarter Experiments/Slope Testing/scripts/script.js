// USeful round number function
function roundNumber(number, tensplace = 10){
   return Math.round( number * tensplace) / tensplace;
}

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
  zoom: 10
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


//--------------  USING color picker -----------------------------------//

// First load colorPicker layer using the mapbox topo RGB tileset
var colorPicker = L.tileLayer.colorPicker('https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
      }).addTo(leafletMap)
      .setOpacity(0);


// Write a function which utilizes the getColor function, pulling data from the colorPicker layer
function getElevation(location){
   var color = colorPicker.getColor(location)
   let R = color[0];
   let G = color[1];
   let B = color[2];

   let height = -10000 + ((R * 256 * 256 + G * 256 + B) * 0.1)
   return height;
}

// Then add the outdoors layer to be the one to be seen by the viewer
// Not ideal as it loads both baselayers.  visual performance issues
// Need to figure out how to get data from the RGB layer without showing it
// This will be the case for all data layers
var mapBoxOutdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
      }).addTo(leafletMap);



/*////////////////////////////////////////////////////////////////////////////

███████ ██       ██████  ██████  ███████
██      ██      ██    ██ ██   ██ ██
███████ ██      ██    ██ ██████  █████
     ██ ██      ██    ██ ██      ██
███████ ███████  ██████  ██      ███████

/*////////////////////////////////////////////////////////////////////////////


// From https://observablehq.com/@sahilchinoy/hillshader

function getSlope(point){
   // get the xy position of the point within its DOM container:
   let xy = leafletMap.latLngToContainerPoint(point);
   // get the 4 pixels around it in xy coordinates:
   let rightxy = { x: xy.x + 1,  y: xy.y },
      leftxy = { x: xy.x - 1, y: xy.y },
      topxy = { x: xy.x, y: xy.y - 1 },
      bottomxy = { x: xy.x, y: xy.y + 1 };

   // Translate those 4 points back to lat lngs
   let right = leafletMap.containerPointToLatLng(rightxy),
      left = leafletMap.containerPointToLatLng(leftxy),
      top = leafletMap.containerPointToLatLng(topxy),
      bottom = leafletMap.containerPointToLatLng(bottomxy);

   // get the elevation of those points and get the difference
   let dzdx = getElevation(right) - getElevation(left);
   let dzdy = getElevation(top) - getElevation(bottom);

   // Get the angle of slope based on those differences
   let slopeAngle = Math.atan( Math.sqrt(dzdx ** 2 + dzdy ** 2)) * (180 / Math.PI);

   return slopeAngle;

}


function getSlopeTest(point){

   let slopeTest = {};
   // get the xy position of the point within its DOM container:
   slopeTest.xy = leafletMap.latLngToLayerPoint(point);
   // get the 4 pixels around it in xy coordinates:
   slopeTest.rightxy = { x: slopeTest.xy.x + 1,  y: slopeTest.xy.y };
   slopeTest.leftxy = { x: slopeTest.xy.x - 1, y: slopeTest.xy.y };
   slopeTest.topxy = { x: slopeTest.xy.x, y: slopeTest.xy.y - 1 };
   slopeTest.bottomxy = { x: slopeTest.xy.x, y: slopeTest.xy.y + 1 };

   // Translate those 4 points back to lat lngs
   slopeTest.right = leafletMap.layerPointToLatLng(slopeTest.rightxy);
   slopeTest.left = leafletMap.layerPointToLatLng(slopeTest.leftxy);
   slopeTest.top = leafletMap.layerPointToLatLng(slopeTest.topxy);
   slopeTest.bottom = leafletMap.layerPointToLatLng(slopeTest.bottomxy);

   // Get 4 points by destination function rathan than mapping to and from xy
   // slopeTest.right = L.GeometryUtil.destination(point, -90, 1);
   // slopeTest.left = L.GeometryUtil.destination(point, 90, 1);
   // slopeTest.top = L.GeometryUtil.destination(point, 0, 1);
   // slopeTest.bottom = L.GeometryUtil.destination(point, 180, 1);

   // Get the elevations of those 4 points
   slopeTest.rightElevation = getElevation( slopeTest.right );
   slopeTest.leftElevation = getElevation( slopeTest.left );
   slopeTest.topElevation = getElevation( slopeTest.top );
   slopeTest.bottomElevation = getElevation( slopeTest.bottom );

   // Get the distance between the points
   slopeTest.dx = L.GeometryUtil.distance(leafletMap, slopeTest.right, slopeTest.left)
   slopeTest.dy = L.GeometryUtil.distance(leafletMap, slopeTest.top, slopeTest.bottom)

   // get the elevation of those points and get the difference
   slopeTest.dzdx = ( slopeTest.rightElevation - slopeTest.leftElevation) / slopeTest.dx;
   slopeTest.dzdy = ( slopeTest.topElevation - slopeTest.bottomElevation ) / slopeTest.dy;

   // Get the angle of slope based on those differences
   slopeTest.slopeAngle = Math.atan( Math.sqrt(slopeTest.dzdx ** 2 + slopeTest.dzdy ** 2)) * (180 / Math.PI);
   slopeTest.slopeAspect = Math.atan2( slopeTest.dzdy, slopeTest.dzdx ) * (180 / Math.PI);


   return slopeTest;

}






/*-----------------------------------------------------------------------
███    ███  █████  ██████  ██   ██ ███████ ██████  ███████
████  ████ ██   ██ ██   ██ ██  ██  ██      ██   ██ ██
██ ████ ██ ███████ ██████  █████   █████   ██████  ███████
██  ██  ██ ██   ██ ██   ██ ██  ██  ██      ██   ██      ██
██      ██ ██   ██ ██   ██ ██   ██ ███████ ██   ██ ███████
-----------------------------------------------------------------------*/



// Define buttons
var makeMarker = document.querySelector('#makeMarker');
var makeInfoMarker = document.querySelector('#makeInfoMarker');


//------------------------------------------------------------------------//
//                DROP A MARKER IN CENTER WITH SLOPE GRID
//------------------------------------------------------------------------//

makeInfoMarker.addEventListener('click', function(){

   let markerPosition = leafletMap.getCenter();
   let slopeObject = getSlopeTest(markerPosition);

   let marker = L.marker( markerPosition )
      .addTo(leafletMap)
      .bindPopup(`
      Latitude: ${markerPosition.lat}<br>
      Longitude: ${markerPosition.lng}<br>
      Elevation: ${roundNumber( getElevation(markerPosition), 10)} m<br>
      Slope: ${slopeObject.slopeAngle}<br>
      <br>
      <div class="slopeGrid">
         <div class="slopeGridCell">
            Cell 1
         </div>
         <div class="slopeGridCell">
            Cell 2<br>
            x: ${slopeObject.topxy.x}, y: ${slopeObject.topxy.y}<br>
            ${slopeObject.top}<br>
            elev: ${roundNumber(slopeObject.topElevation)} m
         </div>
         <div class="slopeGridCell">
            Cell 3
         </div>
         <div class="slopeGridCell">
            Cell 4<br>
            x: ${slopeObject.leftxy.x}, y: ${slopeObject.leftxy.y}<br>
            ${slopeObject.left}<br>
            elev: ${roundNumber(slopeObject.leftElevation)} m
         </div>
         <div class="slopeGridCell">
            Cell 5<br>
            x: ${slopeObject.xy.x}, y: ${slopeObject.xy.y}<br>
            elev: ${roundNumber( getElevation(markerPosition), 10)} m
         </div>
         <div class="slopeGridCell">
            Cell 6<br>
            x: ${slopeObject.rightxy.x}, y: ${slopeObject.rightxy.y}<br>
            ${slopeObject.right}<br>
            elev: ${roundNumber(slopeObject.rightElevation)} m

         </div>
         <div class="slopeGridCell">
            Cell 7
         </div>
         <div class="slopeGridCell">
            Cell 8<br>
            x: ${slopeObject.bottomxy.x}, y: ${slopeObject.bottomxy.y}<br>
            ${slopeObject.bottom}<br>
            elev: ${roundNumber(slopeObject.bottomElevation)} m
         </div>
         <div class="slopeGridCell">
            Cell 9<br>
            <br>
            dzdx: ${roundNumber(slopeObject.dzdx, 100)}<br>
            dzdy: ${roundNumber(slopeObject.dzdy, 100)}<br>
            Slope of Point: ${roundNumber(slopeObject.slopeAngle)}<br>
            Aspect of Point: ${roundNumber(slopeObject.slopeAspect)}
         </div>
      </div>` , {removable: true, editable: true, maxWidth: 600, autoPan: false})
      .openPopup();

})



makeMarker.addEventListener('click', function(){

   let markerPosition = leafletMap.getCenter();
   let slopeObject = getSlopeTest(markerPosition);

   let marker = L.marker( markerPosition )
      .addTo(leafletMap)
      .bindPopup(`
      Latitude: ${markerPosition.lat}<br>
      Longitude: ${markerPosition.lng}<br>
      Elevation: ${roundNumber( getElevation(markerPosition), 10)} m<br>
      <br>
      Slope at Point: ${roundNumber(slopeObject.slopeAngle)}<br>
      Aspect at Point: ${roundNumber(slopeObject.slopeAspect)}` , {removable: true, editable: true, maxWidth: 600, autoPan: false})
      .openPopup();

})
