var mapOptions = {
  center:   {
    "lat": 32.82158745209222,
    "lng": -116.83418154716493
  },
  zoom: 8,
  zoomDelta: 0.5,
  zoomSnap: 0,
  wheelPxPerZoomLevel: 100
}

const map = L.map('mapID', mapOptions)

const myLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
})

myLayer.addTo(map)



// ----------------------------------------------------------------
//              ESRI REVERSE GEOCODER -- BEGIN 
// ----------------------------------------------------------------

function reverseGeocode(coords) {

  return new Promise( (resolve, reject) => {

    L.esri.Geocoding.reverseGeocode()
      .latlng(coords)
      .run(function (error, result, response) {
        
        if (error) {
          console.log('geocoder error', error)
          reject(error)
        }
  
        if (result) {
          // console.log('geocoder result', result)
          resolve(result)
        }
    
      });

  } )

}

// ----------------------------------------------------------------
//              ESRI REVERSE GEOCODER -- END 
// ----------------------------------------------------------------




// ----------------------------------------------------------------
//              ESRI TOKEN GETTER -- BEGIN 
// ----------------------------------------------------------------

async function getEsriToken(){

  let token

  const url = `https://www.arcgis.com/sharing/rest/oauth2/token?client_id=z5qFAApXsxo674A8&client_secret=5c4d804cedb845fda5b3828f92bc8998&grant_type=client_credentials&expiration=7200`

  await fetch(url, {
    method: 'POST',
  })
    .then(res => {
      return res.json()
    })
    .then(res => { 
      token =  res.access_token
    })
    .catch(err => console.error(err))

    return token

}

// ----------------------------------------------------------------
//            END -- ESRI TOKEN GETTER  
// ----------------------------------------------------------------

// ----------------------------------------------------------------
//            ESRI - DEFINE LAYER BEGIN  
// ----------------------------------------------------------------

async function createEsriLayer(layerType, options){

  let token = await getEsriToken()

  var esriLayer = L.esri[layerType]({
    ...options,
    token
  })

  esriLayer.addTo(map)

  return esriLayer

}



// var EsriSlopeDegreesMapLayer
// (async () => {
//   EsriSlopeDegreesMapLayer = await createEsriLayer('imageMapLayer', {
//     url: 'https://elevation.arcgis.com/arcgis/rest/services/WorldElevation/Terrain/ImageServer',
//     opacity: 1,
//     renderingRule: {rasterFunction: "Slope_Degrees_Map"}
//   })
// })()



var EsriSlopeDegreesLayer
(async () => {
  EsriSlopeDegreesMapLayer = await createEsriLayer('imageMapLayer', {
    url: 'https://elevation.arcgis.com/arcgis/rest/services/WorldElevation/Terrain/ImageServer',
    opacity: 1,
    renderingRule: {rasterFunction: "Slope_Degrees"}
  })
})()

// ----------------------------------------------------------------
//            END -- ESRI DEFINE LAYER  
// ----------------------------------------------------------------


// ----------------------------------------------------------------
//            Get Value on Click  
// ----------------------------------------------------------------

map.on('click', e => {

  EsriSlopeDegreesMapLayer.identify().at(e.latlng).run(function (error, results) {

    if (error) {
      return;
    }

    let identifiedPixel = results.pixel;
    console.log(identifiedPixel)

  });
  
})






























// OLD WAY:


// ----------------------------------------------------------------
//              ESRI COMPLETE ADD -- BEGIN 
// ----------------------------------------------------------------

// Instructions on turning clientid and clientsecret
// https://developers.arcgis.com/labs/rest/get-an-access-token/

function getEsriSecureLayer(layerType, getTokenUrl, layerUrl, client_id, client_secret, callback, expiration = 7200) {

  const url = `${getTokenUrl}?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials&expiration=${expiration}`

  fetch(url, {
    method: 'POST',
  })
    .then(res => {
      // console.log(res)
      return res.json()
    })
    .then(res => { 
      // console.log(res)
      callback(layerType, res.access_token, layerUrl)
    })
    .catch(err => console.error(err))

}


// ----------------------------------------------------------------
//              ESRI COMPLETE ADD -- END 
// ----------------------------------------------------------------


// ----------------------------------------------------------------
//               DEFINE LAYER -- BEGIN 
// ----------------------------------------------------------------

const renderingRule = {
  rasterFunction: "Slope_Degrees"
}

function defineEsriLayer (layerType, token, layerUrl) {

  // Define an Esri-Leaflet imageLayer
  var esriLayer = L.esri[layerType]({
    url: layerUrl,
    // opacity: 0.75,
    token,
    renderingRule
  })

  esriLayer.addTo(map)

  map.on('click', e => {

    L.esri.identifyImage({
      url: layerUrl
    })
      .token(token)
      .at(e.latlng)
      .run(async function (error, identifyImageResponse, rawResponse) {

        let placename = await reverseGeocode(e.latlng)
        let { address } = placename
        console.log(address.Subregion)

        if (error) {
          console.log(error);
          return;
        }
        const typeIndex = identifyImageResponse.pixel.properties.value - 1
        console.log(rawResponse);

        // L.marker(e.latlng).addTo(map)
        //   .bindPopup(`
        //     ${address ? `<h3>${address.Subregion}, ${address.Region}, ${address.Postal}</h3>` : null}
        //     <div>${e.latlng.lat.toFixed(2)}° Latitude, ${e.latlng.lng.toFixed(2)}° Longitude</div>
        //     <h3>${groundCoverTypes[typeIndex].name}</h3>
        //     <p>${groundCoverTypes[typeIndex].description}</p>
        //     <p class="subscript">Data from <a href="https://www.arcgis.com/home/item.html?id=1770449f11df418db482a14df4ac26eb" target="_blank">Esri World Land Cover 30m BaseVue 2013</a></p>
        //   `)
        //   .openPopup()

      });

  })

  return esriLayer

}

// ----------------------------------------------------------------
//                END --- DEFINE LAYER 
// ----------------------------------------------------------------




var authservice = 'https://www.arcgis.com/sharing/rest/oauth2/token'
var client_id = 'z5qFAApXsxo674A8'
var client_secret = '5c4d804cedb845fda5b3828f92bc8998'

var Terrain_URL = 'https://elevation.arcgis.com/arcgis/rest/services/WorldElevation/Terrain/ImageServer'
var Ground_Surface_Elevation_30M_URL = 'https://elevation.arcgis.com/arcgis/rest/services/NED30m/ImageServer'




// getEsriSecureLayer('imageMapLayer', authservice, Terrain_URL, client_id, client_secret, defineEsriLayer, 100000 )







// LANDFIRE Layers

// From the ArcGIS servers: https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer
// Various layers with gobs of data







