/**/ 
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PopularCategoriesCard from './PoplarCategoriesCard/PopularCategoriesCard';
import Head from 'next/head';
import axios from 'axios';
import Link from 'next/link';

const url = "https://myalfred.hausdivision.com/";
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
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 30,
    marginTop: 35,
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      color: 'grey',
    }
  },

});

class popularCategories extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: [],


    }
  }

  componentDidMount() {
    axios.get(url+'myAlfred/api/category/all')
        .then(response => {
          let category = response.data;




          this.setState({
            category: category,

          })
        })

  }

  render() {
    const {classes} = this.props;
    const {category} = this.state;



    const categories = category.map(e => (
        <Link href={`/service?category=${e._id}`} as={`/service/${e._id}`}><a className={classes.link}><PopularCategoriesCard img={e.picture} categorie={e.label}
        /></a></Link>
    ));

    return (
        <Fragment>
          <div>
            <Head>
              <title>Home</title>
              <link href="../../../static/style1.css" rel="stylesheet"/>
            </Head>
          </div>
          <Grid container className={classes.container}>
            <Typography variant="h5" className={classes.textBox}>
              Nos catégories les plus populaires
            </Typography>
          </Grid>
          <div className="thewrap">
            <section className="card1">

              {categories}



            </section>
          </div>

        </Fragment>
    );
  }
};

popularCategories.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(popularCategories);
