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

// Instructions on turning clientid and clientsecret
// https://developers.arcgis.com/labs/rest/get-an-access-token/

function getEsriSecureLayer(layerType, getTokenUrl, layerUrl, client_id, client_secret, callback, expiration = 7200) {

  const url = `${getTokenUrl}?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials&expiration=${expiration}`

  fetch(url, {
    method: 'POST',
  })
    .then(res => {
      console.log(res)
      return res.json()
    })
    .then(res => { 
      console.log(res)
      callback(layerType, res.access_token, layerUrl)
    })
    .catch(err => console.error(err))

}


var esriToken

function getEsriToken(getTokenUrl, client_id, client_secret, expiration){

  const url = `${getTokenUrl}?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials&expiration=${expiration}`

  fetch(url, {
    method: 'POST',
  })
    .then(res => {
      console.log(res)
      return res.json()
    })
    .then(res => { 
      console.log(res)
      esriToken =  res.access_token
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
  var EsriGroundCoverImageLayer = L.esri[layerType]({
    url: layerUrl,
    opacity: 0.75,
    // useCors: false,
    token: token
  })

  EsriGroundCoverImageLayer.addTo(map)

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
        console.log(identifyImageResponse);

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

}

// ----------------------------------------------------------------
//                END --- DEFINE LAYER 
// ----------------------------------------------------------------




const authservice = 'https://www.arcgis.com/sharing/rest/oauth2/token'
const client_id = 'z5qFAApXsxo674A8'
const client_secret = '5c4d804cedb845fda5b3828f92bc8998'

const World_Land_Cover_Layer_URL = 'https://landscape6.arcgis.com/arcgis/rest/services/World_Land_Cover_30m_BaseVue_2013/ImageServer'
const UWB_Esri_URL = 'https://services1.arcgis.com/pf6KDbd8NVL1IUHa/arcgis/rest/services/Wildland_Urban_Interface_vector/FeatureServer/1'
const Terrain_URL = 'https://elevation.arcgis.com/arcgis/rest/services/WorldElevation/Terrain/ImageServer'
const Ground_Surface_Elevation_30M_URL = 'https://elevation.arcgis.com/arcgis/rest/services/NED30m/ImageServer'



// getEsriSecureLayer('imageMapLayer', authservice, World_Land_Cover_Layer_URL, client_id, client_secret, defineEsriLayer, 100000 )
getEsriSecureLayer('imageMapLayer', authservice, Terrain_URL, client_id, client_secret, defineEsriLayer, 100000 )

// getEsriSecureLayer('featureLayer', authservice, UWB_Esri_URL, client_id, client_secret, defineEsriLayer, 100000 )

// URBAN WILDLAND BOUNDARY FEATURELAYER
// L.esri.featureLayer({url: UWB_Esri_URL}).addTo(map)





// LANDFIRE Layers

// From the ArcGIS servers: https://landfire.cr.usgs.gov/arcgis/rest/services/Landfire/US_200/MapServer
// Various layers with gobs of data









// Plugin for grabbing the legend data for an esri mapservice
// https://github.com/w8r/esri-leaflet-legend

var groundCoverTypes = [
  {
    "name": "Deciduous Forest",
    "description": "  Trees > 3 meters in height, canopy closure >35% (<25% inter-mixture with evergreen species) that seasonally lose their leaves, except Larch."
  },
  {
    "name": "Evergreen Forest",
    "description": "  Trees >3 meters in height, canopy closure >35% (<25% inter-mixture with deciduous species), of species that do not lose leaves. (will include coniferous Larch regardless of deciduous nature)."
  },
  {
    "name": "Shrub/Scrub",
    "description": "  Woody vegetation <3 meters in height, > 10% ground cover. Only collect >30% ground cover."
  },
  {
    "name": "Grassland",
    "description": "  Herbaceous grasses, > 10% cover, including pasture lands. Only collect >30% cover."
  },
  {
    "name": "Barren or Minimal Vegetation",
    "description": "  Land with minimal vegetation (<10%) including rock, sand, clay, beaches, quarries, strip mines, and gravel pits. Salt flats, playas, and non-tidal mud flats are also included when not inundated with water."
  },
  {
    "name": "Not Used (in other MDA products 6 represents urban areas or built up areas, which have been split here in into values 20 and 21)."
  },
  {
    "name": "Agriculture, General",
    "description": "  Cultivated crop lands"
  },
  {
    "name": "Agriculture, Paddy",
    "description": "  Crop lands characterized by inundation for a substantial portion of the growing season"
  },
  {
    "name": "Wetland",
    "description": "  Areas where the water table is at or near the surface for a substantial portion of the growing season, including herbaceous and woody species (except mangrove species)"
  },
  {
    "name": "Mangrove",
    "description": "  Coastal (tropical wetlands) dominated by Mangrove species"
  },
  {
    "name": "Water",
    "description": "  All water bodies greater than 0.08 hectares (1 LS pixel) including oceans, lakes, ponds, rivers, and streams"
  },
  {
    "name": "Ice / Snow",
    "description": "  Land areas covered permanently or nearly permanent with ice or snow"
  },
  {
    "name": "Clouds",
    "description": "  Areas where no land cover interpretation is possible due to obstruction from clouds, cloud shadows, smoke, haze, or satellite malfunction"
  },
  {
    "name": "Woody Wetlands",
    "description": "  Areas where forest or shrubland vegetation accounts for greater than 20% of vegetative cover and the soil or substrate periodically is saturated with, or covered by water. Only used within the continental U.S."
  },
  {
    "name": "Mixed Forest",
    "description": "  Areas dominated by trees generally greater than 5 meters tall, and greater than 20% of total vegetation cover. Neither deciduous nor evergreen species are greater than 75% of total tree cover. Only used within the continental U.S."
  },
  {
    "name": "Not Used"
  },
  {
    "name": "Not Used"
  },
  {
    "name": "Not Used"
  },
  {
    "name": "Not Used"
  },
  {
    "name": "High Density Urban",
    "description": "  Areas with over 70% of constructed materials that are a minimum of 60 meters wide (asphalt, concrete, buildings, etc.). Includes residential areas with a mixture of constructed materials and vegetation where constructed materials account for >60%. Commercial, industrial, and transportation i.e., Train stations, airports, etc."
  },
  {
    "name": "Medium-Low Density Urban",
    "description": "  Areas with 30%-70% of constructed materials that are a minimum of 60 meters wide (asphalt, concrete, buildings, etc.). Includes residential areas with a mixture of constructed materials and vegetation, where constructed materials account for greater than 40%. Commercial, industrial, and transportation i.e., Train stations, airports, etc."
  }
]


var groundCoverSourceText = [
  "Deciduous Forest:  Trees > 3 meters in height, canopy closure >35% (<25% inter-mixture with evergreen species) that seasonally lose their leaves, except Larch.",
  "Evergreen Forest:  Trees >3 meters in height, canopy closure >35% (<25% inter-mixture with deciduous species), of species that do not lose leaves. (will include coniferous Larch regardless of deciduous nature).",
  "Shrub/Scrub:  Woody vegetation <3 meters in height, > 10% ground cover. Only collect >30% ground cover.",
  "Grassland:  Herbaceous grasses, > 10% cover, including pasture lands. Only collect >30% cover.",
  "Barren or Minimal Vegetation:  Land with minimal vegetation (<10%) including rock, sand, clay, beaches, quarries, strip mines, and gravel pits. Salt flats, playas, and non-tidal mud flats are also included when not inundated with water.", 
  "Not Used (in other MDA products 6 represents urban areas or built up areas, which have been split here in into values 20 and 21).",
  "Agriculture, General:  Cultivated crop lands",
  "Agriculture, Paddy:  Crop lands characterized by inundation for a substantial portion of the growing season",
  "Wetland:  Areas where the water table is at or near the surface for a substantial portion of the growing season, including herbaceous and woody species (except mangrove species)",
  "Mangrove:  Coastal (tropical wetlands) dominated by Mangrove species",
  "Water:  All water bodies greater than 0.08 hectares (1 LS pixel) including oceans, lakes, ponds, rivers, and streams",
  "Ice / Snow:  Land areas covered permanently or nearly permanent with ice or snow",
  "Clouds:  Areas where no land cover interpretation is possible due to obstruction from clouds, cloud shadows, smoke, haze, or satellite malfunction",
  "Woody Wetlands:  Areas where forest or shrubland vegetation accounts for greater than 20% of vegetative cover and the soil or substrate periodically is saturated with, or covered by water. Only used within the continental U.S.",
  "Mixed Forest:  Areas dominated by trees generally greater than 5 meters tall, and greater than 20% of total vegetation cover. Neither deciduous nor evergreen species are greater than 75% of total tree cover. Only used within the continental U.S.",
  "Not Used",
  "Not Used",
  "Not Used",
  "Not Used",
  "High Density Urban:  Areas with over 70% of constructed materials that are a minimum of 60 meters wide (asphalt, concrete, buildings, etc.). Includes residential areas with a mixture of constructed materials and vegetation where constructed materials account for >60%. Commercial, industrial, and transportation i.e., Train stations, airports, etc.",
  "Medium-Low Density Urban:  Areas with 30%-70% of constructed materials that are a minimum of 60 meters wide (asphalt, concrete, buildings, etc.). Includes residential areas with a mixture of constructed materials and vegetation, where constructed materials account for greater than 40%. Commercial, industrial, and transportation i.e., Train stations, airports, etc."
]

