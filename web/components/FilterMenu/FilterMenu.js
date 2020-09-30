import React from 'react';
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import ScrollMenu from '../ScrollMenu/SrollMenu';

class FilterMenu extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const{style} = this.props;
    return(
      <Grid>
        <Grid>
          <h2>Titre de la categorie</h2>
        </Grid>
        <Grid container>
          <Grid item>
            <Chip label="Statut" />
          </Grid>
          <Grid item>
            <Chip label="Quelle(s) date(e)s ?" />
          </Grid>
        </Grid>
        <Grid>
          <ScrollMenu style={style}/>
        </Grid>
      </Grid>
    );
  }
}

export default FilterMenu
