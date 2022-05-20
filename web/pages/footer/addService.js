import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import LayoutFaq from '../../hoc/Layout/LayoutFaq'
import NeedMoreFaq from '../../hoc/Layout/Faq/NeedMoreFaq'

import DisplayInformation from '../../components/DisplayInformation/DisplayInformation'
const lodash = require('lodash')

const useStyles = makeStyles(theme => ({
  mainContainerAddService: {
    width: '50%',
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}),
)

function AddService({t, i18n}) {
  const classes = useStyles()
  let resources = i18n.getResourceBundle(i18n.language)
  resources = lodash.pickBy(resources, (val, key) => key.startsWith('ADD_SERVICE'))

  return (
    <LayoutFaq>
      <Grid container spacing={3} className={classes.mainContainerAddService}>
        {
          Object.keys(resources).map((res, index) => {
            if(i18n.exists(`ADD_SERVICE_title_${index}`) || i18n.exists(`ADD_SERVICE_text_${index}`)) {
              return(
                <Grid item xs={12}>
                  <DisplayInformation
                    right={index%2 === 0}
                    pics={`custom_addService_${index}`}
                    title={ReactHtmlParser(t(`ADD_SERVICE_title_${index}`))}
                    text={ReactHtmlParser(t(`ADD_SERVICE_text_${index}`))}
                  />
                </Grid>
              )
            }
          })
        }
        <Grid style={{marginTop: '10vh'}}>
          <NeedMoreFaq/>
        </Grid>
      </Grid>
    </LayoutFaq>
  )
}

export default withTranslation('custom')(AddService)
