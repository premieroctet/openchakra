import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Avatar from "@material-ui/core/Avatar";
const {circular_get}=require('../../../utils/functions')

class CardPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: null,
      service: [],
      alfred: null,
    };
  }

  render() {
    const {style, data, start, length} = this.props;

    return (
      <Grid container>
        {data && data.length>0 ? circular_get(Object.keys(data), start, length).map(e => {
          return(
            <Grid item xl={4} lg={4} md={4} key={e} className={style.cardPreviewMainStyle}>
              <Grid className={style.cardPreviewContainerAvatar}>
                <Avatar alt="Remy Sharp" src={data[e].user.picture} className={style.cardPreviewLarge} />
              </Grid>
              <Grid className={style.cardPreviewBoxContentContainer}>
                <Grid className={style.cardPreviewBoxContentPosition}>
                  <Grid className={style.cardPreviewContentIdentity}>
                    <Grid>
                      <p className={style.cardPreviewNameAlfred}>{data[e].user.firstname}</p>
                    </Grid>
                    <Grid>
                      <p className={style.cardPreviewLabelService}>{data[e].service.label}</p>
                    </Grid>
                  </Grid>
                  <Grid className={style.cardPreviewServiceContent}>
                    <Grid>
                      <p className={style.cardPreviewLabelService}>Lieux</p>
                    </Grid>
                    <Grid>
                      <Box component="fieldset" mb={data[e].user.score} borderColor="transparent" classes={{root: style.cardPreviewRatingBox}}>
                        <Rating
                          name="simple-controlled"
                          value={data[e].user.score}
                          max={1}
                          readOnly
                        />
                        <p className={style.cardPreviewLabelService}>({data[e].user.score})</p>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
        }) : null}
      </Grid>

    );
  }
}

export default CardPreview;
