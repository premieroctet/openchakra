import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class Checkboxes extends React.Component {
  state = {
    checkedA: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div>
        <Checkbox
          checked={this.state.checkedA}
          onChange={this.handleChange('checkedA')}
          value="checkedA"
          color="primary"
        />
      </div>
    );
  }
}

export default Checkboxes;