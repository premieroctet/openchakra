import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {BECOME_ALFRED} from '../../../utils/i18n';

class BecomeAlfred extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    const {style} = this.props;
    return(
      <Grid className={style.becomeAlfredMainContainer}>
        <Grid className={style.becomeAlfredContainer}>
          <Grid>
            <p className={style.becomeAlfredTitle}>{BECOME_ALFRED.title}</p>
          </Grid>
          <Grid>
            <p className={style.becomeAlfredText}>{BECOME_ALFRED.text}</p>
          </Grid>
          <Grid>
            <Button variant={'contained'} className={style.becomeAlfredButton}>{BECOME_ALFRED.button}</Button>
          </Grid>
        </Grid>
        <Grid/>
      </Grid>
    );
  }
}

export default BecomeAlfred;
