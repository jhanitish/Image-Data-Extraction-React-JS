import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const apiMaps = "AIzaSyB9eA3ornU_CDOx9KHURRkVvuuM2OZaRp4";

class Maps extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={18}
        initialCenter={{
          lat: this.props.lat,
          lng: this.props.long
        }}
        style={{
          width: "400px",
          height: "200px"
        }}
      >
        <Marker />
        <InfoWindow />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiMaps
})(Maps);
