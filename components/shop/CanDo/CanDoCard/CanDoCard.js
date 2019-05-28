import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
// eslint-disable-next-line object-curly-newline
import { FavoriteBorderOutlined, More } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
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

class canDoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      shop: [],
      service: []
    };
  }

  componentDidMount() {
    let self = this;


    const id = self.props.shops;


    axios.get(`http://localhost:5000/myAlfred/api/shop/${id}`)
        .then(function (response) {

          let shop = response.data;
          //console.log(shop.services);
          shop.services.map(e => (
             console.log(e.label.service.label)
          ));


          self.setState({
            shop:shop,
            service: shop.services
          })




        })
        .catch(function (error) {
          console.log(error);
        });
  }
  // eslint-disable-next-line object-curly-newline
  render() {
    const {classes, img} = this.props;
    const {service} = this.state;
    const test = service.map(k => (
        <p>{k.label.service.label}</p>
    ));
    /*const test = service2.map(k => (
        <Card className={classes.card} key={k._id}>
          <CardActionArea>
            <CardMedia className={classes.media} image={img} title="Coiffure">
              <div className={classes.darkOverlay}>
                <Grid container style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'space-around'
                }}>
                  <Grid item/>
                  <Grid item style={{alignSelf: 'center'}}>
                    <Typography style={{color: 'white', fontSize: 25}}>test</Typography>
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
                {k.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    ));*/

    return (
        {test}
    );
  }
}

canDoCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default withStyles(styles)(canDoCard);
