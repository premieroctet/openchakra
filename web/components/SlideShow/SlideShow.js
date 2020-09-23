import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import {Slide}  from 'react-slideshow-image';
import Grid from '@material-ui/core/Grid';


class SlideShow extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      autoplay: false
    }
  }

  render(){
    const{autoplay} = this.state;
    return(
      <Grid>
        <Slide easing="ease" autoplay={autoplay}>
          <Grid container style={{display: 'flex', alignItems: 'center', padding: '2%'}}>
              <Grid container>
                  <Grid item xl={3} style={{backgroundColor: 'red', height: 200}}/>
                  <Grid item xl={3} style={{backgroundColor: 'blue',  height: 200}}/>
                  <Grid item xl={3} style={{backgroundColor: 'pink',  height: 200}}/>
                  <Grid item xl={3} style={{backgroundColor: 'green',  height: 200}}/>
              </Grid>
              <Grid container style={{marginTop: '1%'}}>
                  <Grid item xl={3} style={{backgroundColor: 'black',  height: 200}}/>
                  <Grid item xl={3} style={{backgroundColor: 'purple',  height: 200}}/>
                  <Grid item xl={3} style={{backgroundColor: 'orange',  height: 200}}/>
                  <Grid item xl={3} style={{backgroundColor: 'yellow',  height: 200}}/>
              </Grid>


          </Grid>
          <Grid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height : 350}}>
            <div style={{backgroundColor: 'blue'}}>
              <span>Slide 2</span>
            </div>
          </Grid>
          <Grid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height : 350}}>
            <div style={{backgroundColor: 'pink'}}>
              <span>Slide 3</span>
            </div>
          </Grid>
        </Slide>
      </Grid>
    );
  }

}

export default SlideShow
