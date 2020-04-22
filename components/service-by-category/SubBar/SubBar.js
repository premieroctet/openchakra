import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios';

const styles = theme => ({
  grow: {
    flexGrow: 1,
    marginTop: 64,
  },
});

class subBar extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      service: [],

    };


  }

  componentDidMount() {
    let self = this;

    const id = self.props.category;
    axios.get(`/myAlfred/api/service/all/${id}`)
        .then(function (response) {
          let service = response.data;
          self.setState({
            service: service,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  render() {
    const {classes} = this.props;
    const {service} = this.state;
    const tags = service.map(e => (
        e.tags.map(k => (
            <Button>{k.label}</Button>
        ))

    ));

    return (
        <AppBar color="default" position="static" className={classes.grow}>
          <Toolbar>
              {tags}
          </Toolbar>
        </AppBar>
    );
  }
}

subBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(subBar);
