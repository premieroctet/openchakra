import React from 'react';
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from 'next/link';
import styles from '../../static/css/components/ScrollMenu/ScrollMenu';
import withStyles from "@material-ui/core/styles/withStyles";

function a11yProps(index, res) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

class SrollMenu extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      value: props.indexCat ? parseInt(props.indexCat) : 0,
    }
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue})
  };

  render() {
    const{classes, categories, gps, account} = this.props;
    const{value} = this.state;

  return(
      <Grid>
        <Grid className={classes.scrollMenuRoot}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={value}
            onChange={this.handleChange}
            aria-label="scrollable force tabs"
            scrollButtons="on"
            classes={{indicator: classes.scrollMenuIndicator}}
          >
            {
              categories ?
                categories.map((res, index) =>
                {
                  let url = account === 'account' ? '/search?search=1&category=' + res._id + (gps ? '&gps=' + JSON.stringify(gps) : '') + '&indexCat=' + index : '/account' + res.url  + '?indexAccount=' + index;
                  return(
                    <Link href={url} key={index}>
                      <Tab label={res.label} className={classes.scrollMenuTab} {...a11yProps(index)}/>
                    </Link>
                  )
                }
                ) : null
            }
          </Tabs>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SrollMenu);
