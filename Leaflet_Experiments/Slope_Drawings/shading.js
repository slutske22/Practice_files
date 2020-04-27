importScripts('rainbowvis.js')

function raster2dem(data){

   const dem = new Int16Array(256 * 256)

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




var color0 = '#164A5B',
   color1 = '#75CFEC',
   color2 = 'beige',
   color3 = 'gold',
   color4 = 'lightgreen',
   color5 = 'darkgreen',
   color6 = 'white'





function shading(dem){

   var px = new Uint8ClampedArray( 256 * 256 * 4 )

   var maxElev = 8850
   var minElev = -750

   var gradient = new Rainbow()
   gradient.setNumberRange(minElev, maxElev)
   gradient.setSpectrum(color0, color1, color2, color2, color3, color3, color3, color4, color4, color5, color5, color5, color6,color6)

   for (let i = 0; i < dem.length; i++){

      // Might be faster:
      var hex = `#${hypsotint(dem[i])}`
      // var hex = `#${gradient.colorAt(dem[i])}`
      var rgb = hexToRgb(hex)

      px[4*i + 0] = rgb.r
      px[4*i + 1] = rgb.g
      px[4*i + 2] = rgb.b
      px[4*i + 3] = 255

   }

   return px

}



// from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
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



var colorsArray =      ['#164A5B', '#75CFEC', '#FCFFA0', 'lightgreen', 'darkgreen', 'white']
var breakpointsArray = [       -850,        0,        800,         4500,         9000]

var brackets = []

for (let i = 0; i < breakpointsArray.length - 2; i++){
   brackets[i] = i === 0 
      ? {
            breakpoints: [ breakpointsArray[i], breakpointsArray[i + 1] ],
            colors: [ colorsArray[i], colorsArray[i + 1] ]
         }
      : {
            breakpoints: [ breakpointsArray[i], breakpointsArray[i + 1] ],
            colors: [ colorsArray[i + 1], colorsArray[i + 2] ]
         }
}


function hypsotint(elevation){

   var chosenBracket = brackets.filter( bracket => {
      if ( elevation > bracket.breakpoints[0] && elevation <= bracket.breakpoints[1] ){
         return true
      }
   })

   if (chosenBracket.length === 1){
      var gradient = new Rainbow()
      gradient.setNumberRange(chosenBracket[0].breakpoints[0], chosenBracket[0].breakpoints[1])
      gradient.setSpectrum(chosenBracket[0].colors[0], chosenBracket[0].colors[1])
   
      return gradient.colorAt(elevation)
   }

   // fallback case: paint it black if there are errors in the hypsotint algorithm
   return '000000'

}