/**/
import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PopularCategoriesCard from './PoplarCategoriesCard/PopularCategoriesCard';
import Head from 'next/head';
import axios from 'axios';
import Link from 'next/link';

const styles = theme => ({

  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
    marginTop: '30px',

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
    textAlign: 'center',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 30,
    marginTop: 35,
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      color: 'grey',
    },
  },
  grosHR: {
    height: '10px',
    backgroundColor: '#3f51b5',
  },

});

function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

class popularCategories extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: [],


    };
  }

  componentDidMount() {
    axios.get('/myAlfred/api/category/all')
      .then(response => {
        let category = response.data;


        this.setState({
          category: category,


        });
      });

  }

  render() {
    const {classes} = this.props;
    const {category} = this.state;


    const resdata = shuffleArray(category);
    const categories = resdata.slice(0, 4).map(e => (
      <Grid item xs={3}><Link href={`/service?category=${e._id}`}><a className={classes.link}><PopularCategoriesCard
        img={e.picture} categorie={e.label}
      /></a></Link></Grid>
    ));

    return (
      <Fragment>
        <div>
          <Head>
            <title>Home</title>
          </Head>
        </div>
        <Grid container className={classes.container}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <div>
              <Typography variant="h4" className={classes.textBox}>
                Nous sommes tous des Alfred !
              </Typography>
              <Grid container>
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                  <hr className={classes.grosHR}/>
                </Grid>
                <Grid item xs={5}></Grid>
              </Grid>
              <Typography className={classes.textBox}>
                  <span>Nous sommes tous des Alfred en puissance !!!<br/>
                  Une passion ? un savoir-faire ? ou simplement du temps, envie de partager…Devenez Alfred et
                  arrondissez vos fins de mois très simplement !</span>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3}></Grid>
          {categories}
        </Grid>
      </Fragment>
    );
  }
};

popularCategories.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(popularCategories);
