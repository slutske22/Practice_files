L.ImageOverlay.include({


   animate: function(latlngs, initOptions){

      var options = {
         ...initOptions,
         distance: 100000, 
         interval: 20
      }

      if (!this._pathHasBeenInterpolated) {
         this.setLine(latlngs, options);
      }
      this._pathHasBeenInterpolated = true


      var self = this,
         len = this._latlngs.length,
         speed = options.interval,
         bounds = this.getBounds(),
         offsetX = (bounds._northEast.lng - bounds._southWest.lng) / 2,
         offsetY = (bounds._northEast.lat - bounds._southWest.lat) / 2

      // Normalize the transition speed from vertex to vertex
      if (this._i < len && this.i > 0) {
         speed = (this._latlngs[this._i - 1].distanceTo(this._latlngs[this._i]) / options.distance) * options.interval;
      }

      // // Only if CSS3 transitions are supported
      // if (L.DomUtil.TRANSITION) {
      //    if (this._icon) {
      //       this._icon.style[L.DomUtil.TRANSITION] =
      //          "all " + speed + "ms linear";
      //    }
      //    if (this._shadow) {
      //       this._shadow.style[L.DomUtil.TRANSITION] =
      //          "all " + speed + "ms linear";
      //    }
      // }


      // Move to the next bounds
      var newBounds = L.latLngBounds(
         L.latLng(this._latlngs[this._i].lat - offsetY, this._latlngs[this._i].lng - offsetX),
         L.latLng(this._latlngs[this._i].lat + offsetY, this._latlngs[this._i].lng + offsetY)
      );
      // this.setLatLng(this._latlngs[this._i]);
      this.setBounds(newBounds)
      this._i++;

      // Queue up the animation to the next next vertex
      this._tid = setTimeout(function () {
         if (self._i === len) {
               options.onEnd()
               self._pathHasBeenInterpolated = false
               self._i = 0
         } else {
            self.animate(latlngs, options);
         }
      }, speed);

   },

   _chunk: function (latlngs, options) {
      var i,
         len = latlngs.length,
         chunkedLatLngs = [];

      for (i = 1; i < len; i++) {
         var cur = latlngs[i - 1],
            next = latlngs[i],
            dist = cur.distanceTo(next),
            factor = options.distance / dist,
            dLat = factor * (next.lat - cur.lat),
            dLng = factor * (next.lng - cur.lng);

         if (dist > options.distance) {
            while (dist > options.distance) {
               cur = new L.LatLng(cur.lat + dLat, cur.lng + dLng);
               dist = cur.distanceTo(next);
               chunkedLatLngs.push(cur);
            }
         } else {
            chunkedLatLngs.push(cur);
         }
      }
      chunkedLatLngs.push(latlngs[len - 1]);

      return chunkedLatLngs;
   },

   setLine: function (latlngs, options) {

      this._latlngs = this._chunk(latlngs, options);
      options.distance = 10;
      options.interval = 30;
      
      this._i = 0;
   },



})