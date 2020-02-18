import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../shop/componentStyle'
import Button from '@material-ui/core/Button';



class AlfredWelcomedMessage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      shop:[],
      stateButton: false,
      newMessage: ""
    };
    this.sendNewContent = this.sendNewContent.bind(this)
  }

  iscontentChange(event){
    if(event.target.value !== this.props.shop.welcome_message){
      this.setState({
        stateButton: !this.state.stateEditButton,
        newMessage: event.target.value
      });
    }else{
      this.setState({stateButton: false})
    }
  }

  sendNewContent(){
    this.setState({stateButton: false});
    this.props.newWelcomedMessage(this.state.newMessage);
  }


  render(){
    const {classes, shop, stateButton} = this.props;

    return (
      <Grid className={classes.contentPosition}>
        <Grid>
          <h3>Message de bienvenue</h3>
        </Grid>
        <Grid className={classes.containerPositionWelcome}>
          <Grid className={stateButton.stateEditButton ? classes.responsiveContentWelcomePosition: classes.contentWelcomePosition}>
            <Grid className={classes.responsiveImgContent}>
              <img src={'../../static/assets/img/iconCardAlfred/Castor applaudit.svg'} alt={'fatCastor'} title={'fatCastor'} className={classes.imgFatCastor}/>
            </Grid>
            <Grid className={classes.texfieldContentWelcomedMessage}>
              <TextField
                id="outlined-multiline-static"
                label="Message de bienvenue"
                multiline
                rows="4"
                defaultValue={shop.welcome_message}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                inputProps={{readOnly: !stateButton.stateEditButton}}
                onChange={(e)=>{
                  this.iscontentChange(e)
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {stateButton.stateEditButton ?
              <Grid>
                <Button disabled={!this.state.stateButton} color={"primary"} variant={"contained"} onClick={this.sendNewContent}>
                  Valider
                </Button>
              </Grid>: null
            }

          </Grid>
        </Grid>
      </Grid>
    )
  }
}

AlfredWelcomedMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(AlfredWelcomedMessage);
