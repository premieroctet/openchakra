import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';

const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',

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
  media: {
    height: 0,
    borderRadius: '20px',
    paddingTop: '118.25%', // 16:9
  },
  textBox: {
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 30,
    marginTop: 35,
  },
  textUp: {
    textAlign: 'left',
    paddingTop: '1rem',
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'white',
    letterSpacing: '.2rem',
  },
  leh3: {
    fontWeight: 'bold',
  },
  textDown: {
    textAlign: 'left',
    fontFamily: 'Helvetica',
    fontSize: '17px',
    color: 'white',
  },
  textContainer: {
    flex: 1,
  },
  container2: {
    flexDirection: 'column',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  card: {
    maxHeight: '300px',
    height: '200px',
    borderRadius: '5px',

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: { // xs: 600px or larger
      maxWidth: 450,
      maxHeight: 300,
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
    },
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      maxWidth: 350,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 300,
    },
  },
  cardAction: {
    height: '100%',
  },
  cardMedia: {
    height: '100%',
  },
  center: {
    alignSelf: 'center',
  },
  enbas: {
    alignSelf: 'flex-end',
  },
});

class TemptedBy extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prestation: [],
    };
  }

  componentDidMount() {
    axios.get('/myAlfred/api/prestation/home')
      .then(response => {
        let prestation = response.data;

        this.setState({prestation: prestation});
      });
  }

  render() {
    const {classes} = this.props;
    const background = ['../../static/bleumarine.PNG', '../../static/saumonrouge.PNG', '../../static/bleuclair.PNG'
      , '../../static/violetclair.PNG'];


    const {prestation} = this.state;
    const cards = prestation.map(e => (
      <Grid item xs={12} sm={6} md={3} lg={3} key={e._id}>

        <Card className={classes.card}>
          <CardActionArea className={classes.cardAction}>
            <CardMedia component="div" alt="color" image={background[Math.floor(Math.random() * background.length)]}
                       className={classes.cardMedia}>
              <Grid container className={classes.container2}>
                <Grid container xs={12} className={classes.row}>
                  <Grid item xs={1}>
                    <Typography className={classes.textDown}></Typography>
                  </Grid>
                  <Grid item xs={9} className={classes.center}>
                    <Typography className={classes.textDown}><span
                      className={classes.leh3}>{e.label} ({e.filter_presentation.label})</span><br/>{e.price}€</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className={classes.textDown}></Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardMedia>
          </CardActionArea>
        </Card>
      </Grid>
    ));

    return (
      <Fragment>
        <Grid container className={classes.container}>
          <Typography variant="h5" className={classes.textBox}>
            Vous serez peut-être tentés par...
          </Typography>
        </Grid>
        <Grid container className={classes.container} spacing={24} wrap="wrap">
          {cards}

        </Grid>
      </Fragment>
    );
  }
}

TemptedBy.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(TemptedBy);
