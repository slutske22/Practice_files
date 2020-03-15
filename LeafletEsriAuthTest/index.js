var mapOptions = {
  center:   [
      36.02556114475524,
      -119.78169059753418
    ],
  zoom: 7,
  zoomDelta: 0.5,
  zoomSnap: 0,
  wheelPxPerZoomLevel: 100
}

const map = L.map('mapID', mapOptions)

const myLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
})

myLayer.addTo(map)


// Esri Token Getting function

// function serverAuth (server, username, password, callback) {
//   L.esri.post(server, {
//     username: username,
//     password: password,
//     f: 'json',
//     expiration: 86400,
//     client: 'referer',
//     referer: window.location.origin
//   }, callback);
// }

// const server = 'https://sampleserver6.arcgisonline.com/arcgis/tokens/generateToken'
// const username = 'slutske22'
// const password = 'Vardina1!'
// const LANDFIRE_data = 'https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer/15'


// serverAuth(server, username, password, (err, res) => {
//   if (err) {
//     console.error(err)
//   }
//   console.log(res)
// })

// fetch('https://www.arcgis.com/sharing/rest/oauth2/token?client_id=z5qFAApXsxo674A8&grant_type=authorization_code&client_secret=5c4d804cedb845fda5b3828f92bc8998&redirect_url=urn:ietf:wg:oauth:2.0:oob', {
//   "method": "POST",
//   "body": "client_id=z5qFAApXsxo674A8&client_secret=5c4d804cedb845fda5b3828f92bc8998&grant_type=authorization_code&code=CODE_OBTAINED_IN_THE_PREVIOUS_STEP"
// })
//   .then(res => res.json())
//   .then(data => console.log(data))



// Define an Esri-Leaflet imageLayer
var EsriGroundCoverImageLayer = L.esri.imageMapLayer({
  url: 'https://landscape6.arcgis.com/arcgis/rest/services/World_Land_Cover_30m_BaseVue_2013/ImageServer',
  opacity: 0.75,
  // useCors: false,
  token: 'W-5Wr0NeeT_t_TBx3ZRCpgxbmT_6kTUmAxGDbYIYWQ5POwlsZPIJ90t4wucliz8K_DLuLuNQ5zI-b5-cgvwRRq4Vc4g7Gebjd1z2GsOWAdgdVQZDMMSXvDliJAB1SomlKUopj8Lw1mwqSgCTuy5N8w..'
})

EsriGroundCoverImageLayer.addTo(map)



// LANDFIRE Layers

// From the ArcGIS servers: https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer
// Various layers with gobs of data

var LFGroundCoverLayer = L.esri.featureLayer({
  url: 'https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer/15',
  opacity: 0.75,
  useCors: false,
  token: 'W-5Wr0NeeT_t_TBx3ZRCpgxbmT_6kTUmAxGDbYIYWQ5POwlsZPIJ90t4wucliz8K_DLuLuNQ5zI-b5-cgvwRRq4Vc4g7Gebjd1z2GsOWAdgdVQZDMMSXvDliJAB1SomlKUopj8Lw1mwqSgCTuy5N8w..'
})

LFGroundCoverLayer.addTo(map)




