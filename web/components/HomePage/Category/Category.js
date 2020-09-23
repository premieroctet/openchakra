import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SlideShow from '../../SlideShow/SlideShow';
import StarIcon from '@material-ui/icons/Star';

class Category extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <React.Fragment style={{display: 'flex', flexDirection: 'column'}}>
        <Grid style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Grid style={{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
              <Grid>
                <StarIcon/>
              </Grid>
              <Grid>
                <Grid>
                  <p>Catégories</p>
                </Grid>
                <Grid>
                  <p>Des milliers de services à découvrir</p>
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

export default Category
