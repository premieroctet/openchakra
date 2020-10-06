import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Avatar from "@material-ui/core/Avatar";


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
    const {style, alfred, start, end} = this.props;

    return (
      <Grid container>
        {alfred ? Object.keys(alfred).slice(start, end).map(e => {
          return(
            <Grid item xl={4} lg={4} md={4} className={style.cardPreviewMainStyle}>
              <Grid className={style.cardPreviewContainerAvatar}>
                <Avatar alt="Remy Sharp" src={alfred[e].user.picture} className={style.cardPreviewLarge} />
              </Grid>
              <Grid className={style.cardPreviewBoxContentContainer}>
                <Grid className={style.cardPreviewBoxContentPosition}>
                  <Grid className={style.cardPreviewContentIdentity}>
                    <Grid>
                      <p className={style.cardPreviewNameAlfred}>{alfred[e].user.firstname}</p>
                    </Grid>
                    <Grid>
                      <p className={style.cardPreviewLabelService}>{alfred[e].service.label}</p>
                    </Grid>
                  </Grid>
                  <Grid className={style.cardPreviewServiceContent}>
                    <Grid>
                      <p className={style.cardPreviewLabelService}>Lieux</p>
                    </Grid>
                    <Grid>
                      <Box component="fieldset" mb={alfred[e].user.score} borderColor="transparent" classes={{root: style.cardPreviewRatingBox}}>
                        <Rating
                          name="simple-controlled"
                          value={alfred[e].user.score}
                          max={1}
                          readOnly
                        />
                        <p className={style.cardPreviewLabelService}>({alfred[e].user.score})</p>
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
