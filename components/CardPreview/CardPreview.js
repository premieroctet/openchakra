import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './CardPreviewStyle'


class CardPreview extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    const {classes} = this.props;

    return (
      <Grid container spacing={2}>
      </Grid>
    )
  }
}

CardPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(CardPreview);
