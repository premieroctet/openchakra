import React from 'react';
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import ScrollMenu from '../ScrollMenu/SrollMenu';

class FilterMenu extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const{style, categories, gps} = this.props;
    return(
      <Grid>
        <Grid className={style.filterMenuTitleContainer}>
          <h2>Titre de la categorie</h2>
        </Grid>
        <Grid container className={style.filterMenuChipContainer}>
          <Grid item>
            <Chip label="Statut" />
          </Grid>
          <Grid item>
            <Chip label="Quelle(s) date(e)s ?" />
          </Grid>
        </Grid>
        <Grid className={style.filterMenuScrollMenuContainer}>
          <ScrollMenu style={style} categories={categories} gps={gps}/>
        </Grid>
      </Grid>
    );
  }
}

export default FilterMenu
