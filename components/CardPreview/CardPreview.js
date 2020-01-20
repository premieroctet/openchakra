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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
      value:3,
      dense: true
    }
  }
  render(){
    const {classes} = this.props;

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    return (
      <Grid>
        <Card className={classes.card}>
          <Grid className={classes.cardMedia}>
            <Grid className={classes.statusMedia}>
              <Chip label="PRO" className={classes.chipStyle}/>
            </Grid>
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
            <Grid style={{display:'flex', flexDirection:'row'}}>
              <Grid style={{width: '50%',display:'flex', flexDirection:'column'}}>
                <Typography variant="body2" color="textSecondary" component="p">
                  Beaute bien être
                </Typography>
                <Grid style={{display:'flex', marginBottom: '2%'}}>
                  <Typography component="p">
                    Coiffure par Maëlis
                  </Typography>
                  <CheckCircleIcon className={classes.checkCircleIcon}/>
                </Grid>
                <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                  <Badge badgeContent={99} color="primary" className={classes.badgeStyle}>
                    <StyledRating name="read-only" value={this.state.value} readOnly className={classes.rating} />
                  </Badge>
                </Box>
              </Grid>
              <Grid style={{width:'50%', display:'flex', flexDirection:'column', alignItems: 'center'}}>
                <Grid style={{display:'flex'}}>
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
              <List dense={this.state.dense} style={{display: 'flex'}}>
                <ListItem style={{padding:0}}>
                  <ListItemIcon style={{minWidth:30}}>
                    <img src={'../../static/assets/img/iconCardAlfred/Diplome.svg'} alt={'Diplome'} title={'Diplome'}/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Diplômé(e)"
                  />
                </ListItem>
                <ListItem style={{padding:0}}>
                  <ListItemIcon  style={{minWidth:30}}>
                    <img src={'../../static/assets/img/iconCardAlfred/Certifié.svg'} alt={'Certifié'} title={'Certifié'}/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Certifié(e)"
                  />
                </ListItem>
                <ListItem style={{padding:0}}>
                  <ListItemIcon  style={{minWidth:30}}>
                    <img src={'../../static/assets/img/iconCardAlfred/experience.svg'} alt={'Expériementé'} title={'Expériementé'}/>
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
