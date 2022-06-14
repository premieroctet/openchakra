
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import DevLog from '../DevLog'
import styles from '../../static/css/components/InfoWithPics/InfoWithPics'


class InfoWithPics extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {data, equipmentsSelected, classes} = this.props

    return (
      <Grid>
        {
          data ?
            <Grid className={classes.infoWithPicsMainContainer}>
              {
                data.IconName ?
                  <Grid className={classes.infoWithPicsMarginRight}>
                    {data.IconName}
                  </Grid> :
                  data.label && data.logo ?
                    <Grid className={classes.infoWithPicsMarginRight}>
                      <img
                        style={{
                          opacity: equipmentsSelected ? !equipmentsSelected.includes(data._id) ? 0.2 : 1 : 1,
                        }}
                        src={`/static/equipments/${data.logo}`}
                        alt={data.label}
                        className={classes.picsSize}
                      />
                    </Grid> : null
              }
              {
                data.label || data.summary ?
                  <Grid className={classes.containerListIcon}>
                    {
                      data.label ?
                        <Grid>
                          <h4
                            style={{
                              margin: 0,
                              textDecoration: equipmentsSelected ? !equipmentsSelected.includes(data._id) ? 'line-through' : 'none' : 'none',
                              opacity: equipmentsSelected ? !equipmentsSelected.includes(data._id) ? 0.2 : 1 : 1,
                            }}
                          >
                            {data.label}
                          </h4>
                        </Grid> : null
                    }
                    {
                      data.summary ?
                        <Grid>
                          <Typography
                            className={classes.infoWithPicsColorText}>{data.summary}</Typography>
                        </Grid> : null
                    }
                  </Grid> : null
              }
            </Grid> : null
        }

      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(InfoWithPics))
