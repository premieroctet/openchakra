import {withTranslation} from 'react-i18next'
import React from 'react'
import Layout from '../../hoc/Layout/Layout'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import STEPS from '../../utils/privacypolicySteps'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CssBaseline from '@material-ui/core/CssBaseline'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import PropTypes from 'prop-types'
import styles from '../../static/css/pages/privacypolicy/privacypolicy'
import Hidden from '@material-ui/core/Hidden'
import {Divider} from '@material-ui/core'

class Privacypolicy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      mobileOpen: false,
    }
  }

  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen})
  }

  handleStep = index => {
    this.setState({activeStep: index})
  }

  drawer = classes => {
    const {activeStep} = this.state

    return (
      <Grid className={classes.toolbar} >
        <List classes={{root: classes.paddingList}}>
          {
            STEPS.map((item, index) => (
              <Grid key={index} className={classes.hoverButton}>
                <ListItem button key={item.menu} onClick={() => this.handleStep(index)} classes={{root: activeStep === index ? classes.activeButton : classes.standartButton}}>
                  <ListItemText primary={item.menu} classes={{root: classes.listItemText}}/>
                </ListItem>
              </Grid>
            ))
          }
        </List>
      </Grid>
    )
  };

  renderSwitch = stepIndex => {
    return STEPS[stepIndex].component(this)
  }

  render() {
    const{classes, window} = this.props
    const {mobileOpen, activeStep} = this.state

    const container = window !== undefined ? () => window().document.body : undefined

    return (
      <div>
        <Layout>
          <Grid className={classes.root}>
            <CssBaseline />
            <Grid>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <nav className={classes.drawer} aria-label="mailbox folders">
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden smUp implementation="css">
                <Drawer
                  container={container}
                  variant="temporary"
                  anchor={'left'}
                  open={mobileOpen}
                  onClose={this.handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  {this.drawer(classes)}
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                <Drawer
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
                >
                  {this.drawer(classes)}
                </Drawer>
              </Hidden>
            </nav>
            <main className={classes.content}>
              <Grid>
                {this.renderSwitch(activeStep)}
              </Grid>
            </main>
          </Grid>
        </Layout>
        {/* <Footer/>*/}


      </div>
    )
  }
}

Privacypolicy.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}


export default withTranslation('custom', {withRef: true})(withStyles(styles)(Privacypolicy))
