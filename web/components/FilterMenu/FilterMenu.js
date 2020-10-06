import React from 'react';
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
import moment from "moment";
import {DateRangePicker} from 'react-dates';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Divider from '@material-ui/core/Divider';
import AccordionActions from '@material-ui/core/AccordionActions';



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
    this.setState({[event.target.name]: event.target.checked, statusFilterVisible: false}, () => this.filter());
  };

  filter = () => {
    const serviceUsers = this.state.serviceUsers;
    var serviceUsersDisplay = [];
    if (this.state.proSelected || this.state.individualSelected) {
      serviceUsers.forEach(su => {
        var alfId = su.user._id;
        const isPro = this.state.proAlfred.includes(alfId);
        if (isPro && this.state.proSelected || !isPro && this.state.individualSelected) {
          serviceUsersDisplay.push(su);
        }
      });
    } else {
      serviceUsersDisplay = serviceUsers;
    }

    const start = this.state.startDate;
    const end = this.state.endDate;

    if (start && end) {
      axios.post('/myAlfred/api/availability/check', {
        start: moment(start).unix(),
        end: moment(end).unix(),
        serviceUsers: serviceUsersDisplay.map(su => su._id),
      })
        .then(response => {
          const filteredServiceUsers = response.data;
          serviceUsersDisplay = serviceUsersDisplay.filter(su => filteredServiceUsers.includes(su._id.toString()));
          this.setFilteredServiceUsers(serviceUsersDisplay);
        });
    } else {
      this.setFilteredServiceUsers(serviceUsersDisplay);
    }
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
    this.setState({startDate: null, endDate: null, dateFilterVisible: false}, () => this.filter());
  };

  validateDateFilter = () => {
    this.setState({dateFilterVisible: false}, () => this.filter());
  };

  isStatusFilterSet = () => {
    return this.state.proSelected || this.state.individualSelected;
  };


  isDateFilterSet = () => {
    return this.state.startDate != null || this.state.endDate != null;
  };

  handleChange = (panel) => (event, newExpanded) => {
    this.setState({expanded: newExpanded ? panel : false});
  };

  render() {
    const{style, categories} = this.props;
    const {statusFilterVisible, individualSelected, proSelected, dateFilterVisible, startDate, endDate, focusedInput, expanded} = this.state;

    const statusFilterBg = this.isStatusFilterSet() ? '#2FBCD3' : 'white';
    const dateFilterBg = this.isDateFilterSet() ? '#2FBCD3' : 'white';


    return(
      <Grid>
        <Grid className={style.filterMenuTitleContainer}>
          <Grid>
            <Grid>
              <h2 className={style.filterMenuTitle}>Titre de la categorie</h2>
            </Grid>
            <Grid>
              <p className={style.filterMenuDescription}>Description</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={style.filterMenuChipContainer}>
          <Grid container style={{display: 'flex', flexDirection : 'row'}}>
            <Grid item style={{width: '20%'}}>
              <Accordion expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography>Statut</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                  <Button size="small">Cancel</Button>
                  <Button size="small" color="primary">
                    Save
                  </Button>
                </AccordionActions>
              </Accordion>
            </Grid>
            <Grid item style={{width: '20%'}}>
              <Accordion expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                  <Typography>Quelles dates ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                  <Button size="small">Cancel</Button>
                  <Button size="small" color="primary">
                    Save
                  </Button>
                </AccordionActions>
              </Accordion>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default FilterMenu
