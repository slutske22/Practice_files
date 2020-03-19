import * as EL from 'esri-leaflet'
import 'leaflet-active-area'
import './esri.leaflet.activearea.patch.js'


var mapOptions = {
   center: [33.270, -116.650],
   zoom: 8
 };
 
 
 //Create a map and assign it to the map div
 var map = L.map('mapid', mapOptions);
 
 // use only active activearea
 map.setActiveArea('activearea');
 
 //add a baseLayer
 var mapBoxOutdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
       maxZoom: 18,
       id: 'mapbox.outdoors',
       accessToken: 'pk.eyJ1Ijoic2x1dHNrZTIyIiwiYSI6ImNqeGw1Y3BibDAybG4zeHFyaXl3OXVwZXUifQ.fZ_5Raq5z-DUpo2AK-bQHA'
    }).addTo(map);
 
 
   //  L.control.mousePosition().addTo(map);
 
 
 
 //------------------------------------------------------------------------//
 //                RANDOM MARKER
 //------------------------------------------------------------------------//
 
 // Make empty array to recieve randomly generated markers
 var randomMarkerArray = [];
 
 // Useful random number function
 function randomNumber(min, max){
    return ( Math.random() * (max - min) ) + min
 };
 
 // Define buttons
 var randomMarkerButton = document.querySelector('#randomMarker');
 var clearMarkersButton = document.querySelector('#clearRandomMarkers');
 
 // Empty variable to recieve the layergroup which is created when a thebutton is pressed
 var randomMarkerGroup;
 
 // When the button is pressed:
 randomMarkerButton.addEventListener("click", function(){
    // Get map bounds:
    let mapBoundLeft = map.getBounds()._southWest.lng;
    let mapBoundRight = map.getBounds()._northEast.lng;
    let mapBoundTop = map.getBounds()._northEast.lat;
    let mapBoundBottom = map.getBounds()._southWest.lat;
 
    // Make random number within bounds
    let randomLng = randomNumber(mapBoundLeft, mapBoundRight);
    let randomLat = randomNumber(mapBoundTop, mapBoundBottom);
 
    let position = [randomLat, randomLng];
 
    // Create a random marker
    let randomMarker = L.marker( position )
       .bindPopup(`This is a randomly placed marker<br>
          <br>
          Latitude: ${randomLat.toFixed(2)}<br>
          Longitude: ${randomLng.toFixed(2)}` , {autoPan: false, removable: true, editable: true});
 
    // map.panTo(position)
 
    // Give each random marker its own name with its index for easy reference
    randomMarker._name = `Random Marker ${randomMarkerArray.length + 1}`;
    // Push it into the array
    randomMarkerArray.push(randomMarker);
 
    // Create layerGroup using the array
    randomMarkerGroup = L.layerGroup( randomMarkerArray )
       .addTo(map);
    // Open popup on most recently added marker
    randomMarkerArray[randomMarkerArray.length - 1].openPopup();
 
 })
 
 
 clearMarkersButton.addEventListener("click", function(){
    // Remove the layergroup of random markers
    randomMarkerGroup.remove();
    // Empty the array to truly refresh the random marker layer
    randomMarkerArray = [];
 }, false);
 
 
 // ----------------------------------------------------------------
//              ESRI TOKEN GETTER -- BEGIN 
//              Please don't steal my keys
// ----------------------------------------------------------------

// Instructions on turning clientid and clientsecret
// https://developers.arcgis.com/labs/rest/get-an-access-token/

function getEsriSecureLayer(layerType, getTokenUrl, layerUrl, client_id, client_secret, callback, expiration = 7200) {

   const url = `${getTokenUrl}?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials&expiration=${expiration}`
 
   fetch(url, {
     method: 'POST',
   })
     .then(res => {
       return res.json()
     })
     .then(res => { 
       callback(layerType, res.access_token, layerUrl)
     })
     .catch(err => console.error(err))
 
 }
 // ----------------------------------------------------------------
 //            END -- ESRI TOKEN GETTER  
 // ----------------------------------------------------------------
 
 
 
 
 
 
 
 
 
 // ----------------------------------------------------------------
 //               DEFINE LAYER -- BEGIN 
 // ----------------------------------------------------------------
 
 function defineEsriLayer (layerType, token, layerUrl) {
 
   // Define an Esri-Leaflet imageLayer
   let EsriGroundCoverImageLayer = EL[layerType]({
     url: layerUrl,
     opacity: 0.75,
     token: token
   })
 
   EsriGroundCoverImageLayer.addTo(map)
 
 
 }
 
 // ----------------------------------------------------------------
 //                END --- DEFINE LAYER 
 // ----------------------------------------------------------------
 
 
 
 // ---------- Add the layer: ---------------------------------------
 
 // Auth constants
 const authservice = 'https://www.arcgis.com/sharing/rest/oauth2/token'
 const client_id = 'z5qFAApXsxo674A8'
 const client_secret = '5c4d804cedb845fda5b3828f92bc8998'
 
 // Layer URLs
 const World_Land_Cover_Layer_URL = 'https://landscape6.arcgis.com/arcgis/rest/services/World_Land_Cover_30m_BaseVue_2013/ImageServer'
 
 // Run the add layer function
 getEsriSecureLayer('imageMapLayer', authservice, World_Land_Cover_Layer_URL, client_id, client_secret, defineEsriLayer, 100000 )
 
 
 