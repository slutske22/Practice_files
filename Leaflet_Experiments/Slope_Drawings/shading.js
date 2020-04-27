importScripts('rainbowvis.js')

function raster2dem(data){

   // console.log('raster2dem data', data)

   const dem = new Uint16Array(256 * 256)

   var x, y, dx, dy, i, j

   // from https://docs.mapbox.com/help/troubleshooting/access-elevation-data/#decode-data
   function height (R, G, B) {
      return -10000 + ((R * 256 * 256 + G * 256 + B) * 0.1)
   }

   for (x = 0; x < 256; x++) {
      for (y = 0; y < 256; y++){
         i = x + y * 256
         j = i * 4
         dem[i] = height( data[j], data[j + 1], data[j + 2] )
      }
   }

   return dem

}

function shading(dem){

   const colors = new Array(256 * 256)
   const px = new Uint8ClampedArray( 256 * 256 * 4 )

   var maxElev = 8850
   var minElev = -750

   var gradient = new Rainbow()
   gradient.setNumberRange(minElev, maxElev)
   gradient.setSpectrum('darkblue', 'yellow', 'green', 'white')

   for (let i = 0; i < colors.length; i++) {

      var hex = `#${gradient.colorAt(dem[i])}`
      var rgb = hexToRgb(hex)
      colors[i] = rgb
      
   }


   for (let i = 0; i < dem.length; i++){

      px[4*i + 0] = colors[i].r
      px[4*i + 1] = colors[i].g
      px[4*i + 2] = colors[i].b
      px[4*i + 3] = 255

   }

   return px

}



// from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
   // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
   var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
   hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
   });
 
   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
     r: parseInt(result[1], 16),
     g: parseInt(result[2], 16),
     b: parseInt(result[3], 16)
   } : null;
}

function hypsotint(elevation){

   var min = -1000
   var breakpoint1 = 0
   var breakpoint2 = 1200
   var breakpoint3 = 4500
   var max = 9000

   var color0 = 'darkblue'
   var color1 = 'lightblue'
   var color2 = 'beige'
   var color3 = 'lightgreen'
   var color4 = 'darkgreen'
   var color5 = 'white'

   var brackets = [
      {
         breakpoints: [min, breakpoint1],
         colors: [color0, color1]
      },
      {
         breakpoints: [breakpoint1, breakpoint2],
         colors: [color2, color3]
      },
      {
         breakpoints: [breakpoint2, breakpoint3],
         colors: [color3, color4]
      },
      {
         breakpoints: [breakpoint3, max],
         colors: [color4, color5]
      }
   ]



   var chosenBracket = brackets.filter( bracket => {
      if ( elevation >= bracket.breakpoints[0] && elevation < bracket.breakpoints[1] ){
         return true
      }
   })

   // console.log(elevation, chosenBracket)

   

   if (chosenBracket.length === 1){
      var gradient = new Rainbow()
      gradient.setNumberRange(chosenBracket[0].breakpoints[0], chosenBracket[0].breakpoints[1])
      gradient.setSpectrum(chosenBracket[0].colors[0], chosenBracket[0].colors[1])
   
      return gradient.colorAt(elevation)
   }


   return {r: 255, g: 255, b: 255}


}

// hypsotint(200)