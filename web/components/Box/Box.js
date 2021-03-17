import React from 'react'
import styles from './BoxStyle';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

class Box extends React.Component {

  render() {
    const {classes, children, overWritteCSS}=this.props;

    return (
      <Grid className={classes.borderBox} style={{minHeight: overWritteCSS ? '95vh': ''}}>
        {children}
      </Grid>
    )
  }
}

export default withStyles(styles)(Box)
