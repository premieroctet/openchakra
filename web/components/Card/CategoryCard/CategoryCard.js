import React from 'react';
import Grid from "@material-ui/core/Grid";
const {circular_get}=require('../../../utils/functions')


class CategoryCard extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {
    const {style, item} = this.props;

    return(
      <>
        <Grid className={style.categoryCardMedia}>
          <Grid
            style={{backgroundImage: `url('${item.picture}')`}}
            className={style.categoryCardBackground}
          />
        </Grid>
        <Grid><h6>{item.label}</h6></Grid>
      </>
    )
  }

}

export default CategoryCard;
