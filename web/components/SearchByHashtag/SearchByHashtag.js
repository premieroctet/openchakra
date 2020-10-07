import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

class SearchByHashtag extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      hashtags:['webdesign', 'dogsitter', 'bricolage', 'babysitting', 'coach', 'naturopathie', 'mariage', 'catlover', 'maisonjardin', 'gardedanimaux', 'yoga', 'chefcuisto', 'coursdemathématiques', 'sport']
    }
  }

  render() {
    const{hashtags} = this.state;
    const { style } = this.props;
    return(
      <Grid>
        <Grid style={{textAlign: 'center'}}>
          <h2>Explorer nos services avec les hashtags</h2>
        </Grid>
        <Grid container>
          {
            hashtags.map((res, index) => (
              <Grid item xl={2}>
                <Button variant="contained">#{res}</Button>
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    );
  }
}

export default SearchByHashtag;

