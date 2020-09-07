import React from 'react';
import {withStyles} from '@material-ui/core/styles';

let Map, TileLayer,Marker, Popup, Circle

//const position = [51.505, -0.09];
const styles = {
    container: {
        height: 200,

    }
};

class MapComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
      // FIX : avoid Map loading if component not mounted (i.e. on server side)
      Map=require('react-leaflet').Map;
      TileLayer=require('react-leaflet').TileLayer;
      Marker=require('react-leaflet').Marker;
      Popup=require('react-leaflet').Popup;
      Circle=require('react-leaflet').Circle;
    }

    render() {
      var {classes,position, perimeter, alfred, zoom, circles} = this.props;
      zoom = zoom || 12;
      circles = circles || []
      if (Map) {
      return (
        <div id={'map-container'} style={{height: '100%',width:'100%'}}>
          <Map center={position} zoom={zoom} style={{height: '100%',width:'100%'}}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Circle
                  center={{lat:position[0], lng:position[1]}}
                  fillColor="blue"
                  radius={perimeter}/>
            { circles.map( c =>
                <>
                <Marker position={c.coordinates}>
                  <Popup><a href={c.link} target="_blank">{c.label}</a></Popup>
                </Marker>
                </>
            )}
          </Map>
        </div>
      )
      } else {
        return null;
      }
    }
}

export default withStyles(styles)(MapComponent);
