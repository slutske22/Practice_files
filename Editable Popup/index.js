// Useful round number function
function roundNumber(number, tensplace = 10){
   return Math.round( number * tensplace) / tensplace;
 }
 
 // Define some maps options
 var mapOptions = {
  center: [33.270, -116.650],
  zoom: 8
 }
 
 //Create a map and assign it to the map div
 var leafletMap = L.map('leafletMapid', mapOptions);
 
 //  Add a baselayer 
 var mapBoxOutdoors = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
      maxZoom: 18,
      }).addTo(leafletMap);
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 const sampleMarkerText = {
 // Note how popup content can be written as an HTML string, or as JSX within a single node:
 
   removableAndEditable: `<h3>This marker is removable and its popup is editable.</h3>
     <p>Leaflet-Popup-Modifier can make a popup editable, removable, both, or neither.  You can add <code>edtiable</code> or <code>removable</code> to its options to decide what type of popup you want.<br>
     <br>
     Go to the <a href="https://github.com/slutske22/leaflet-popup-modifier" target="_blank">GitHub page</a> for this plugin to read more about it.</p>`,
 
   removable: `<h3>This Jormungandr is removable.</h3>
     <p>The Leaflet-Popup-Modifier plugin will automatically name each leaflet map element to properly render the "Remove this {thing}" link.  If you want to customize the name, you can add the <code>nametag: <i>'yourNametag'</i></code> option to a removable popup.</p>`,
     
 };
 
 
 
 
 //------------------------------------------------------------------------//
 //                DROP A MARKER IN CENTER
 //------------------------------------------------------------------------//
 
 // Define buttons
 var makeMarker = document.querySelector('#makeMarker');
 
 makeMarker.addEventListener('click', function(){
 
   let markerPosition = leafletMap.getCenter();
 
   let marker = L.marker( markerPosition )
      .addTo(leafletMap)
      .bindPopup(`
      Latitude: ${markerPosition.lat}<br>
      Longitude: ${markerPosition.lng}` , {removable: true, editable: true, maxWidth: 600, autoPan: false})
      .openPopup();
 
 })




//------------------------------------------------------------------------//
//                 LONE POPUPs
//------------------------------------------------------------------------//


let popup = L.popup({editable: true, removable: true})
  .setLatLng({lat: leafletMap.getCenter().lat - 1, lng: leafletMap.getCenter().lng + 1})
  .setContent('<p>A popup with no source</p>')
  .addTo(leafletMap)

let popup2 = L.popup({editable: true, removable: true, nametag: "lone popup"})
  .setLatLng({lat: leafletMap.getCenter().lat - 1.3, lng: leafletMap.getCenter().lng - 0.3})
  .setContent('<p>A lone popup, all by itself down here</p>')
  .addTo(leafletMap)

 
 
 
//------------------------------------------------------------------------//
//                HARDCODED MARKERS
//------------------------------------------------------------------------//
 
 
 let marker1 = L.marker( [33.270, -116.650] );
 
 marker1.addTo(leafletMap)
   .bindPopup(sampleMarkerText.removableAndEditable , {removable: true, editable: true, maxWidth: 450, autoPan: false})
   .openPopup()
 
 
 
 
 const oilrigIcon = new L.Icon({
   iconUrl: './src/loch-ness-monster.png',
   iconSize: [68, 68],
   iconAnchor: [34, 34],
   popupAnchor: [1, -10],
 });
 
 let marker2 = L.marker( [32.570, -117.950], {icon: oilrigIcon} ).addTo(leafletMap)
   .bindPopup(sampleMarkerText.removable , {removable: true, editable: true, nametag: 'Bringer of Ragnarok', maxWidth: 400, autoPan: false})
 
 