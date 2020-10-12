import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Avatar from "@material-ui/core/Avatar";
const {circular_get}=require('../../../utils/functions')

class CardPreview extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {item, style} = this.props;

          return(
            <>
              <Grid className={style.cardPreviewContainerAvatar}>
                <Avatar alt="Remy Sharp" src={item.user.picture} className={style.cardPreviewLarge} />
              </Grid>
              <Grid className={style.cardPreviewBoxContentContainer}>
                <Grid className={style.cardPreviewBoxContentPosition}>
                  <Grid className={style.cardPreviewContentIdentity}>
                    <Grid>
                      <p className={style.cardPreviewNameAlfred}>{item.user.firstname}</p>
                    </Grid>
                    <Grid>
                      <p className={style.cardPreviewLabelService}>{item.service.label}</p>
                    </Grid>
                  </Grid>
                  <Grid className={style.cardPreviewServiceContent}>
                    <Grid>
                      <p className={style.cardPreviewLabelService}>Lieux</p>
                    </Grid>
                    <Grid>
                      <Box component="fieldset" mb={item.user.score} borderColor="transparent" classes={{root: style.cardPreviewRatingBox}}>
                        <Rating
                          name="simple-controlled"
                          value={item.user.score}
                          max={1}
                          readOnly
                        />
                        <p className={style.cardPreviewLabelService}>({item.user.score})</p>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )
  }
}

export default CardPreview;
