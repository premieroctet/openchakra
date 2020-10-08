import React from 'react';
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import SlideShow from "../../SlideShow/SlideShow";

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
            <Button classes={{root: style.ourAlfredButton}}>Tout Découvrir</Button>
          </Grid>
        </Grid>
        <Grid className={style.categorySlideShowContainer}>
          <SlideShow style={style} type={'alfred'} data={alfred}/>
        </Grid>
      </Grid>

    );
  }
}

export default OurAlfred;
