import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './CardPreviewStyle'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RoomIcon from '@material-ui/icons/Room';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class CardPreview extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value:0,
      dense: true,
      service: [],
      alfred:[],
      shop:[]
    }
  }
  render(){
    const {classes, service, shop, services} = this.props;

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    return (
      <Grid>
        <Card className={classes.card}>
          <Grid className={classes.cardMedia} style={{ backgroundImage:  'url(' + service.picture + ')'}}>
            { shop.is_professional ?
              <Grid className={classes.statusMedia}>
                <Chip label="PRO" className={classes.chipStyle}/>
              </Grid>
              :null
            }
            <Grid>
              <Grid className={classes.actionMediaEdit}>
                <IconButton aria-label="Edit" className={classes.iconButtonStyle}>
                  <EditIcon style={{color: '#4fbdd7'}}/>
                </IconButton>
              </Grid>
              <Grid className={classes.actionMediaRemove}>
                <IconButton aria-label="remove" className={classes.iconButtonStyle}>
                  <DeleteForeverIcon style={{color: '#f87280'}} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <CardContent>
            <Grid  className={classes.cardContent}>
              <Grid className={classes.cardContentPosition}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {service.category.label}
                </Typography>
                <Grid className={classes.cardContentHeader}>
                  <Typography component="p">
                    {service.label}
                  </Typography>
                </Grid>
                <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                  <Badge badgeContent={0} color={'primary'} className={classes.badgeStyle}>
                    <StyledRating name="read-only" value={this.state.value} readOnly className={classes.rating} />
                  </Badge>
                </Box>
              </Grid>
              <Grid className={classes.cardContentRight}>
                <Grid className={classes.flexPosition}>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Rouen
                  </Typography>
                  <RoomIcon className={classes.checkCircleIcon}/>
                </Grid>
                <Button variant="contained" color="primary" className={classes.button}>
                  Visualiser
                </Button>
              </Grid>
            </Grid>
            <Grid>
              <List dense={this.state.dense} className={classes.flexPosition}>
                <ListItem className={classes.noPadding}>
                  <ListItemIcon className={classes.minWidth}>
                    <img src={services.graduated ? '../../static/assets/img/iconCardAlfred/graduated.svg' : '../../static/assets/img/iconCardAlfred/no_graduated.svg'} alt={'Diplome'} title={'Diplome'} className={classes.imageStyle}/>
                  </ListItemIcon>
                  <ListItemText
                    primary={"Diplômé(e)"}
                  />
                </ListItem>
                <ListItem className={classes.noPadding}>
                  <ListItemIcon  className={classes.minWidth}>
                    <img src={services.is_certified ? '../../static/assets/img/iconCardAlfred/certificate.svg' : '../../static/assets/img/iconCardAlfred/no_certificate.svg'} alt={'Certifié'} title={'Certifié'} className={classes.imageStyle}/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Certifié(e)"
                  />
                </ListItem>
                <ListItem className={classes.noPadding}>
                  <ListItemIcon className={classes.minWidth}>
                    <img src={'../../static/assets/img/iconCardAlfred/experience.svg'} alt={'Expériementé'} title={'Expériementé'} className={classes.imageStyle}/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Expériementé(e)"
                  />
                </ListItem>
              </List>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

CardPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(CardPreview);
