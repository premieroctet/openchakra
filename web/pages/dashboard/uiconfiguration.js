import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Layout from '../../hoc/Layout/Layout'
import {Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import _ from 'lodash'
import ColorPicker from '../../components/Editor/ColorPicker'
const {setAxiosAuthentication} = require('../../utils/authentication')
import HtmlEditor from '../../components/Editor/HtmlEditor'
import Visibility from '../../components/Editor/Visibility'
import NoSSR from 'react-no-ssr'

const styles = () => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
})

const TITLES={
  'background-color': 'Couleur de fond',
  'color': 'Couleur du texte',
  'display': 'Afficher',
  'contents': 'Texte',
}

const ATTRIBUTES={
  'component': [['color', 'color'], ['background-color', 'color'], ['display', 'visibility'], ['contents', 'text']],
  'button': [['color', 'color'], ['background-color', 'color'], ['display', 'visibility'], ['contents', 'text']],
}

class Parameter extends React.Component {

  render = () => {
    const {value, onChange}=this.props
    console.log(`Parameter:value is ${JSON.stringify(value)}`)
    const attributes=ATTRIBUTES[value.type]
    return (
      <NoSSR>
        <div style={{width: '80%'}}>
          <div>{value.label}</div>
          {
            attributes.map(att => {
              const [att_name, att_type] = att
              const pAtt=value.attributes.find(a => a.name==att_name) || {value: ''}
              switch (att_type) {
                case 'color': return <ColorPicker title={TITLES[att_name]} value={pAtt.value} onChange={onChange(att_name)} />
                case 'text': return <HtmlEditor title={TITLES[att_name]} value={pAtt.value} onChange={onChange(att_name)} />
                case 'visibility': return <Visibility title={TITLES[att_name]} value={pAtt.value} onChange={onChange(att_name)} />
                default: return null
              }
            })
          }
        </div>
      </NoSSR>
    )
  }
}

class UIParameters extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      parameters: [],
    }
  }

  getTitle = () => {
    return 'Paramétrage UI'
  }

  componentDidMount = () => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/admin/uiConfiguration')
      .then(response => {
        let parameters=response.data
        this.setState({parameters: parameters})
      })
  }

  onChange = parameter_id => att_name => value => {
    const {parameters}=this.state
    const p=parameters.find(p => p._id ==parameter_id)
    console.log(`onChange:${p.label}/${att_name}=>${value}`)
    let attr = p.attributes.find(a => a.name==att_name)
    if (attr) {
      attr.value=value
    }
    else {
      p.attributes.push({name: att_name, value: value})
    }
    setAxiosAuthentication()
    axios.put(`/myAlfred/api/admin/uiConfiguration/${p._id}`, p)
      .then(() => {
        this.setState({parameters: parameters})
      })
      .catch(err => {
        console.error(err)
      })
  }

  render = () => {
    const {classes}=this.props
    const {parameters}=this.state
    const groupedParameters= _.groupBy(parameters, 'page')

    return (
      <Layout>
        <Grid container className={classes.signupContainer} style={{width: '100%'}}>
          <Grid item style={{display: 'flex', justifyContent: 'center'}}>
            <Typography style={{fontSize: 30}}>{this.getTitle()}</Typography>
          </Grid>
          <Paper style={{width: '100%'}}>
            {
              Object.keys(groupedParameters).map(page => {
                const params=groupedParameters[page]
                return (
                  <>
                    <h1>Page {page}</h1>
                    {
                      params.map(p =>
                        <Parameter value={p} onChange={this.onChange(p._id)}/>,
                      )
                    }
                  </>
                )
              })
            }
          </Paper>
        </Grid>
      </Layout>
    )
  }

}

export default withStyles(styles)(UIParameters)
