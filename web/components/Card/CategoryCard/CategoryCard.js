import React from 'react';
import Grid from "@material-ui/core/Grid";
const {circular_get}=require('../../../utils/functions')


class CategoryCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }



  render() {
    const {style, data, start, length} = this.props;

    return(
      <Grid container>
        {data && data.length ? circular_get(Object.keys(data), start, length).map( res => {
          return(
            <Grid item xl={3} lg={3} md={3} key={res} className={style.categoryCardRoot}>
              <Grid className={style.categoryCardMedia}>
                <Grid
                  style={{backgroundImage: `url('${data[res].picture}')`}}
                  className={style.categoryCardBackground}
                />
              </Grid>
              <Grid>
                <h6>{data[res].label}</h6>
              </Grid>
            </Grid>
            )
        }) : null
        }

      </Grid>
    );
  }
}

export default CategoryCard;
