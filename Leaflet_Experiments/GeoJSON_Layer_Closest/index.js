var mapOptions = {
  center:   {
    "lat": 32.82158745209222,
    "lng": -116.83418154716493
  },
  zoom: 10,
  wheelPxPerZoomLevel: 100
}

const map = L.map('mapID', mapOptions)

const myLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  'attribution': 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
})

myLayer.addTo(map)




const UWB_Esri_URL = 'https://services1.arcgis.com/pf6KDbd8NVL1IUHa/arcgis/rest/services/Wildland_Urban_Interface_vector/FeatureServer/1'

const UWBLayer = L.esri.featureLayer({url: UWB_Esri_URL})

UWBLayer.addTo(map)



// Some code to add a popup to each section that displays some info about that section
// Also add a recangle to show the bounding box of each section

UWBLayer.on('load', () =>{

  const layerNames = Object.keys(UWBLayer._layers)

  layerNames.forEach( layerName =>{
  
    const layer = UWBLayer._layers[layerName]
    layer.bindPopup(`
      <h3>Segment # ${layerName}</h3>
      <h4>Bounds:</h4>
      <pre>SW: ${layer.getBounds()._southWest}</pre>
      <pre>NE: ${layer.getBounds()._northEast}</pre>
    `)

    layer.on('click', () => {

      if(!map.getBounds().contains(layer.getBounds())){
        map.fitBounds( layer.getBounds() )
      }

      if (!layer._boundingRect){
        layer._boundingRect = L.rectangle(layer.getBounds(), {color: "#ff7800", weight: 1, interactive: false})
        layer._boundingRect.addTo(map)
      }

    })
  
  })

})



