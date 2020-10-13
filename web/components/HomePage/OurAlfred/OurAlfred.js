import React from 'react';
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/Star";
import Router from 'next/router'
import Button from "@material-ui/core/Button";
import withSlide from '../../../hoc/Slide/SlideShow';
import withGrid from '../../../hoc/Grid/GridCard'
import CardPreview from "../../Card/CardPreview/CardPreview";

const AlfredSlide=withSlide(withGrid(CardPreview))

class OurAlfred extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const{style, alfred} = this.props;
    return(
      <Grid className={style.ourAlfredMainStyle}>
        <Grid className={style.ourAlfredMainContainer}>
          <Grid className={style.ourAlfredMainHeader}>
            <Grid className={style.ourAlfredImgContainer}>
              <img src={'/static/assets/icon/light.png'} alt={'iconStar'} title={'iconStar'}/>
            </Grid>
            <Grid className={style.ourAlfredTextContainer}>
              <Grid>
                <p className={style.ourAlfredTitle}>Nos Alfred</p>
              </Grid>
              <Grid>
                <p className={style.ourAlfredSubtitle}>Découvrez les profils de nos Alfred</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Button classes={{root: style.ourAlfredButton}} onClick={() => Router.push('/search?search=1')}>Tout découvrir</Button>
          </Grid>
        </Grid>
        <Grid className={style.categorySlideShowContainer}>
          <AlfredSlide style={style} data={alfred} columns={3} rows={1}/>
        </Grid>
      </Grid>

    );
  }
}

export default OurAlfred;
