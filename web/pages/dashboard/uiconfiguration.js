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
import HtmlEditor from '../../components/Editor/HtmlEditor2'
import NoSSR from 'react-no-ssr'
import Checkbox from '@material-ui/core/Checkbox'

const styles = () => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
})

class Parameter extends React.Component {

  render = () => {
    const {value, onChange}=this.props
    return (
      <NoSSR>
        <div style={{width: '80%'}}>
          <div>{value.label}</div>
          { value.type=='color' && <ColorPicker value={value.value || ''} onChange={onChange} /> }
          { value.type=='text' && <HtmlEditor value={value.value} onChange={onChange} /> }
          { value.type=='visibility' && <Checkbox checked={Boolean(value.value)} onChange={(ev, checked) => onChange(checked? 'true' : null)} /> }
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

  onChange = parameter_id => value => {
    const {parameters}=this.state
    const p=parameters.find(p => p._id ==parameter_id)
    console.log(`onChange:${p.label}=>${value}`)
    p.value = value
    setAxiosAuthentication()
    axios.put(`/myAlfred/api/admin/uiConfiguration/${p._id}`, p)
      .then(() => {
        this.setState({parameters: parameters})
      })
      .catch(error => {
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
