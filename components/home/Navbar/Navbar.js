import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import setAuthToken from "../../../utils/setAuthToken";

const styles = {
  grow: {
    flexGrow: 1,
  },
  buttonSpace: {
    marginRight: '10px',
  },
};

class navbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      logged: false
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({logged:true})
    }
  }

  logout2() {
    localStorage.removeItem('token');
    // Remove auth header for future requests
    setAuthToken(false);
    window.location.reload();
  };


  render() {
    const {classes} = this.props;
    const test = this.state.logged;
    const logout = <Button variant="outlined" color="primary" className={classes.buttonSpace}
                           onClick={this.logout2}>Déconnexion</Button>;



    return (
        <AppBar color="default" position="static" className={classes.grow}>
          <Toolbar>
            <Typography variant="h6" className={classes.grow}>
              My Alfred
            </Typography>
            {test ? logout :
                <React.Fragment><Button href={'/login'} variant="outlined" color="primary"
                                        className={classes.buttonSpace}>Connexion</Button>
                  <Button href={'/signup'} variant="contained" color="primary">Inscription</Button></React.Fragment>}
          </Toolbar>
        </AppBar>
    );
  }
}

// eslint-disable-next-line react/no-typos
navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(navbar);
