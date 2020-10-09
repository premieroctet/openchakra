import React from 'react';
import Grid from "@material-ui/core/Grid";

class CategoryCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }



  render() {
    const {style, category, start, end} = this.props;

    return(
      <Grid container spacing={2}>
        {category ? Object.keys(category).slice(start,end).map( (res, index) => {
          return(
            <Grid item xl={3} lg={3} md={4} sm={6} key={index} className={style.categoryCardRoot}>
              <Grid className={style.categoryCardMedia}>
                <Grid
                  style={{backgroundImage: `url(${category[res].picture})`}}
                  className={style.categoryCardBackground}
                />
              </Grid>
              <Grid>
                <h6>{category[res].label}</h6>
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
