const paths = [
   // First Segment (from starting point to ladder and up)
   [
      L.latLng(155, 271), // moving right
      L.latLng(155, 235),
      L.latLng(200, 235), // moving up
      L.latLng(216, 241),
      L.latLng(245, 240),
      L.latLng(260, 218),
      L.latLng(312, 218)
   ],
]

export const directions = {
   "starting point": {
      "ArrowUp": {
         latlngs: paths[0],
         destination: "first stop"
      }
   },
   "first stop": {
      "ArrowLeft": {
         latlngs: [],
         destination: "first pipe"
      },
      "ArrowDown": {
         latlngs: paths[0].slice().reverse(),
         destination: "starting point"
      }
   }
}