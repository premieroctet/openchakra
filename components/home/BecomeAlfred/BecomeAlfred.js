import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import axios from 'axios';
import cookie from "react-cookies";
const jwt = require('jsonwebtoken');

const styles = theme => ({
  container: {
    margin:'auto',
    fontFamily: 'Helvetica',
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
    height: 400,
    borderRadius: '20px',
    margin: '1%'
  },
  card1: {
    marginTop: '3%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',

    [theme.breakpoints.up('xs')]: { // medium: 960px or larger
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: { // medium: 960px or larger
      display: 'none',
    },
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      display: 'flex',
    },
    [theme.breakpoints.up('lg')]: { // medium: 960px or larger
      display: 'flex',
    },
    [theme.breakpoints.up('xl')]: { // medium: 960px or larger
      display: 'flex',
    },
  },
  card22: {
    marginTop: '10%',
    display: 'flex',
    height: 'auto',
    boxShadow: '1px 3px 1px transparent',

    [theme.breakpoints.up('xs')]: { // medium: 960px or larger
      display: 'flex',
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: { // medium: 960px or larger
      display: 'flex',
      width: '100%'
    },
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: { // medium: 960px or larger
      display: 'none',
    },
    [theme.breakpoints.up('xl')]: { // medium: 960px or larger
      display: 'none',
    },
  },
  details: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '50%',
    height: '300px',
  },
  padding: {
    padding: '0.7rem',
  },
  margin: {
    margin: '0.7rem',
    color: 'white',
  },
  centercontent: {
    textAlign: 'center!important',
  },
});

class becomeAlfred extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      logged:false,
      alfred: false,
      userId: ""
    }
  }

  componentDidMount() {
    const token = cookie.load('token')
    if (token) {
      this.setState({logged:true});
      const token2 = token.split(' ')[1];
      const decode = jwt.decode(token2);
      this.setState({alfred: decode.is_alfred});

      axios.defaults.headers.common['Authorization'] = token;
      axios
        .get('/myAlfred/api/users/current')
        .then(res => {
          let user = res.data;
          this.setState({user:user, alfred:user.is_alfred, userId: user._id});
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    const {classes} = this.props;

    return (
        <Fragment>
          <Grid container className={classes.container} wrap="wrap">
            <Grid item xs={12}>
              <Card className={classes.card1}>
                <CardMedia
                    className={classes.cover}
                    image='/static/becomeAlfred.jpg'
                    title="Live from space album cover"
                />
                <Grid item xs={12} className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5" className={classes.padding}>
                      Devenir Alfred
                    </Typography>
                    <Typography style={{width: '100%'}} variant="body1" color="textSecondary"
                                className={classes.padding}>
                      Créez en quelques minutes votre espace Alfred,
                      répertoriez vos services, indiquez vos disponibilités,
                      vos tarifs et profitez d’un complément de revenu !
                    </Typography>
                    <Link href={this.state.logged && this.state.alfred ? `/shop?id_alfred=${this.state.userId}`  : this.state.logged && !this.state.alfred ? '/creaShop/creaShop' : '/signup'}>
                      <a style={{textDecoration:'none'}}>
                    <Button variant="contained" color={"primary"} className={classes.margin}>
                      Proposer mes services
                    </Button>
                      </a>
                    </Link>
                  </CardContent>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Fragment>
    );
  }
}

becomeAlfred.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(becomeAlfred);
