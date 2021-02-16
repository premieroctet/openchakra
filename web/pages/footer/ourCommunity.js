import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";
import styles from '../../static/css/pages/footer/ourCommunity/ourCommunity';
import LayoutFaq from "../../hoc/Layout/LayoutFaq";
import Typography from "@material-ui/core/Typography";

class OurCommunity extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
     <LayoutFaq>
      <Grid container spacing={4} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerApropos}>
          <Grid className={classes.containerWidth}>
            <Grid>
              <h2 style={{textAlign: 'center'}}>Un monde où il fait bon vivre</h2>
            </Grid>
            <Grid>
              <Typography style={{textAlign: 'justify'}}>Chez My Alfred, notre communauté est au coeur de nos préoccupations. Notre priorité est de
                créer un espace où il fait bon vivre dans lequel chacun puisse trouver sa place. Ici, le
                racisme, l’homophobie, le sexisme ou toute autre forme de discrimination n’est pas toléré.
              </Typography>
            </Grid>
            <Grid>
              <Typography style={{textAlign: 'justify'}}>Nous croyons que le silence n’est pas une option et que nous devons faire front. Ensemble,
                nous pouvons nous éduquer et apprendre. Nous pouvons amplifier les voix de ceux qui
                subissent ces injustices et provoquer un vrai changement.
              </Typography>
            </Grid>
            <Grid>
              <Typography style={{textAlign: 'justify'}}>My Alfred soutient les femmes, les personnes de couleur et la communauté LGBTQ+.</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
     </LayoutFaq>
    )
  }
}

export default withStyles(styles)(OurCommunity)
