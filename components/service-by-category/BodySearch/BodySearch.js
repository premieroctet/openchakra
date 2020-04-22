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
      service: [],
      first: ''


    }

  };

  componentDidMount() {
    let self = this;

    const id = self.props.category;
    axios.get(`/myAlfred/api/service/all/${id}`)
        .then(function (response) {

          let service = response.data;


          self.setState({
            service: service,
            first: service[0].category.label

          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  render() {

    const {classes} = this.props;
    const {service} = this.state;

    const card = service.map(e => (
        <Grid item xs={6} sm={6} md={3}><BodySearchCard img={e.picture} desc={e.description} service={e.label}/></Grid>
    ));

    const first = this.state.first;


    return (
        <Fragment>
          <Grid container className={classes.container}>
            <Typography variant="h5" className={classes.title}>Tous les services dans la catégorie {first}</Typography>
          </Grid>
          <Grid container className={classes.container} spacing={24}>
            {card}
          </Grid>
        </Fragment>
    );
  }
}

export default withStyles(styles)(bodySearch);
