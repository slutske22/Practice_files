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
//     referer: window.location.origin
//   }, callback);
// }

// const server = 'https://landfire.cr.usgs.gov/arcgis/tokens/'
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













// ----------------------------------------------------------------
//              ESRI TOKEN GETTER -- BEGIN 
// ----------------------------------------------------------------

// Instructions on turning clientid and clientsecret
// https://developers.arcgis.com/labs/rest/get-an-access-token/

function getEsriSecureLayer(layerType, authservice, serviceurl, client_id, client_secret, callback, expiration) {

  const url = `${authservice}?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials&expiration=${expiration}`

  fetch(url, {
    method: 'POST',
  })
    .then(res => {
      console.log(res)
      return res.json()
    })
    .then(res => { 
      console.log(res)
      callback(layerType, res.access_token, serviceurl)
    })
    .catch(err => console.error(err))

}
// ----------------------------------------------------------------
//            END -- ESRI TOKEN GETTER  
// ----------------------------------------------------------------








// ----------------------------------------------------------------
//               DEFINE LAYER -- BEGIN 
// ----------------------------------------------------------------

let EsriGroundCoverImageLayer

function defineEsriLayer (layerType, token, serviceurl) {

  console.log('in here')

  // Define an Esri-Leaflet imageLayer
  EsriGroundCoverImageLayer = L.esri[layerType]({
    url: serviceurl,
    opacity: 0.75,
    // useCors: false,
    token: token
  })

  EsriGroundCoverImageLayer.addTo(map)

}
// ----------------------------------------------------------------
//                END --- DEFINE LAYER 
// ----------------------------------------------------------------




const authservice = 'https://www.arcgis.com/sharing/rest/oauth2/token'
const client_id = 'z5qFAApXsxo674A8'
const client_secret = '5c4d804cedb845fda5b3828f92bc8998'

const World_Land_Cover_Layer_URL = 'https://landscape6.arcgis.com/arcgis/rest/services/World_Land_Cover_30m_BaseVue_2013/ImageServer'
const LANDFIRE_Ground_Cover_URL = 'https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer/15'

getEsriSecureLayer('imageMapLayer', authservice, World_Land_Cover_Layer_URL, client_id, client_secret, defineEsriLayer, 100000 )

// getEsriSecureLayer('tiledMapLayer', 'https://landfire.cr.usgs.gov/arcgis', LANDFIRE_Ground_Cover_URL, client_id, client_secret, defineEsriLayer, 100000 )



// EsriGroundCoverImageLayer.addTo(map)



// LANDFIRE Layers

// From the ArcGIS servers: https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer
// Various layers with gobs of data

// var LFGroundCoverLayer = L.esri.featureLayer({
//   url: 'https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer/15',
//   opacity: 0.75,
//   useCors: false,
//   token: 'jTy03oNz2-dDK0rysd6slz3cYXF5-eO5JSXf1-Qzm01JBQq8q2ezSI2JHIBbDEiS7Yl5iICGOKWgHVb-gxaiiMLx-LFoDThMqu9VyRkzHv4QipgkFNjU4xRSuVR-aydJbDQs--s_3NePSF7WAFQirw..'
// })

// LFGroundCoverLayer.addTo(map)




