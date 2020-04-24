import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import BodySearchCard from './BodySeachCard/BodySearchCard';
import axios from "axios";

const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 64,
    width: '100%',

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      width: 920,
    },
    [theme.breakpoints.up('lg')]: { // large: 1280px or larger
      width: 1170,
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: 1366,
    },
  },
  title: {
    fontSize: '2.5em',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
});

class bodySearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prestation: [],
      first: ''


    }

  };

  componentDidMount() {
    let self = this;

    const id = self.props.service;
    axios.get(`/myAlfred/api/prestation/${id}`)
        .then(function (response) {
          let prestation = response.data;
          self.setState({
            prestation: prestation,
            first: prestation[0].service.label
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  render() {

    const {classes} = this.props;
    const {prestation} = this.state;

    const card = prestation.map(e => (
        <Grid item xs={6} sm={6} md={3} key={e._id}><BodySearchCard label={e.label} price={e.price} filter={e.filter_presentation.label}/></Grid>
    ));

    const first = this.state.first;


    return (
        <Fragment>
          <Grid container className={classes.container}>
            <Typography variant="h5" className={classes.title}>Toutes les prestations pour {first}</Typography>
          </Grid>
          <Grid container className={classes.container} spacing={24}>
            {card}
          </Grid>
        </Fragment>
    );
  }
}

export default withStyles(styles)(bodySearch);
