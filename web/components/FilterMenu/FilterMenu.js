import React from 'react';
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';

class FilterMenu extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const{style} = this.props;
    return(
      <Grid>
        <Grid className={style.filterMenuTitleContainer}>
          <Grid>
            <Grid>
              <h2>Titre de la categorie</h2>
            </Grid>
            <Grid>
              <p>Description</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={style.filterMenuChipContainer}>
          <Grid item>
            <Chip label="Statut" />
          </Grid>
          <Grid item>
            <Chip label="Quelle(s) date(e)s ?" />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default FilterMenu
