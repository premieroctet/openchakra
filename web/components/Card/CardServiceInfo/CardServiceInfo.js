import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default class CardServiceInfo extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const{style} = this.props;

    return (
      <Grid>
        <Paper elevation={1} className={style.cardServiceInfoPaper}>
          <Grid className={style.cardServiceInfoContent}>
            <Grid>
              <h2>Besoin d'aide ?</h2>
            </Grid>
            <Grid>
              <p>Utiliser notre chat en direct !</p>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

    );
  }
}
