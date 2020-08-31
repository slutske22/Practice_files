require([
   "esri/Map", 
   "esri/views/MapView",
   "esri/layers/Layer",
   "esri/views/2d/layers/BaseLayerView2D",
   "esri/layers/support/TileInfo"
], function(Map, MapView, Layer, BaseLayerView2D, TileInfo){


   var TileCoordsLayer = BaseLayerView2D.createSubclass({

      render(params) {

         var tileSize = this.layer.tileInfo.size[0]
         var state = params.state
         var pixelRatio = state.pixelRatio
         var width = state.size[0]
         var height = state.size[1]
         var context = params.context
         var coords = [0, 0]

         context.fillStyle = "rgba(0,0,0,0.25)"
         context.fillRect(0, 0, width * pixelRatio, height * pixelRatio);

         // apply rotation if needed
         if (state.rotation !== 0) {
            context.translate(width * pixelRatio * 0.5, height * pixelRatio * 0.5);
            context.rotate((state.rotation * Math.PI) / 180);
            context.translate(- width * pixelRatio * 0.5, -height * pixelRatio * 0.5);
         }

         // text styles:
         context.font = "24px monospace";
         context.fillStyle = "black";
         context.shadowBlur = 1;
         
         for (const tile of this.tiles) {

            var screenScale = tile.resolution / state.resolution * pixelRatio

            state.toScreenNoRotation(coords, tile.coords)

            // draw tile borders
            context.strokeRect(coords[0], coords[1], tileSize * screenScale, tileSize * screenScale)

            // draw coords text
            context.shadowColor = 'white'
            context.fillText(`Z: ${tile.level}, X: ${tile.row}, Y: ${tile.col}`, coords[0] + 12, coords[1] + 24)
            context.shadowColor = 'transparent'

         }

      } // render

   }) // TileCoordsLayer = BaseLayerView2D.createSubclass


   var CoordsLayer = Layer.createSubclass({

      tileInfo: TileInfo.create({
         spatialReference: {
            wkid: 3857
         }
      }),

      createLayerView(view) {
         if (view.type === "2d") {
            return new TileCoordsLayer({
               view: view,
               layer: this
            })
         }
      }
   })


   var coordsLayer = new CoordsLayer()




   var map = new Map({
      basemap: "topo-vector",
      layers: [coordsLayer]
   })

   var view = new MapView({
      container: "viewDiv",
      center: [-118.71511,34.09042],
      zoom: 11,
      map: map
   })

})
