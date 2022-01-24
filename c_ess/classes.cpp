#include <stdio.h>
#include <stdlib.h>

class LatLng {
public:
  float lat;
  float lng;

  LatLng(float latitude, float longitude) {
    lat = latitude;
    lng = longitude;
  }

  void prettyPrint() {
    printf("The latitude is %f and the longitude is %f", lat, lng);
  }
};

int main() {
  LatLng newPoint(32.2, 117.1);

  newPoint.prettyPrint();
};
