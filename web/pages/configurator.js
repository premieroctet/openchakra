const {is_development} = require('../config/config')
const axios = require('axios')
const {setAxiosAuthentication} = require('../utils/authentication')
const {Button, Grid} = require('@material-ui/core')
const {withTranslation} = require('react-i18next')
const {STEPS} = require('./configurator/configuratorSteps')
import React, {useState, useEffect} from 'react'
const ProgressBar=require('../components/ProgressBar/ProgressBar')
const lodash=require('lodash')

function Configurator(props) {

  const [database, setDatabase]=useState([])
  const [step, setStep]=useState(0)

  const [mark, setMark]=useState(0)
  const [model, setModel]=useState(0)
  const [models, setModels]=useState([])
  const [powers, setPowers]=useState([])

  useEffect(() => {
    setAxiosAuthentication()
    axios.get('/feurst/api/database')
      .then(res => {
        setDatabase(res.data)
      })
      .catch(err => console.error(err))
  })

  useEffect(() => {
    setModels(lodash.uniq(props.database.filter(v => v.mark==mark).map(v => v.model)).sort())
  }, [mark])

  useEffect(() => {
    setPowers(lodash.uniq(machines.filter(v => v.mark==mark && v.model==model).map(v => v.power)).sort())
  }, [model])

  function nextPage() {
    const newStep=Math.min(step+1, STEPS.length-1)
    setStep(newStep)
  }

  function previousPage() {
    const newStep=Math.max(step-1, 0)
    setStep(newStep)
  }

  const {component, validator, menu}=STEPS[step]

  return (
    <Grid style={{width: '80%', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}} classname='configurator'>
      <h6>{/** JSON.stringify(lodash.omit(this.state, 'models')) */}</h6>
      <ProgressBar value={step} max={STEPS.length} />
      <h1>{menu}</h1>
      { component(this) }
      <Grid>
        <Button disabled={step==0} onClick={previousPage}>Précédent</Button>
        <Button disabled={!validator(this)} onClick={nextPage}>Suivant</Button>
      </Grid>
    </Grid>
  )
}

export default withTranslation('custom', {withRef: true})(Configurator)
