import React from 'react'
import styles from './BoxStyle';
import withStyles from "@material-ui/core/styles/withStyles";

class Box extends React.Component {

  render() {
    const {classes}=this.props

    return (
      <div className={classes.borderBox} >
        {this.props.children}
      </div>
    )
  }
}

export default withStyles(styles)(Box)
