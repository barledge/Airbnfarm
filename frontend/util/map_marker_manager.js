export default class MarkerManager {
  constructor(map){
    this.map = map;
    this.markers = {};
  }

  updateMarkers(searchResults){

    for(let i = 0; i < searchResults.length; i++){
      const spot = searchResults[i];
      if(!this.markers.hasOwnProperty(spot.id)){
        this.addSpot(spot)
          .then((marker) => this.markers[spot.id] = marker);
      }
    }
  }

  addSpot(spot){
    return $.ajax({
      method: 'get',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      dataType: 'json',
      data: {
        address: `${spot.street_address} ${spot.city} ${spot.state} ${spot.zipcode}`,
      },
    }).then(
      (resp) => this.addMarker(resp.results[0].geometry.location),
      (errors) => console.log('there were errors:', errors)
    )
  }


  addMarker(latlong){
    return new google.maps.Marker({
      position: latlong,
      map: this.map,
      title: 'Hello World!'
    });
  }





}