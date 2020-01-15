import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './CardPreviewStyle'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Badge from '@material-ui/core/Badge';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemText from '@material-ui/core/ListItemText';
import RoomIcon from '@material-ui/icons/Room';



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

    return (
      <Grid>
        <Card className={classes.card}>
          <div className={classes.cardMedia}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </div>
          <CardContent>
            <Grid style={{display:'flex', flexDirection:'row'}}>
              <Grid style={{width: '50%',display:'flex', flexDirection:'column'}}>
                <Typography variant="body2" color="textSecondary" component="p">
                  Beaute bien être
                </Typography>
                <Grid style={{display:'flex'}}>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Coiffure par Maëlis
                  </Typography>
                  <CheckCircleIcon className={classes.checkCircleIcon}/>
                </Grid>
                <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                  <Badge badgeContent={99} color="primary">
                    <Rating name="read-only" value={this.state.value} readOnly className={classes.rating} />
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
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Diplômé(e)"
                  />
                </ListItem>
                <ListItem style={{padding:0}}>
                  <ListItemIcon  style={{minWidth:30}}>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Certifié(e)"
                  />
                </ListItem>
                <ListItem style={{padding:0}}>
                  <ListItemIcon  style={{minWidth:30}}>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="2 ans d'expérience"
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
