import React from 'react';
import ReactDOM from 'react-dom';
import SpotMini from '../components/spots/spot_mini';

export default class MarkerManager {
  constructor(map){
    this.map = map;
    this.markers = {};


    this.mapSpotMiniDiv = '<div id="map-spot-mini-div" style="width:280px"></div>';

    this.openMapSpotMini = null;
  }

  updateMarkers(searchResults){
    this.markers = {};
    let bounds = new google.maps.LatLngBounds();

    for(let i = 0; i < searchResults.length; i++){
      const spot = searchResults[i];
      if(!this.markers.hasOwnProperty(spot.id)){
        this.addSpot(spot)
          .then(function(marker){

            this.markers[spot.id] = marker;

            bounds.extend(marker.getPosition());

            marker.setLabel(`$${spot.base_price}`);

            marker.setIcon({
              url: 'https://img.clipartfest.com/c27ce627c345eead6877a1e58d1cebbd_-of-a-cartoon-speech-bubble-thought-clipart-transparent-background_958-958.png',
              scaledSize: new google.maps.Size(40, 30),
            });

            const infowindow = new google.maps.InfoWindow({
              content: this.mapSpotMiniDiv,
            });


            marker.addListener('click', function(){

              if(this.openMapSpotMini){
                this.openMapSpotMini.close();
              };
              this.openMapSpotMini = infowindow;
              infowindow.open(this.map, marker);
              ReactDOM.render(<SpotMini spot={spot}/>, document.getElementById('map-spot-mini-div'))
            }.bind(this));
          }.bind(this))
          .then(() => this.map.fitBounds(bounds));
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
      (errors) => console.log('Errors:', errors)
    )
  }


  addMarker(latlong){
    return new google.maps.Marker({
      position: latlong,
      map: this.map,
    });
  }


}
