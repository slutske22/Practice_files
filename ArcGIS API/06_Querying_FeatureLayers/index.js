require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/FeatureLayer",
   "esri/layers/GraphicsLayer",
   "esri/Graphic"
], function(Map, MapView, FeatureLayer, GraphicsLayer, Graphic){

   var map = new Map({
      basemap: "topo-vector"
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-118.71511,34.09042],
      zoom: 11,
      map: map
   })

   const featureLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0"
   })
   
   const graphicsLayer = new GraphicsLayer()

   map.add(graphicsLayer)

   // function to add graphics based on result
   const addGraphics = result => {

      graphicsLayer.removeAll()

      result.features.forEach( feature => {
         const g = new Graphic({
            geometry: feature.geometry,
            attributes: feature.attributes,
            symbol: {
               type: "simple-marker",
               color: [0, 0, 0],
               outline: {
                  width: 2,
                  color: [0, 255, 255]
               },
               size: "20px"
            },
            popupTemplate: {
               title: "{TRL_NAME}",
               content: "This a {PARK_NAME} trail located in {CITY_JUR}."
            }
         })

         graphicsLayer.add(g)

      })

   }


   // function to query the feature layer
   // server-side - feature layer is not even added to map at this point
   const queryFeatureLayer = (point, distance, spatialRelationship, sqlExpression) => {

      const query = {
         geometry: point,
         distance,
         spatialRelationship,
         outFields: ["*"],
         returnGeometry: true,
         where: sqlExpression
      }

      featureLayer.queryFeatures(query)
         .then( result => {
            addGraphics(result, true)
         })

   }




   // call feature query when map is loaded, at center, or when map is clicked, at click point

   var sql = "TRL_NAME like '%Canyon%'";


   view.when( () => {
      // queryFeatureLayer(view.center, 1500, "intersects")
      queryFeatureLayerView(view.center, 1500, "intersects")
   })

   view.on('click', e => {
      // queryFeatureLayer(e.mapPoint, 1500, "intersects")
      queryFeatureLayerView(e.mapPoint, 1500, "intersects")
   })





   // function to query layer
   // client side
   const queryFeatureLayerView = (point, distance, spatialRelationship, sqlExpression) => {

      // add layer if its not there
      if (!map.findLayerById(featureLayer.id)){
         featureLayer.outFields = ["*"]
         map.add(featureLayer, 0)
      }

      const query = {
         geometry: point,
         distance,
         spatialRelationship,
         outFields: ["*"],
         returnGeometry: true,
         where: sqlExpression
      }

      // wait for feature layer to be ready and then query:
      view.whenLayerView(featureLayer)
         .then( featureLayerView => {

            if (featureLayerView.updating){
               var handle = featureLayerView.watch("updating", isUpdating => {
                  if (!isUpdating) {
                     featureLayerView.queryFeatures(query)
                        .then( results => addGraphics(results) )
                  }
               })
               handle.remove()
            } else {
               featureLayerView.queryFeatures(query)
                  .then( results => addGraphics(results) )
            }

         })

   }




   view.when( () => {
      view.whenLayerView(featureLayer)
         .then( featureLayerView => {
            view.on('pointer-move', e => {
               view.hitTest(e)
                  .then( response => {
                     console.log(response.results)
                     // var feature = response.results.filter( result => result.graphic.layer === featureLayer)[0].graphic

                     var feature = response.results.filter(function (result) {
                        return result.graphic.layer === featureLayer;
                     })[0].graphic;

                     if (feature) {
                        if (
                           !view.popup.features.length || 
                           (view.popup.features.length && 
                              view.popup.features[0].attributes.FID !== feature.attributes.FID)
                        ) {
                           view.popup.open({
                              title: feature.attributes.TRL_NAME,
                              content: `This is a ${feature.attributes.PARK_NAME} trail located in ${feature.attributes.CITY_JUR}.`,
                              location: feature.geometry
                           })
                        }
                     }
                  })
            })
         })
   })

   // view.when(function () {
   //    view.whenLayerView(featureLayer).then(function (featureLayerView) {
   //      view.on("pointer-move", function (event) {
   //        view.hitTest(event).then(function (response) {
   //          // Only return features for the feature layer
   //          var feature = response.results.filter(function (result) {
   //            return result.graphic.layer === featureLayer;
   //          })[0].graphic;
   //          if (feature) {
   //            // Show popup for new features only
   //            if (
   //              !view.popup.features.length ||
   //              (view.popup.features.length &&
   //                view.popup.features[0].attributes.FID !== feature.attributes.FID)
   //            ) {
   //              view.popup.open({
   //                title: feature.attributes.TRL_NAME,
   //                content:
   //                  "This a " +
   //                  feature.attributes.PARK_NAME +
   //                  " trail located in " +
   //                  feature.attributes.CITY_JUR +
   //                  ".",
   //                location: feature.geometry
   //              });
   //            }
   //          }
   //        });
   //      });
   //    });
   //  });















})
