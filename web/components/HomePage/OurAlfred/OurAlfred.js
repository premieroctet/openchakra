import React from 'react';
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import SlideShow from "../../SlideShow/SlideShow";

class OurAlfred extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <React.Fragment style={{display: 'flex', flexDirection: 'column'}}>
        <Grid style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <Grid style={{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
            <Grid>
              <StarIcon/>
            </Grid>
            <Grid>
              <Grid>
                <p>Nos Alfred</p>
              </Grid>
              <Grid>
                <p>Découvrez les profils de nos Alfred</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Button>Tout Découvrir</Button>
          </Grid>
        </Grid>
        <Grid>
          <SlideShow/>
        </Grid>
      </React.Fragment>

    );
  }
}

export default OurAlfred;
