import React from 'react';
import Grid from "@material-ui/core/Grid";
import styles from '../../../static/css/components/Card/CategoryCard/CategoryCard'
import withStyles from "@material-ui/core/styles/withStyles";

class CategoryCard extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    const {classes, item} = this.props;

    if (!item) {
      return null
    }
    return(
      <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Grid className={classes.categoryCardMedia}>
          <Grid
            style={{backgroundImage: `url('${item.picture}')`}}
            className={classes.categoryCardBackground}
          />
        </Grid>
        <Grid>
          <h6>{item.label}</h6>
        </Grid>
      </Grid>
    )
  }

}

export default withStyles (styles) (CategoryCard);
