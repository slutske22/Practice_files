require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/FeatureLayer"
], function(Map, MapView, FeatureLayer){

   // create map
   var map = new Map({
      basemap: "topo-vector"
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-118.71511,34.09042],
      zoom: 11,
      map: map
   })

   // create trails feature layer
   var trailsLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
      outFields: ["*"],
      popupTemplate: {
         title: "{TRL_NAME}",
         content: "The trail elevation gain is {ELEV_GAIN} ft."
      }
   })

   map.add(trailsLayer)

   // create sql expressions
   const sqlExpressions = [
      "TRL_ID = 0",
      "TRL_ID > 0",
      "USE_BIKE = 'Yes'",
      "USE_BIKE = 'No'",
      "ELEV_GAIN < 1000",
      "ELEV_GAIN > 1000",
      "TRL_NAME = 'California Coastal Trail'"
   ]

   // create select element using sql expressions
   var selectFilter = document.createElement('select')
   selectFilter.setAttribute('class', 'esri-widget esri-select')
   selectFilter.setAttribute('style', "width: 275px; font-family: Avenir Next W00; font-size: 1em;")

   sqlExpressions.forEach( expression => {
      const option = document.createElement('option')
      option.value = expression
      option.innerHTML = expression
      selectFilter.appendChild(option)
   })

   view.ui.add(selectFilter, 'top-right')

   // server side filtering
   function setFeatureLayerFilter(expression){
      trailsLayer.definitionExpression = expression
   }

   // client side filtering on layer load
   function setFeatureLayerViewFilter(expression){
      view.whenLayerView(trailsLayer)
         .then(featureLayerView => {
            featureLayerView.effect = {
               filter: {
                  where: expression
               },
               excludedEffect: "opacity(25%)"
            }
         })
   }

   // apply filtering function on select onchange
   selectFilter.addEventListener('change', e => {
      // setFeatureLayerFilter(e.target.value)
      setFeatureLayerViewFilter(e.target.value)
   })


   // highlight a feature as you mouse by
   var highlight;

   view.whenLayerView(trailsLayer).then(function (featureLayerView) {
      view.on("pointer-move", function (event) {
         view.hitTest(event).then(function (response) {
            // Only return features for the feature layer
            var feature = response.results.filter(function (result) {
            return result.graphic.layer === trailsLayer;
            })[0].graphic;
            if (highlight) {
            highlight.remove();
            }
            // Highlight feature
            highlight = featureLayerView.highlight(feature);
         });
      });
   });

})
