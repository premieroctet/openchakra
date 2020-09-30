import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FacebookIcon from '@material-ui/icons/Facebook';
import {NEWS_LETTER} from '../../../utils/i18n';
import axios from 'axios';


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
    const {style} = this.props;
    return (
      <Grid className={style.newsLetterMainStyle}>
        <Grid className={style.newsLetterMainContainer}>
          <Grid className={style.newsLetterLeftContainer}>
            <Grid>
              <p className={style.newsLetterTitle}>{NEWS_LETTER.title}</p>
            </Grid>
            <Grid>
              <p className={style.newsLetterSubTitle}>{NEWS_LETTER.text}</p>
            </Grid>
          </Grid>
          <Grid className={style.newsLetterRightContainer}>
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
            <Grid className={style.newsLetterContainer}>
              <Grid>
                <TextField
                  id="outlined-basic"
                  placeholder="Email"
                  variant="outlined"
                  name="email"
                  classes={{root: style.newsLetterTextField}}
                  InputLabelProps={{ shrink: false }}
                  onChange={this.handleOnchange}
                />
              </Grid>
            </Grid>
            <Grid className={style.newsLetterContainer}>
              <Grid>
                <Button variant={'outlined'} classes={{root : style.newsLetterButton}} onClick={this.sendSubscription}>{NEWS_LETTER.button}</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default NewsLetter;
