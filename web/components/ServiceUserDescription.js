import {Divider, Grid, Typography} from '@material-ui/core'
import {withTranslation} from 'react-i18next'
import ReactHtmlParser from 'react-html-parser'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import React from 'react'
import {formatDeadline} from '../utils/text'
import CustomIcon from './CustomIcon/CustomIcon'
import ListAlfredConditions from './ListAlfredConditions/ListAlfredConditions'
import CustomListGrades from './CustomListGrades/CustomListGrades'

const ServiceUserDescription = ({t, classes, serviceUser, insurance, alfred, flexible, moderate}) => {

  const listCondition = [
    {
      label: alfred.firstname ? ReactHtmlParser(t('USERSERVICEPREVIEW.topic_list_label')) : '',
      summary: alfred.firstname ? alfred.firstname + ReactHtmlParser(t('USERSERVICEPREVIEW.topic_list_summary')) + formatDeadline(serviceUser.deadline_before_booking) + ReactHtmlParser(t('USERSERVICEPREVIEW.topic_list_summary_end')) : '',
      IconName: alfred.firstname ? <CustomIcon className={'custompreviewsmiley'} style={{height: 35, width: 35, backgroundSize: 'contain'}} materialIcon={<InsertEmoticonIcon fontSize="large"/> }/> : '',
    },
    {
      label: alfred.firstname ? ReactHtmlParser(t('USERSERVICEPREVIEW.topic_list_condition_label')) : '',
      summary: alfred.firstname ? alfred.firstname + ReactHtmlParser(t('USERSERVICEPREVIEW.topic_list_condition_summary')) + flexible ? ReactHtmlParser(t('USERSERVICEPREVIEW.one_day')) : moderate ? `${
        ReactHtmlParser(t('USERSERVICEPREVIEW.five_days'))}` : ReactHtmlParser(t('USERSERVICEPREVIEW.ten_days')) + ReactHtmlParser(t('USERSERVICEPREVIEW.before_end_date')) : '',
      IconName: alfred.firstname ? <CustomIcon className={'custompreviewcalendar'} style={{height: 35, width: 35, backgroundSize: 'contain'}} materialIcon={<CalendarTodayIcon fontSize="large"/>}/> : '',
    },
    {
      label: alfred.firstname ? ReactHtmlParser(t('USERSERVICEPREVIEW.minimum_basket')) : '',
      summary: alfred.firstname ? ReactHtmlParser(t('USERSERVICEPREVIEW.minimum_basket_of', {firstname: alfred.firstname, minimum_basket: serviceUser.minimum_basket})) : '',
      IconName: alfred.firstname ? <CustomIcon className={'custompreviewshopping'} style={{height: 35, width: 35, backgroundSize: 'contain'}} materialIcon={<ShoppingCartIcon fontSize="large"/>}/> : '',
    },
  ]

  return (
    <Grid className={classes.overrideCssChild}>
      <Grid style={{width: '100%'}}>
        <Grid>
          <h3>{ReactHtmlParser(t('USERSERVICEPREVIEW.topic_description'))}</h3>
        </Grid>
        <Grid>
          <Typography style={{color: 'rgba(39,37,37,35%)'}}>
            {serviceUser.description ? description : ReactHtmlParser(t('USERSERVICEPREVIEW.topic_description_summary'))}
          </Typography>
        </Grid>
        <Grid>
          <CustomListGrades grade={serviceUser.grade_text} insurance={insurance}/>
        </Grid>
        <Grid style={{marginTop: '2%'}}>
          <Divider className={`customtopicdivider ${classes.topicDivider}`}/>
        </Grid>
        <Grid className={`customuserpreviewboxcustom ${classes.boxCustom}`}>
          <ListAlfredConditions
            columnsXl={12}
            columnsLG={12}
            columnsMD={12}
            columnsSM={12}
            columnsXS={12}
            wrapperComponentProps={listCondition}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withTranslation('custom', {withRef: true})(ServiceUserDescription)
