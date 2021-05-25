import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import moment from "moment";
import {DateRangePicker} from 'react-dates';
import styles from '../../static/css/components/FilterMenu/FilterMenu'
import withStyles from "@material-ui/core/styles/withStyles";
import Slider from '@material-ui/core/Slider';
import MultipleSelect from "react-select";
const {SEARCHBAR}=require('../../utils/i18n')
const {setAxiosAuthentication}=require('../../utils/authentication')
const {isB2BStyle}=require('../../utils/context')
const {PRO, PART}=require('../../utils/consts')
import axios from 'axios'
import _ from 'lodash'


class FilterMenu extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      statusFilterSet : false,
      statusFilterVisible: false,
      individualSelected: false,
      proSelected: false,
      dateFilterSet: false,
      dateFilterVisible: false,
      startDate: null,
      endDate: null,
      radiusFilterSet: false,
      radiusFilterVisible: false,
      radius: null,
      locationFilterSet: false,
      locationFilterVisible: false,
      locations: [],
      categoriesFilterSet: false,
      categoriesFilterVisible: false,
      categories: [],
      allCategories: [],
      servicesFilterSet: false,
      servicesFilterVisible: false,
      services: [],
      filteredServices: [],
      allServices: [],
      focusedInput: null,
    }
    this.radius_marks=[1, 5,10,15,20,30,50,100,200,300].map(v => ({value: v, label: v>1 && v<50? '' : v}))
  }

  componentDidMount = () => {
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/category/${isB2BStyle() ? PRO : PART}`)
      .then(res => {
        let categories = res.data;
        this.setState({allCategories: categories.map(c => ({value:c._id, label: c.label}))})
      })
      .catch(err => {
        console.error(err)
      })
    axios.get('/myAlfred/api/service/all')
      .then(res => {
        const services=res.data.map(s => ({value:s._id, label: s.label, category: s.category._id}))
        this.setState({allServices: services, filteredServices: services})
      })
      .catch(err => {
        console.error(err)
      })
  }

  fireFilter = () => {
    var fltr={}
    if (this.state.statusFilterSet) {
      if (this.state.proSelected) {
        fltr.proSelected = true
      }
      if (this.state.individualSelected) {
        fltr.individualSelected = true
      }
    }
    if (this.state.dateFilterSet) {
      if (this.state.startDate) {
        fltr.startDate=this.state.startDate
      }
      if (this.state.endDate) {
        fltr.endDate=this.state.endDate
      }
    }
    if (this.state.radiusFilterSet) {
      fltr.radius=this.state.radius
    }
    if (this.state.locationFilterSet) {
      fltr.locations=this.state.locations
    }
    if (this.state.servicesFilterSet) {
      fltr.services=this.state.services.map(c => c.value)
    }
    else if (this.state.categoriesFilterSet) {
      fltr.categories=this.state.categories.map(c => c.value)
    }

    this.props.filter(fltr)
  }

  statusFilterToggled = () => {
    this.setState({statusFilterVisible: !this.state.statusFilterVisible});
  };

  statusFilterChanged = event => {
    this.setState({[event.target.name]: event.target.checked});
  };

  cancelStatusFilter = () => {
     this.setState({statusFilterSet:false, statusFilterVisible: false}, () => this.fireFilter());
  };

  validateStatusFilter = () => {
   this.setState({statusFilterSet:true, statusFilterVisible: false}, () => this.fireFilter());
  };

  dateFilterToggled = () => {
    this.setState({dateFilterVisible: !this.state.dateFilterVisible});
  };

  // Radius filter
  radiusFilterToggled = () => {
    this.setState({radiusFilterVisible: !this.state.radiusFilterVisible});
  };

  cancelRadiusFilter = () => {
    this.setState({radiusFilterSet:false, radiusFilterVisible: false}, () => this.fireFilter());
  };

  validateRadiusFilter = () => {
    this.setState({radiusFilterSet:true, radiusFilterVisible: false}, () => this.fireFilter());
  };

  onRadiusFilterChanged = (event, value) => {
    this.setState({radius: value});
  };

  // Location filter
  locationFilterToggled = () => {
    this.setState({locationFilterVisible: !this.state.locationFilterVisible});
  };

  cancelLocationFilter = () => {
    this.setState({locationFilterSet: false, locationFilterVisible: false}, () => this.fireFilter());
  };

  validateLocationFilter = () => {
    this.setState({locationFilterSet: true, locationFilterVisible: false}, () => this.fireFilter());
  };

  onLocationFilterChanged = event => {
    const {name, checked} = event.target
    var {locations} = this.state
    if (checked) {
      locations = _.uniq(locations.concat(name))
    }
    else {
      locations = locations.filter( l => l!=name)
    }
    this.setState({locations: locations})
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
    this.setState({dateFilterSet:false, dateFilterVisible: false}, () => this.fireFilter());
  };

  validateDateFilter = () => {
    this.setState({dateFilterSet:true, dateFilterVisible: false}, () => this.fireFilter());
  };

  isStatusFilterSet = () => {
    return this.state.proSelected || this.state.individualSelected;
  };


  isDateFilterSet = () => {
    return this.state.startDate != null || this.state.endDate != null;
  };

  // Categories filter
  categoriesFilterToggled = () => {
    this.setState({categoriesFilterVisible: !this.state.categoriesFilterVisible});
  };

  cancelCategoriesFilter = () => {
    this.setState({categoriesFilterSet:false, categoriesFilterVisible: false}, () => this.fireFilter());
  };

  validateCategoriesFilter = () => {
    this.setState({categoriesFilterSet:true, categoriesFilterVisible: false}, () => this.fireFilter());
  };

  onCategoriesFilterChanged = categories => {
    categories = categories || []
    const filteredServices=this.state.allServices.filter(s => {
      return categories.map(c=>c.value).includes(s.category)
    })
    const services=this.state.services.filter(s => {
      return filteredServices.map(fs=>fs.value).includes(s._id)
    })
    this.setState({categories: categories, filteredServices: filteredServices, services: services});
  };

  // Services filter
  servicesFilterToggled = () => {
    this.setState({servicesFilterVisible: !this.state.servicesFilterVisible});
  };

  cancelServicesFilter = () => {
    this.setState({servicesFilterSet:false, servicesFilterVisible: false}, () => this.fireFilter());
  };

  validateServicesFilter = () => {
    this.setState({servicesFilterSet:true, servicesFilterVisible: false}, () => this.fireFilter());
  };

  onServicesFilterChanged = services => {
    services = services || []
    this.setState({services: services || []});
  };

  render() {
    const{classes, mounting, search, searching, serviceUsers} = this.props;
    const {
      statusFilterSet, statusFilterVisible, individualSelected, proSelected,
      dateFilterSet, dateFilterVisible, startDate, endDate, focusedInput,
      radiusFilterSet, radiusFilterVisible,
      locationFilterSet, locationFilterVisible, locations,
      categoriesFilterSet, categoriesFilterVisible, categories, allCategories,
      servicesFilterSet, servicesFilterVisible, services, filteredServices
    } = this.state;

    const statusFilterBg = statusFilterSet ? '#2FBCD3' : 'white';
    const dateFilterBg = dateFilterSet ? '#2FBCD3' : 'white';
    const radiusFilterBg = radiusFilterSet ? '#2FBCD3' : 'white';
    const locationFilterBg = locationFilterSet ? '#2FBCD3' : 'white';
    const categoriesFilterBg = categoriesFilterSet ? '#2FBCD3' : 'white';
    const servicesFilterBg = servicesFilterSet ? '#2FBCD3' : 'white';

    let resultMessage;

    if (mounting) {
      resultMessage = '';
    }
    else if (searching) {
      resultMessage = 'Recherche en cours';
    }
    else if (serviceUsers.length === 0) {
      resultMessage = "Nous n'avons pas trouvé de résultat pour votre recherche";
    }


    return(
      <Grid>
        <Grid className={classes.filterMenuTitleContainer}>
          <Grid>
            <p className={classes.filterMenuDescription}>{resultMessage}</p>
          </Grid>
        </Grid>
        <Grid className={classes.filterMenuChipContainer}>
          <Grid className={classes.filTerMenuStatusMainStyleFilter}>
            {statusFilterVisible ?
              <Grid className={classes.filterMenuContainerStatut}>
                <Grid className={classes.filterMenuFocused} onClick={this.statusFilterToggled}>
                  <Typography className={classes.filterMenuTextFocused}>{SEARCHBAR.labelStatus}</Typography>
                </Grid>
                <Grid className={classes.filterMenuContentMainStyle}>
                  <Grid className={classes.filTerMenuStatusMainStyleFilter}>
                    <Grid>
                      <Grid>
                        {individualSelected ? null :
                          <Grid>
                            <FormControlLabel
                              classes={{root: classes.filterMenuControlLabel}}
                              control={
                                <Switch
                                  checked={proSelected}
                                  onChange={this.statusFilterChanged}
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
                              classes={{root: classes.filterMenuControlLabel}}
                              control={
                                <Switch
                                  checked={individualSelected}
                                  onChange={this.statusFilterChanged}
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
                  <Grid className={classes.filterMenuDateFilterButtonContainer}>
                    <Grid>
                      <Button onClick={this.cancelStatusFilter}>Annuler</Button>
                    </Grid>
                    <Grid>
                      <Button onClick={this.validateStatusFilter}>Valider</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              :
              <Grid
                key={moment()}
                onClick={this.statusFilterToggled}
                className={classes.filterMenuStatusNotFocused}
                style={{backgroundColor: `${statusFilterBg}`}}>
                <Typography style={{color: statusFilterSet ? 'white': 'black'}}>Statut</Typography>
              </Grid>
            }
          </Grid>
          <Grid className={classes.filTerMenuStatusMainStyleFilterDate}>
            {dateFilterVisible ?
              <Grid className={classes.filterMenuDateFocused}>
                <Grid className={classes.filterMenuFocused} onClick={this.dateFilterToggled}>
                  <Typography>{SEARCHBAR.labelDate}</Typography>
                </Grid>
                <Grid className={classes.filterMenuContentMainStyleDateFilter}>
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
                  <Grid className={classes.filterMenuDateFilterButtonContainer}>
                    <Grid>
                      <Button onClick={this.cancelDateFilter}>Annuler</Button>
                    </Grid>
                    <Grid>
                      <Button onClick={this.validateDateFilter}>Valider</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              :
              <Grid
                onClick={this.dateFilterToggled}
                className={classes.filterMenuStatusNotFocused}
                style={{backgroundColor: `${dateFilterBg}`}}>
                <Typography style={{color:  dateFilterSet ?  'white' : 'black'}}>Date(s)</Typography>
              </Grid>
            }
          </Grid>
          { this.props.displayPerimeter ?
              <Grid className={classes.filTerMenuStatusMainStyleFilterDate}>
                {radiusFilterVisible ?
                  <Grid className={classes.filterMenuDateFocused}>
                    <Grid className={classes.filterMenuFocused} onClick={this.radiusFilterToggled}>
                      <Typography >{SEARCHBAR.labelPerimeter}</Typography>
                    </Grid>
                    <Grid className={classes.filterMenuContentMainStyleDateFilter}>
                      <Grid>
                        <Slider
                          name="radius"
                          min={5}
                          max={300}
                          step={null}
                          value={this.state.radius}
                          valueLabelDisplay="auto"
                          marks={this.radius_marks}
                          onChange={this.onRadiusFilterChanged}
                        />
                      </Grid>
                      <Grid className={classes.filterMenuDateFilterButtonContainer}>
                        <Grid>
                          <Button onClick={this.cancelRadiusFilter}>Annuler</Button>
                        </Grid>
                        <Grid>
                          <Button onClick={this.validateRadiusFilter}>Valider</Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  :
                  <Grid
                    onClick={this.radiusFilterToggled}
                    className={classes.filterMenuStatusNotFocused}
                    style={{backgroundColor: `${radiusFilterBg}`}}>
                    <Typography style={{color:  radiusFilterSet ?  'white' : 'black'}}>{SEARCHBAR.labelPerimeter}</Typography>
                  </Grid>
                }
              </Grid>
              :
              null
          }
          <Grid className={classes.filTerMenuStatusMainStyleFilterDate}>
            {locationFilterVisible?
              <Grid className={classes.filterMenuDateFocused}>
                <Grid className={classes.filterMenuFocused} onClick={this.locationFilterToggled}>
                  <Typography >{SEARCHBAR.labelLocation}</Typography>
                </Grid>
                <Grid className={classes.filterMenuContentMainStyleDateFilter}>
                  <Grid>
                  <FormControlLabel
                    classes={{root: classes.filterMenuControlLabel}}
                    control={
                      <Switch
                        checked={locations.includes('client')}
                        onChange={this.onLocationFilterChanged}
                        color="primary"
                        name={'client'}
                      />
                    }
                    label="Chez moi"
                  />
                  <FormControlLabel
                    classes={{root: classes.filterMenuControlLabel}}
                    control={
                      <Switch
                        checked={locations.includes('alfred')}
                        onChange={this.onLocationFilterChanged}
                        color="primary"
                        name={'alfred'}
                      />
                    }
                    label="Chez l'Alfred"
                  />
                  <FormControlLabel
                    classes={{root: classes.filterMenuControlLabel}}
                    control={
                      <Switch
                        checked={locations.includes('visio')}
                        onChange={this.onLocationFilterChanged}
                        color="primary"
                        name={'visio'}
                      />
                    }
                    label="En visio"
                  />
                  </Grid>
                  <Grid className={classes.filterMenuDateFilterButtonContainer}>
                    <Grid>
                      <Button onClick={this.cancelLocationFilter}>Annuler</Button>
                    </Grid>
                    <Grid>
                      <Button onClick={this.validateLocationFilter}>Valider</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              :
              <Grid
                onClick={this.locationFilterToggled}
                className={classes.filterMenuStatusNotFocused}
                style={{backgroundColor: `${locationFilterBg}`}}>
                <Typography style={{color:  locationFilterSet ?  'white' : 'black'}}>{SEARCHBAR.labelLocation}</Typography>
              </Grid>
            }
          </Grid>
          <Grid className={classes.filTerMenuStatusMainStyleFilterDate}>
            {categoriesFilterVisible?
              <Grid className={classes.filterMenuDateFocused}>
                <Grid className={classes.filterMenuFocused} onClick={this.categoriesFilterToggled}>
                  <Typography >{SEARCHBAR.labelCategory}</Typography>
                </Grid>
                <Grid className={classes.filterMenuContentMainStyleDateFilter}>
                  <Grid>
                    <MultipleSelect
                      key={moment()}
                      value={categories}
                      onChange={this.onCategoriesFilterChanged}
                      options={allCategories}
                      isMulti
                      isSearchable
                      closeMenuOnSelect={false}
                    />
                    <Grid className={classes.filterMenuDateFilterButtonContainer}>
                      <Grid>
                        <Button onClick={this.cancelCategoriesFilter}>Annuler</Button>
                      </Grid>
                      <Grid>
                        <Button onClick={this.validateCategoriesFilter}>Valider</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              :
              <Grid
                onClick={this.categoriesFilterToggled}
                className={classes.filterMenuStatusNotFocused}
                style={{backgroundColor: `${categoriesFilterBg}`}}>
                <Typography style={{color:  categoriesFilterSet ?  'white' : 'black'}}>{SEARCHBAR.labelCategory}</Typography>
              </Grid>
            }
          </Grid>
          <Grid className={classes.filTerMenuStatusMainStyleFilterDate}>
            {servicesFilterVisible?
              <Grid className={classes.filterMenuDateFocused}>
                <Grid className={classes.filterMenuFocused} onClick={this.servicesFilterToggled}>
                  <Typography>{SEARCHBAR.labelService}</Typography>
                </Grid>
                <Grid className={classes.filterMenuContentMainStyleDateFilter}>
                  <Grid>
                    <MultipleSelect
                      key={moment()}
                      value={services}
                      onChange={this.onServicesFilterChanged}
                      options={filteredServices}
                      isMulti
                      isSearchable
                      closeMenuOnSelect={false}
                    />
                    <Grid className={classes.filterMenuDateFilterButtonContainer}>
                      <Grid>
                        <Button onClick={this.cancelServicesFilter}>Annuler</Button>
                      </Grid>
                      <Grid>
                        <Button onClick={this.validateServicesFilter}>Valider</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              :
              <Grid
                onClick={this.servicesFilterToggled}
                className={classes.filterMenuStatusNotFocused}
                style={{backgroundColor: `${servicesFilterBg}`}}>
                <Typography style={{color:  servicesFilterSet ?  'white' : 'black'}}>{SEARCHBAR.labelService}</Typography>
              </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(FilterMenu);
