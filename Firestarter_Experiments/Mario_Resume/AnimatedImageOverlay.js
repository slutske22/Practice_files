// http://bl.ocks.org/ramiroaznar/44f8de5ab7db081cae19db4e67bf6d74

L.AnimatedImageOverlay = L.ImageOverlay.extend({
   options: {
      // meters
      distance: 200,
      // ms
      interval: 1000,
      // animate on add?
      autoStart: true,
      // callback onend
      onEnd: function () {},
      clickable: false,
   },

   initialize: function (latlngs, options) {
      this.setLine(latlngs);
      L.ImageOverlay.prototype.initialize.call(this, latlngs[0], options);
   },

   // Breaks the line up into tiny chunks (see options) ONLY if CSS3 animations
   // are not supported.
   _chunk: function (latlngs) {
      var i,
         len = latlngs.length,
         chunkedLatLngs = [];

      for (i = 1; i < len; i++) {
         var cur = latlngs[i - 1],
            next = latlngs[i],
            dist = cur.distanceTo(next),
            factor = this.options.distance / dist,
            dLat = factor * (next.lat - cur.lat),
            dLng = factor * (next.lng - cur.lng);

         if (dist > this.options.distance) {
            while (dist > this.options.distance) {
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

   onAdd: function (map) {
      L.ImageOverlay.prototype.onAdd.call(this, map);

      // Start animating when added to the map
      if (this.options.autoStart) {
         this.start();
      }
   },

   animate: function () {
      var self = this,
         len = this._latlngs.length,
         speed = this.options.interval,
         bounds = this.getBounds(),
         offsetX = (bounds._northEast.lng - bounds._southWest.lng) / 2,
         offsetY = (bounds._northEast.lat - bounds._southWest.lat) / 2,
         center = L.latLng(
            bounds._southWest.lat + offsetY,
            bounds._southWest.lng + offsetY
         );

      // Normalize the transition speed from vertex to vertex
      if (this._i < len && this.i > 0) {
         speed =
            (this._latlngs[this._i - 1].distanceTo(this._latlngs[this._i]) /
               this.options.distance) *
            this.options.interval;
      }

      // Only if CSS3 transitions are supported
      if (L.DomUtil.TRANSITION) {
         if (this._icon) {
            this._icon.style[L.DomUtil.TRANSITION] =
               "all " + speed + "ms linear";
         }
         if (this._shadow) {
            this._shadow.style[L.DomUtil.TRANSITION] =
               "all " + speed + "ms linear";
         }
      }

      // Move to the next bounds
      var newBounds = L.latlngBounds(
         L.latLng(this._latlngs[this._i].lat - offsetY, this._latlngs[this._i].lng - offsetX),
         L.latLng(this._latlngs[this._i].lat + offsetY, this._latlngs[this._i].lng + offsetY)
      );
      // this.setLatLng(this._latlngs[this._i]);
      this.setBounds(newBounds)
      this._i++;

      // Queue up the animation to the next next vertex
      this._tid = setTimeout(function () {
         if (self._i === len) {
            self.options.onEnd.apply(
               self,
               Array.prototype.slice.call(arguments)
            );
         } else {
            self.animate();
         }
      }, speed);
   },

   // Start the animation
   start: function () {
      this.animate();
   },

   // Stop the animation in place
   stop: function () {
      if (this._tid) {
         clearTimeout(this._tid);


      }
   },

   setLine: function (latlngs) {
      if (L.DomUtil.TRANSITION) {
         // No need to to check up the line if we can animate using CSS3
         this._latlngs = latlngs;
      } else {
         // Chunk up the lines into options.distance bits
         this._latlngs = this._chunk(latlngs);
         this.options.distance = 10;
         this.options.interval = 30;
      }
      this._i = 0;
   },
});

L.animatedImageOverlay = function (latlngs, options) {
   return new L.AnimatedImageOverlay(latlngs, options);
};
