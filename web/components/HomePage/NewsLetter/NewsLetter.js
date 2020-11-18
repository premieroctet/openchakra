import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FacebookIcon from '@material-ui/icons/Facebook';
import {NEWS_LETTER} from '../../../utils/i18n';
import axios from 'axios';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import styles from '../../../static/css/components/NewsLetter/NewsLetter'
import withStyles from "@material-ui/core/styles/withStyles";

class NewsLetter extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      email: ''
    }
  }

  sendSubscription = () =>{
    const user = {
      EMAIL: this.state.email,
      locale: 'fr',
      email_address_check: ''
    };
    axios.post('https://cef7ace9.sibforms.com/serve/MUIEAMozm6936onrqiPaove-mb4-eZhjKq9N50iJ7FVKRVk4NFAVimF-eRdZmyw9XmVuQh9ItQdDfS1NJLu11EDcUGdHWDoNY13qixwVVhV1R_OjaeI5i5iVjN7Jl86BzlIwoqHgutCV84BudSu-zdJ1Jrq0dAHZBFarwabS9kqbbKhRu9hK2T5XHv6cw8K5NdVf1hkL_BMB3hy7',
      user, {headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',"Accept": "*/*"
        }})
      .then( res => {console.log(res)}).catch((error) => console.log(error) );
  };

  handleOnchange = (event) =>{
    this.setState({[event.target.name]: event.target.value})
  };

  render() {
    const {classes} = this.props;
    return (
      <Grid className={classes.newsLetterMainStyle}>
        <Grid className={classes.newsLetterMainContainer}>
          <Grid className={classes.newsLetterLeftContainer}>
            <Grid>
              <h2 className={classes.newsLetterTitle}>{NEWS_LETTER.title}</h2>
            </Grid>
            <Grid>
              <p className={classes.newsLetterSubTitle}>{NEWS_LETTER.text}</p>
            </Grid>
          </Grid>
          <Grid className={classes.newsLetterRightContainer}>
            {/****TODO when googleAuth avail <Grid className={style.newsLetterContainer}>
              <Button
                variant="outlined"
                classes={{root : style.newsLetterButtonGoogle}}
                startIcon={<FacebookIcon />}
              >
                {NEWS_LETTER.google}
              </Button>
            </Grid>
            <Grid >
              <p className={style.newsLetterText}>{NEWS_LETTER.where}</p>
            </Grid>***/}
            <Grid className={classes.newsLetterContainer}>
              <Grid>
                <TextField
                  id="outlined-basic"
                  placeholder="Email"
                  variant="outlined"
                  name="email"
                  classes={{root: classes.newsLetterTextField}}
                  InputLabelProps={{ shrink: false }}
                  onChange={this.handleOnchange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" >
                        <EmailIcon className={classes.newsLetterEmailIcon}/>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid className={classes.newsLetterContainer}>
              <Grid>
                <Button style={{ width: '100%'}} variant={'outlined'} classes={{root : classes.newsLetterButton}} onClick={this.sendSubscription}>{NEWS_LETTER.button}</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles (styles) (NewsLetter);
