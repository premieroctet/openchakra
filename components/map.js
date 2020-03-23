import React from 'react'
import { Map, TileLayer,Marker, Popup } from 'react-leaflet'
import { withStyles } from '@material-ui/core/styles';

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

    render() {
      const {classes,position} = this.props;
      return (
        <div id={'map-container'} style={{height: 200,width:'100%'}}>
          <Map center={position} zoom={13} style={{height: 200,width:'100%'}}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={position}>
              <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
          </Map>
        </div>
      )
    }
}

export default withStyles(styles)(MapComponent);
