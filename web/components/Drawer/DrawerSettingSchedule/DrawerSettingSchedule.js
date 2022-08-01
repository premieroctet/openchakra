import CustomButton from '../../CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import frLocale from 'date-fns/locale/fr'
import Chip from '@material-ui/core/Chip'
import {DAYS} from '../../../utils/converters'
import SelectSlotTimer from '../../SelectSlotTimer/SelectSlotTimer'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './DrawerSettingScheduleStyle'
import axios from 'axios'

import {DRAWER_SETTING_SCHEDULE} from '../../../utils/i18n'

const {timelapsesSetToArray} = require('../../../utils/dateutils')

function DrawerSettingSchedule(props) {
  const {onAvailabilityChanged, classes, t, handleDrawer} = props
  const [availabilities, setAvailabilities] = useState([])
  const [expanded, setExpanded] = useState([])
  const [errors, setErrors]= useState({})

  function loadAvailabilities() {
    axios.get('/myAlfred/api/availability/currentAlfred')
      .then(response => {
        const availabilities = response.data.filter(a => !a.is_punctual).map(a => {
          return {
            _id: a._id,
            startDate: new Date(a.period.begin),
            endDate: new Date(a.period.end),
            recurrDays: new Set(a.period.days),
            timelapses: a.timelapses,
            as_text: a.as_text,
          }
        })
        setAvailabilities(availabilities)
        setExpanded(Array.from({length: availabilities.length}, () => false))
      })
      .catch(err => console.error(err))
  }
   

  useEffect(() => {
    loadAvailabilities()
  }, [])

  function addRecurrDay(day, availIdx) {
    let newAvailabilities = [...availabilities]
    newAvailabilities[availIdx].recurrDays.add(day)
    setAvailabilities(newAvailabilities)
  }

  function removeRecurrDay(day, availIdx) {
    let newAvailabilities = [...availabilities]
    newAvailabilities[availIdx].recurrDays.delete(day)
    setAvailabilities(newAvailabilities)
  }
  
  function toggleRecurrDay(dayIndex, availIdx) {
    if(availabilities[availIdx].recurrDays.has(dayIndex)) {
      removeRecurrDay(dayIndex, availIdx)
    }
    else{
      addRecurrDay(dayIndex, availIdx)
    }
  }

  function addAvailability() {
    let newAvailability = {
      _id: null,
      startDate: null,
      endDate: null,
      recurrDays: new Set(),
      timelapses: [],
      as_text: '',
    }
    availabilities.push(newAvailability)
    const expandedArray = Array.from({length: expanded.length}, () => false)
    expandedArray.push(true)
    setAvailabilities(availabilities)
    setExpanded(expandedArray)
  }

  const handleDateStart = index => date => {
    let newArray = [...availabilities]
    newArray[index] = {...newArray[index], startDate: date}
    setAvailabilities(newArray)
  }

  const handleDateEnd = index => date => {
    let newArray = [...availabilities]
    newArray[index] = {...newArray[index], endDate: date}
    setAvailabilities(newArray)
  }

  function removeAvailability(index) {
    const availability = availabilities[index]
    if (availability._id) {
      axios.delete(`/myAlfred/api/availability/${availability._id}`)
        .then(() => {
          onAvailabilityChanged ? onAvailabilityChanged() : () => {}
        })
    }
    loadAvailabilities()
  }

  const slotTimerChanged = availIdx => slotIndex => {
    let newAvail = [...availabilities]
    let tlSet =new Set([...newAvail[availIdx].timelapses])
    if (tlSet.has(slotIndex)) {
      tlSet.delete(slotIndex)
    }
    else {
      tlSet.add(slotIndex)
    }
    newAvail[availIdx].timelapses = [...tlSet]
    setAvailabilities(newAvail)
  }


  function save(index) {
    const availability = availabilities[index]
    axios.post('/myAlfred/api/availability/addRecurrent', {
      _id: availability._id,
      available: true,
      startDate: availability.startDate,
      endDate: availability.endDate,
      days: [...availability.recurrDays],
      timelapses: [...availability.timelapses],
    })
      .then(() => {
        let newArr = errors
        newArr[index] = {}
        setErrors(newArr)
        onAvailabilityChanged ? onAvailabilityChanged() : () => {}
        loadAvailabilities()
      })
      .catch(err => {
        let newArr = errors
        newArr[index] = err.response.data
        setErrors(newArr)
      })
  }


  function saveEnabled(availIdx) {
    const availability = availabilities[availIdx]
    if (availability.recurrDays.size === 0) {
      return false
    }
    if (availability.timelapses.length === 0) {
      return false
    }

    if (!availability.startDate || isNaN(availability.startDate.valueOf())) {
      return false
    }
    if (!availability.endDate || isNaN(availability.endDate.valueOf())) {
      return false
    }
    return true
  }

  function addPeriodEnabled() {
    const unsaved = availabilities.some(a => !a._id)
    return !unsaved
  }

  const onAccordionChange = availIdx => exp => {
    let newExpand = expanded
    newExpand[availIdx] = exp
    setExpanded(newExpand)
  }
    
  return(
    <Grid>
      <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Grid>
          <h2 className={'customschedulesettingtitle'}>{ReactHtmlParser(t('DRAWER_SETTING_SCHEDULE.title'))}</h2>
        </Grid>
        <Grid>
          <IconButton aria-label="CLOSE">
            <CloseIcon classes={{root: classes.cancelButton}} onClick={handleDrawer}/>
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <Grid style={{marginTop: '5vh'}}>
        {
          availabilities.map((availResult, availIdx) => {
            const error = errors[availIdx] || {}
            return(
              <Accordion key={availIdx} expanded={expanded[availIdx]} onChange={onAccordionChange(availIdx)} className={'customdrawersettingaccordion'}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={availIdx}
                >
                  <Grid>
                    <Typography>{ availResult.as_text }</Typography>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid style={{width: '100%'}}>
                    <Grid className={'customsettingscheduledelaycont'}>
                      <h3>{ReactHtmlParser(t('DRAWER_SETTING_SCHEDULE.period'))}</h3>
                    </Grid>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale} className={'customsettingscheduledelaycont'}>
                      <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                          <Grid>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="dd/MM/yyyy"
                              id="date-picker-inline"
                              label={ReactHtmlParser(t('DRAWER_SETTING_SCHEDULE.begin_date'))}
                              className={classes.formSchedule}
                              value={availResult.startDate}
                              onChange={handleDateStart(availIdx)}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                              autoOk={true}
                            />
                          </Grid>
                          <Grid>
                            <em style={{color: 'red'}}>{ error.startDate}</em>
                          </Grid>
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                          <Grid>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="dd/MM/yyyy"
                              id="date-picker-inline"
                              label={ReactHtmlParser(t('DRAWER_SETTING_SCHEDULE.end_date'))}
                              className={classes.formSchedule}
                              value={availResult.endDate}
                              onChange={handleDateEnd(availIdx)}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                              autoOk={true}
                            />
                          </Grid>
                          <Grid>
                            <em style={{color: 'red'}}>{ error.endDate}</em>
                          </Grid>
                        </Grid>
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid>
                      <h3 className={'customsettingscheduledaytitle'}>{ReactHtmlParser(t('DRAWER_SETTING_SCHEDULE.day_work'))}</h3>
                    </Grid>
                    <Grid container className={classes.panelFormDays}>
                      {DAYS.map((res, index) => {
                        return (
                          <Chip
                            key={index}
                            clickable
                            label={res.charAt(0)}
                            className={availabilities[availIdx].recurrDays.has(index) ? `customscheduleactive ${classes.textFieldChipsActive}` : `customschedulehover ${classes.textFieldChips}`}
                            onClick={() => toggleRecurrDay(index, availIdx)}
                          />
                        )
                      })}
                    </Grid>
                    <em style={{color: 'red'}}>{ error.days}</em>
                    <Grid>
                      <Grid>
                        <h3 className={'customsettingschedulehourstitle'}>{ReactHtmlParser(t('DRAWER_SETTING_SCHEDULE.hour_work'))}</h3>
                        <em style={{color: 'red'}}>{ error.timelapses}</em>
                      </Grid>
                      <Grid container>
                        { 'Nuit Matin Après-midi Soirée'.split(' ').map((title, index) => {
                          return (
                            <Grid key={index} item xl={6} lg={6} md={6} sm={12} xs={12}>
                              <Grid>
                                <h4>{title}</h4>
                              </Grid>
                              <Grid container item xl={6} lg={9} md={11} sm={7} xs={12}>
                                <SelectSlotTimer
                                  arrayLength={6}
                                  index={index*6}
                                  slots={timelapsesSetToArray(availabilities[availIdx].timelapses)}
                                  bookings={{}}
                                  onChange={slotTimerChanged(availIdx)}
                                />
                              </Grid>
                            </Grid>
                          )
                        })
                        }
                      </Grid>
                    </Grid>
                    <Grid style={{marginTop: 20}}>
                      <Grid style={{display: 'flex', flexDirection: 'row-reverse'}}>
                        <CustomButton classes={{root: 'customschedulesaveperiod'}} disabled={!saveEnabled(availIdx)} variant={'contained'} color={'primary'} style={{color: 'white', textTransform: 'initial', fontWeight: 'bold'}} onClick={ ev => save(availIdx, ev) }>{ReactHtmlParser(t('DRAWER_SETTING_SCHEDULE.save_button'))}</CustomButton>
                        <CustomButton classes={{root: `customscheduledeletebutton ${classes.cancelButton}`}} style={{marginRight: 10, textTransform: 'initial', fontWeight: 'bold'}} onClick={() => removeAvailability(availIdx)}>{ReactHtmlParser(t('DRAWER_SETTING_SCHEDULE.delete_button'))}</CustomButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            )
          })
        }
      </Grid>
      <Divider/>
      <Grid className={classes.marginSaveButton}>
        <Grid style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <CustomButton
            disabled={!addPeriodEnabled()}
            variant={'contained'}
            color={'primary'}
            classes={{root: 'customscheduleaddperiod'}}
            style={{color: 'white', textTransform: 'initial', fontWeight: 'bold'}}
            onClick={addAvailability}
          >{ReactHtmlParser(t('DRAWER_SETTING_SCHEDULE.add_period'))}
          </CustomButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withTranslation(null, {withRef: true})(withStyles(styles, {withTheme: true})(DrawerSettingSchedule))
