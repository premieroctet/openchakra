import React from 'react';
import Grid from "@material-ui/core/Grid";

class HowItWorks extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid style={{padding: '5%'}}>
        <Grid style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Grid style={{width: '30%'}}>
            <p>En quelques clics,
              réserver le service et la
              personne dont vous avez besoin.
              #MyAlfred.</p>
          </Grid>
          <Grid style={{display: 'flex', flexDirection: 'column', width: '30%'}}>
            <Grid>
              Nous voulons créez une communauté où l’on puisse profiter des qualités de chacun.
              Que vous cherchiez votre futur naturopathe ou que vous soyez là pour arrondir vos fins de mois,
              nous avons hâte de vous rencontrer !
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

}

export default HowItWorks;
