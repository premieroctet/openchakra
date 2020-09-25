import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FacebookIcon from '@material-ui/icons/Facebook';
import {NEWS_LETTER} from '../../../utils/i18n';

class NewsLetter extends React.Component{
  constructor(props) {
    super(props);
  }

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
            <Grid className={style.newsLetterContainer}>
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
            </Grid>
            <Grid className={style.newsLetterContainer}>
              <Grid>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  classes={{root: style.newsLetterTextField}}
                  InputLabelProps={{ shrink: false }}
                />
              </Grid>
            </Grid>
            <Grid className={style.newsLetterContainer}>
              <Grid>
                <Button variant={'outlined'} classes={{root : style.newsLetterButton}}>{NEWS_LETTER.button}</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default NewsLetter;
