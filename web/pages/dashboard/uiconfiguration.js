import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Layout from '../../hoc/Layout/Layout'
import {Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
const {setAxiosAuthentication} = require('../../utils/authentication')
import axios from 'axios'
import _ from 'lodash'
import UIParameter from '../../components/Editor/UIParameter'

const styles = () => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
})

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
                        <UIParameter value={p} onChange={this.onChange(p._id)}/>,
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
