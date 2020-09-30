import React from 'react';
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
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
    const{style} = this.props;
    const{value} = this.state;
    return(
      <Grid>
        <Grid className={style.scrollMenuRoot}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={value}
            onChange={this.handleChange}
            aria-label="Vertical tabs example"
            className={style.scrollMenuTabs}
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
            <Tab label="Item Four" {...a11yProps(3)} />
            <Tab label="Item Five" {...a11yProps(4)} />
            <Tab label="Item Six" {...a11yProps(5)} />
            <Tab label="Item Seven" {...a11yProps(6)} />
            <Tab label="Item Seven" {...a11yProps(7)} />
            <Tab label="Item Seven" {...a11yProps(8)} />
            <Tab label="Item Seven" {...a11yProps(9)} />
            <Tab label="Item Seven" {...a11yProps(10)} />
          </Tabs>
        </Grid>
      </Grid>
    );
  }
}

export default SrollMenu;
