import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import moment from "moment";
import {DateRangePicker} from 'react-dates';

class FilterMenu extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      statusFilterVisible: false,
      individualSelected: false,
      proSelected: false,
      dateFilterVisible: false,
      startDate: null,
      endDate: null,
      focusedInput: null,
    }
  }

  statusFilterToggled = () => {
    this.setState({statusFilterVisible: !this.state.statusFilterVisible});
  };

  statusFilterChanged = event => {
    this.setState({[event.target.name]: event.target.checked, statusFilterVisible: false},() => this.props.filter());
  };

  dateFilterToggled = () => {
    this.setState({dateFilterVisible: !this.state.dateFilterVisible});
  };

  onChangeInterval(startDate, endDate) {
    if (startDate) {
      startDate.hour(0).minute(0).second(0).millisecond(0);
    }

    if (endDate) {
      endDate.hour(23).minute(59).second(59).millisecond(999);
    }

    this.setState({startDate: startDate, endDate: endDate});
  }

  cancelDateFilter = () => {
    this.setState({startDate: null, endDate: null, dateFilterVisible: false}, () => this.props.filter());
  };

  validateDateFilter = () => {
    this.setState({dateFilterVisible: false}, () => this.props.filter());
  };

  isStatusFilterSet = () => {
    return this.state.proSelected || this.state.individualSelected;
  };


  isDateFilterSet = () => {
    return this.state.startDate != null || this.state.endDate != null;
  };

  render() {
    const{style, mounting, search, searching, serviceUsers} = this.props;
    const {statusFilterVisible, individualSelected, proSelected, dateFilterVisible, startDate, endDate, focusedInput} = this.state;

    const statusFilterBg = this.isStatusFilterSet() ? '#2FBCD3' : 'white';
    const dateFilterBg = this.isDateFilterSet() ? '#2FBCD3' : 'white';

    let resultMessage;

    if (mounting) {
      resultMessage = '';
    } else if (searching) {
      resultMessage = 'Recherche en cours';
    } else if (serviceUsers.length === 0) {
      resultMessage = "Nous n'avons pas trouvé de résultat pour votre recherche";
    }


    return(
      <Grid>
          <Grid className={style.filterMenuTitleContainer}>
            <Grid>
              <p className={style.filterMenuDescription}>{resultMessage}</p>
            </Grid>
          </Grid>
          <Grid className={style.filterMenuChipContainer}>
            <Grid className={style.filTerMenuStatusMainStyleFilter}>
              {statusFilterVisible ?
                <Grid className={style.filterMenuContainerStatut}>
                  <Grid className={style.filterMenuFocused} onClick={() => this.statusFilterToggled()}>
                    <Typography className={style.filterMenuTextFocused}>Statut</Typography>
                  </Grid>
                  <Grid className={style.filterMenuContentMainStyle}>
                    <Grid className={style.filTerMenuStatusMainStyleFilter}>
                      <Grid>
                        <Grid>
                          {individualSelected ? null :
                            <Grid>
                              <FormControlLabel
                                classes={{root: style.filterMenuControlLabel}}
                                control={
                                  <Switch
                                    checked={proSelected}
                                    onChange={e => {
                                      this.statusFilterChanged(e);
                                    }}
                                    value={proSelected}
                                    color="primary"
                                    name={'proSelected'}
                                  />
                                }
                                label="Pro"
                              />
                            </Grid>
                          }
                        </Grid>
                        <Grid>
                          {proSelected ? null :
                            <Grid>
                              <FormControlLabel
                                classes={{root: style.filterMenuControlLabel}}
                                control={
                                  <Switch
                                    checked={individualSelected}
                                    onChange={e => {
                                      this.statusFilterChanged(e);
                                    }}
                                    value={individualSelected}
                                    color="primary"
                                    name={'individualSelected'}
                                  />
                                }
                                label="Particulier"
                              />
                            </Grid>
                          }
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                :
                <Grid
                  key={moment()}
                  onClick={() => this.statusFilterToggled()}
                  className={style.filterMenuStatusNotFocused}
                  style={{backgroundColor: `${statusFilterBg}`}}>
                    <Typography className={style.filterMenuTextNotFocused}>Statut</Typography>
                </Grid>
              }
            </Grid>
            <Grid className={style.filTerMenuStatusMainStyleFilterDate}>
              {dateFilterVisible ?
                <Grid className={style.filterMenuDateFocused}>
                  <Grid className={style.filterMenuFocused} onClick={() => this.dateFilterToggled()}>
                    <Typography >Quelle(s) date(s) ?</Typography>
                  </Grid>
                  <Grid className={style.filterMenuContentMainStyleDateFilter}>
                    <Grid>
                      <DateRangePicker
                        startDate={startDate} // momentPropTypes.momentObj or null,
                        startDatePlaceholderText={'Début'}
                        endDatePlaceholderText={'Fin'}
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({startDate, endDate}) => this.onChangeInterval(startDate, endDate)} // PropTypes.func.isRequired,
                        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                        minimumNights={0}
                        numberOfMonths={1}
                      />
                    </Grid>
                    <Grid className={style.filterMenuDateFilterButtonContainer}>
                      <Grid>
                        <Button onClick={() => this.cancelDateFilter()}>Annuler</Button>
                      </Grid>
                      <Grid>
                        <Button onClick={() => this.validateDateFilter()}>Valider</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                :
                <Grid
                  onClick={() => this.dateFilterToggled()}
                  className={style.filterMenuStatusNotFocused}
                  style={{backgroundColor: `${dateFilterBg}`}}>
                  <Typography>Quelle(s) date(s) ?</Typography>
                </Grid>
              }
            </Grid>
          </Grid>
      </Grid>
    );
  }
}

export default FilterMenu
