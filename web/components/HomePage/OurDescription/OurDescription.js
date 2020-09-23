import React from 'react';
import Grid from '@material-ui/core/Grid';

class OurDescription extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const {style} = this.props;
    return(
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
              En mettant en relation des gens talentueux, nous voulons
              créez une communauté où l’on puisse profiter des qualités
              de chacun (et puis surtout rencontrer des gens super sympas).
            </Grid>
            <Grid>
              Que vous cherchiez votre nouveau naturopathe ou que vous
              soyez là pour arrondir vos fins de mois, nous avons vraiment
              hâte de vous rencontrer !
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '3%'}}>
          <Grid style={{width: '30%'}}/>
          <Grid style={{width: '30%', display: 'flex', flexDirection: 'row-reverse'}}>
            <a href={'#'}>En savoir plus</a>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default OurDescription;

