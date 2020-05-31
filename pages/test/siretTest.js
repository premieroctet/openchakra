import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Siret from '../../components/WizardForm/Siret';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../components/CreaShop/componentStyle';


class SiretTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_particular: this.props.is_particular,
      company: this.props.company,
      is_certified: this.props.is_certified
    };

  }


  render() {
    const {classes} = this.props;

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid className={classes.contentLeft}>
            <Grid className={classes.contentLeftTop}>
              <Grid>
                <Grid>
                  <Grid container className={classes.checkboxespart}>
                    <Grid container style={{ marginTop: 10, marginBottom: 100 }}>
                      <Grid item xs={11}>
                          <React.Fragment><div>
                            { /*<Siret onChange={this.onCompanyChanged} company={this.state.company} /> */}
                            <Siret onChange={ () => console.log()}/>
                          </div>
                          </React.Fragment>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

SiretTest.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (SiretTest);
