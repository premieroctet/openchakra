import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './AlfredCondtionsCancelStyle'

class AlfredConditionsCancel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      shop: [],
      alfred: []
    }
  }
  render(){
    const {classes, shop, alfred} = this.props;

    return (
      <Grid container>
        <Grid className={classes.mainContainer}>
          <Grid className={classes.containerPosition}>
            <Grid className={classes.contentPosition}>
              <Grid className={classes.containerBooking}>
                <Grid>
                  <h3>Conditions d’annulation de {alfred.firstname}</h3>
                </Grid>
                <Grid>
                  <Button color="secondary" className={classes.button}>
                    Modifier
                  </Button>
                </Grid>
              </Grid>
              <Grid className={classes.containerAlfred}>
                <Grid className={classes.alignCheckbox}>
                  <Grid>
                    <Checkbox
                      checked={!!shop.flexible_cancel}
                      value={!!shop.flexible_cancel}
                      color="primary"
                      inputProps={{
                        'aria-label': 'secondary checkbox',
                      }}
                      icon={<CircleUnchecked/>}
                      checkedIcon={<RadioButtonCheckedIcon />}
                    />
                  </Grid>
                  <Grid>
                    <p>
                      Flexible : en cas d’annulation jusqu’à 1 jour de la prestation, Maelîs procédera au
                      remboursement intégral de la réservation.
                    </p>
                  </Grid>
                </Grid>
                <Grid className={classes.alignCheckbox}>
                  <Grid>
                    <Checkbox
                      checked={!!shop.moderate_cancel}
                      value={!!shop.moderate_cancel}
                      color="primary"
                      inputProps={{
                        'aria-label': 'secondary checkbox',
                      }}
                      icon={<CircleUnchecked/>}
                      checkedIcon={<RadioButtonCheckedIcon />}
                    />
                  </Grid>
                  <Grid>
                    <p>
                      Modéré : en cas d’annulation jusqu’à 5 jour de la prestation, Maelîs procédera
                      au remboursement intégral de la réservation.
                    </p>
                  </Grid>
                </Grid>
                <Grid className={classes.alignCheckbox}>
                  <Grid>
                    <Checkbox
                      checked={!!shop.strict_cancel}
                      value={!!shop.strict_cancel}
                      color="primary"
                      inputProps={{
                        'aria-label': 'secondary checkbox',
                      }}
                      icon={<CircleUnchecked/>}
                      checkedIcon={<RadioButtonCheckedIcon />}
                    />
                  </Grid>
                  <Grid>
                    <p>
                      Stricte: en cas d’annulation jusqu’à 10 jour de la prestation, Maelîs procédera au
                      remboursement intégral de la réservation.
                    </p>
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

AlfredConditionsCancel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(AlfredConditionsCancel);
