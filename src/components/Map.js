import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
class Map extends Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
        // defaultOptions={{ styles: mapStyles }}
      ></GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
