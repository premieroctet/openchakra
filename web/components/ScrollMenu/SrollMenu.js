import React from 'react';
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import Link from "@material-ui/core/Link";

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

class SrollMenu extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      value:0
    }
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue})
  };

  render() {
    const{style, categories, gps} = this.props;
    const{value} = this.state;

    /**TODO {/**<Link href={'/search?search=1&category=' + res._id + (gps ? '&gps=' + JSON.stringify(gps) : '')}></Link>**/


  return(
      <Grid>
        <Grid className={style.scrollMenuRoot}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={value}
            onChange={this.handleChange}
            aria-label="scrollable force tabs"
            scrollButtons="on"
            classes={{indicator: style.scrollMenuIndicator}}
          >
            {
              categories ?
                categories.map((res, index) => {
                  return(
                    <Tab label={res.label} className={style.scrollMenuTab} {...a11yProps(index)} />
                  )
                }) : null
            }
          </Tabs>
        </Grid>
      </Grid>
    );
  }
}

export default SrollMenu;
