import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import Link from 'next/link';

const styles = theme => ({
  container: {
    margin: 'auto',
    width: '100%',
    textAlign: 'center',
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
  card: {

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: { // xs: 600px or larger
      maxWidth: 450,
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
  media2: {
    height: 200,
  },
  textBox1: {
    color: 'rgba(84,89,95,0.95)',
    letterSpacing: -2,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: '3%',
    marginTop: '10%',
  },
  textBox: {
    textAlign: 'center',
    fontSize: 15,
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: '3%',

  },
  separatorBlue: {
    width: '50px',
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

class section15 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      tags: {},
    };
  }

  componentDidMount() {

    axios.get('/myAlfred/api/tags/category/section15')
      .then(response => {
          let data = response.data;
          this.setState({tags: data});
          axios.get('/myAlfred/api/category/all/tags/' + data._id)
            .then(res => {
              let category = res.data;

              this.setState({category: category});

            })
            .catch();
        },
      )
      .catch();
  }

  render() {
    const {classes, gps} = this.props;
    const {category} = this.state;
    const {tags} = this.state;
    const resdata = shuffleArray(category);
    const services = resdata.slice(0, 4).map(e => (
      <Grid item xs={12} sm={6} md={3} lg={3} key={e._id}>
        <Link href={'/search?search=1&category=' + e._id + (gps ? '&gps=' + JSON.stringify(gps) : '')}>
          <Card className={classes.card} style={{
            backgroundColor: 'transparent',
            textAlign: 'center',
            margin: 10,
            boxShadow: '1px 3px 1px transparent',
          }}>
            <CardActionArea>
              <CardMedia
                className={classes.media2}
                image={e.picture}
                title={e.label}
                style={{height: '530px', width: '100%'}}
              />
              <CardContent>

                <Typography gutterBottom variant="h5" component="p"
                            style={{fontSize: 16, fontWeight: 100, textAlign: 'center', color: '#505050'}}>
                  {e.label}
                </Typography>
                <Typography component="p">
                  {e.description}
                </Typography>

              </CardContent>
            </CardActionArea>

          </Card>
        </Link>
      </Grid>
    ));

    return (
      <Fragment>
        <Grid container className={classes.container}>
          <Grid item xs={2}/>
          <Grid item xs={8}>
            <div>
              <Typography variant="h4" className={classes.textBox1}>
                {tags.title}
              </Typography>
              <Grid container>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                <Grid item xs={2} sm={4} md={4} lg={4} xl={4} style={{margin: 'auto'}}>
                  <img alt={'séparateur'} src={'../../../static/separateur-bleu.svg'}
                       className={classes.separatorBlue}/>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}/>
                <Grid item xs={5}/>
              </Grid>
              <Typography className={classes.textBox}>
                {tags.description}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2}/>
          {services}
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(section15);
