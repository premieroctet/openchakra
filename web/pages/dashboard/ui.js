import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Layout from '../../hoc/Layout/Layout'
import {Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import _ from 'lodash'
import ColorPicker from '../../components/Editor/ColorPicker'
import HtmlEditor from '../../components/Editor/HtmlEditor'

const styles = () => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
})


class Parameter extends React.Component {

  render = () => {
    const {value}=this.props
    return (
      <>
        <div>{value.label}</div>
        { value.type=='color' && <ColorPicker value={value.color_value} /> }
        { value.type=='text' && <HtmlEditor value={value.color_value} /> }
      </>
    )
  }
}

class UIParameters extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      parameters: {},
    }
  }

  getTitle = () => {
    return 'Paramétrage UI'
  }

  componentDidMount = () => {
    axios.get('/myAlfred/api/admin/uiConfiguration')
      .then(response => {
        let parameters=response.data
        parameters=_.groupBy(parameters, 'page')
        this.setState({parameters: parameters})
        console.log(`Got ${Object.entries(parameters)[0]}`)
      })
  }

  render = () => {
    const {classes}=this.props
    const {parameters}=this.state

    return (
      <Layout>
        <Grid container className={classes.signupContainer} style={{width: '100%'}}>
          <Grid item style={{display: 'flex', justifyContent: 'center'}}>
            <Typography style={{fontSize: 30}}>{this.getTitle()}</Typography>
          </Grid>
          <Paper style={{width: '100%'}}>
            {
              Object.keys(parameters).map(page => {
                const params=parameters[page]
                return (
                  <>
                    <h1>Page {page}</h1>
                    {
                      params.map(p =>
                        <Parameter value={p} />
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
