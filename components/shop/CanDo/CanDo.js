import React, { Fragment } from 'react';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
//import CanDoCard from './CanDoCard/CanDoCard';
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { FavoriteBorderOutlined, More } from '@material-ui/icons';

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
  resphide:{
    [theme.breakpoints.up('sm')]: { // medium: 960px or larger
      display:'none',
    },
  },
  title: {
    fontSize: '1.5em',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  card: {
    maxWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  gridButton: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bookButton: {
    padding: '0 3rem !important',
  },
  media: {
    height: 200,
  },
  gpsText: {
    lineHeight: 2,
  },
  text: {
    paddingTop: '.7rem',
  },
  whiteLogo: {
    margin: '.5rem',
    color: 'white',
  },
  avatarContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    alignContent: 'start',
    justifySelf: 'center',
    height: 60,
    width: 60,
  },
  darkOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  locationGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
  locationLogo: {
    color: 'white',
    marginLeft: 10,
  },
  locationText: {
    color: 'white',
    lineHeight: 2.3,
  },
  locationAvatarGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  rowLocation: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px 20px 0 0',
  },
});

class canDo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      services: []
    }
  }

  componentDidMount() {
    let self = this;



    const id_alfred = self.props.shop;

    axios.get('/myAlfred/api/serviceUser/allUserServices/' + id_alfred)
        .then(res => this.setState({services: res.data}))
        .catch(err => console.log(err));
  }

  render() {
    const {classes} = this.props;
    const {services} = this.state;

    const servicesUser = services.map(e => (
        <React.Fragment>
          {/*<Grid className={classes.resphide} item xs={2}></Grid>*/}
          <Grid item xs={12} sm={6} md={4} key={e._id}>
            <Card className={classes.card}>
              <Link href={`/userServicePreview?id=${e._id}`}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={'../../../'+e.service.picture} title={e.service.label}>
                    <div className={classes.darkOverlay}>
                      <Grid container style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        justifyContent: 'space-around'
                      }}>
                        <Grid item/>
                        <Grid item style={{alignSelf: 'center'}}>
                          <Typography style={{color: 'white', fontSize: 25, textAlign: 'center'}}>{e.service.label}</Typography>
                        </Grid>
                        <Grid container style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                          <Grid item style={{paddingLeft: 15}}>
                            <FavoriteBorderOutlined style={{color: 'white'}}/>
                          </Grid>
                          <Grid item style={{paddingRight: 15}}>
                            <More style={{color: 'white'}}/>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </CardMedia>
                  <CardContent>
                    <Typography component="p">
                      {e.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        </React.Fragment>
    ));

    return (
        <Fragment>
          <Grid container className={classes.container}>
            <Typography variant="h5" className={classes.title}>Je peux faire...</Typography>
          </Grid>
          <Grid container className={classes.container} spacing={24}>
            {servicesUser}
          </Grid>
        </Fragment>
    );
  }
};

export default withStyles(styles)(canDo);
