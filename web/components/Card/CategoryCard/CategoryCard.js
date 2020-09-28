import React from 'react';
import Grid from "@material-ui/core/Grid";

class CategoryCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          picsName: 'Animaux',
          text: 'Animaux'
        },
        {
          picsName: 'Administratif',
          text: 'Administratif'
        },
        {
          picsName: 'CoursScolaire',
          text: 'Cours Scolaire'
        },
        {
          picsName: 'Musique',
          text: 'Musique'
        },
        {
          picsName: 'Cuisine',
          text: 'Cuisine'
        },
        {
          picsName: 'Chien',
          text: 'Animaux'
        },
        {
          picsName: 'Automobile',
          text: 'Automobile'
        },
        {
          picsName: 'Plantes',
          text: 'Plantes'
        }
      ]
    }
  }

  render() {
    const {categories} = this.state;
    const {style} = this.props;
    return(
      <Grid container>
        {categories.map( res => {
          return(
            <Grid item xl={3} lg={3} md={3} className={style.categoryCardRoot}>
              <Grid className={style.categoryCardMedia}>
                <Grid
                  style={{backgroundImage: `url(../../../static/assets/img/category/${res.picsName}.png)`}}
                  className={style.categoryCardBackground}
                />
              </Grid>
              <Grid>
                <h6>{res.text}</h6>
              </Grid>
            </Grid>
            )
        })
        }

      </Grid>
    );
  }
}

export default CategoryCard;
