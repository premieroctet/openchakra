import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

let Map, TileLayer, Marker, Popup, Circle;

const styles = {
  container: {
    height: 200,

  },
};

class MapComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // FIX : avoid Map loading if component not mounted (i.e. on server side)
    Map = require('react-leaflet').Map;
    TileLayer = require('react-leaflet').TileLayer;
    Marker = require('react-leaflet').Marker;
    Popup = require('react-leaflet').Popup;
    Circle = require('react-leaflet').Circle;
  }

  render() {
    let { position, perimeter, zoom, circles} = this.props;

    zoom = zoom || 12;
    circles = circles || [];
    if (Map) {
      return (
        <Grid id={'map-container'} style={{height: 300}}>
          <Map center={position} zoom={zoom} style={{height: '100%'}}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Circle
              center={{lat: position[0], lng: position[1]}}
              fillColor="blue"
              radius={perimeter}/>
            {circles.map(c =>
              <Grid>
                <Marker position={c.coordinates}>
                  <Popup><a href={c.link} target="_blank">{c.label}</a></Popup>
                </Marker>
              </Grid>,
            )}
          </Map>
        </Grid>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(MapComponent);
