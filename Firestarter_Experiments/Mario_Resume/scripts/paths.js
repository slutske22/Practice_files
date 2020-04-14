import { map, Mario } from './index.js'

// First Segment (from starting point to ladder and up)
export const paths = {
   path1: [
      L.latLng(156, 272), // moving right
      L.latLng(155, 235),
      L.latLng(200, 235), // moving up
      L.latLng(216, 241),
      L.latLng(245, 240),
      L.latLng(260, 218),
      L.latLng(316, 218)
   ],
   path2: [
      L.latLng(316, 218),
      L.latLng(316, 195),
      L.latLng(319, 191),
      L.latLng(342, 191),
      L.latLng(342, 246),
      L.latLng(356, 260.5),
      L.latLng(371, 260.5),
   ],
   path3: [
      L.latLng(371, 260.5),
      L.latLng(351, 260.5),
   ]
}

export const directions = {
   "starting point": {
      "ArrowUp": {
         latlngs: paths.path1,
         destination: "first stop"
      }
   },
   "first stop": {
      "ArrowLeft": {
         latlngs: paths.path2,
         destination: "first tube"
      },
      "ArrowDown": {
         latlngs: paths.path1.slice().reverse(),
         destination: "starting point"
      }
   },
   "first tube": {
      trigger: () => {
         console.log('at tube 1')
         map.getPane('variable-overlays').style.zIndex = 450
         Mario._i = 0
         Mario.animate(paths.path3)
      }
   }
}