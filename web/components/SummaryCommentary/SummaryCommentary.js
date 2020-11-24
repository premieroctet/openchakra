import React from 'react'
import axios from 'axios'
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Commentary from "../Commentary/Commentary";
import styles from '../../static/css/components/SummaryCommentary';
import WithStyles from "@material-ui/core/styles/withStyles";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from '../Box/Box'
import Divider from '@material-ui/core/Divider';


class SummaryCommentary extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      customerReviews: [],
      alfredReviews: [],
      filter:'',
      showCommentary: false,
      userServicesPreview: true
    }
  }

  componentDidMount() {
    const userId = this.props.user
    const serviceUser=this.props.serviceUser
    if (!userId) {
      return
    }

    axios.get(`/myAlfred/api/reviews/profile/customerReviewsCurrent/${userId}`)
      .then( res => {
        var reviews=res.data
        console.log(`Got ${res.data.length} customer reviews`)
        if (serviceUser) {
          console.log(reviews[0].serviceUser._id,)
          console.log(serviceUser)
          reviews=reviews.filter( r => r.serviceUser._id==serviceUser)
        }
        this.setState( { customerReviews: reviews})
      })
    axios.get(`/myAlfred/api/reviews/profile/alfredReviewsCurrent/${userId}`)
      .then( res => {
        var reviews=res.data
        this.setState( { alfredReviews: reviews})
      })
  }

  filterChange = (event) => {
    this.setState({filter : event.target.value});
  };

  handleShowCommentary = () =>{
    this.setState({showCommentary: !this.state.showCommentary})
  };

  render() {
    const{filter, showCommentary, alfredReviews, customerReviews, userServicesPreview} = this.state;
    const {classes} = this.props;

    const commentsCount=alfredReviews.length + customerReviews.length;
    const allComments=alfredReviews.concat(customerReviews);
    var average = allComments.length ? allComments.map( r => r.note_alfred ? r.note_alfred.global : r.note_client.global ).reduce ((a,b) => a+b)/allComments.length : 0;

    var complimentsCount = 0
    allComments.forEach( comp => {
      if (comp.note_alfred) {
        complimentsCount += Object.values(comp.note_alfred).filter( v => v===true).length
      }
    })

    return(
      <Grid>
        <Grid container style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}} spacing={3}>
          <Grid item className={classes.summaryContainerAverageNote}>
            <Grid style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid>
                <Typography>
                  <strong>{average.toFixed(1)}</strong>
                </Typography>
              </Grid>
              <Grid style={{marginLeft: '3%'}}>
                <Rating name="half-rating-read" value={Math.floor(average)} precision={0.5} readOnly />
              </Grid>
            </Grid>
            <Grid>
              <Typography style={{color:'rgba(39,37,37,35%)', fontWeight: 'bold'}}>NOTE GENERALE</Typography>
            </Grid>
          </Grid>
          <Grid item className={classes.summaryContainerCommentary}>
            <Grid>
              <Typography>
                <strong>{commentsCount}</strong>
              </Typography>
            </Grid>
            <Grid style={{marginTop: '2%'}}>
              <Typography style={{color:'rgba(39,37,37,35%)', fontWeight: 'bold'}}>COMMENTAIRES</Typography>
            </Grid>
            { false ?
            <Grid container style={{marginTop: '5%'}}>

              <Grid item xl={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Filtrer par:</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={filter}
                    onChange={this.filterChange}
                    label="Filtrer par:"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

            </Grid>
              :
              null
            }
          </Grid>
          <Grid item className={classes.summaryContainerCompliments}>
            <Grid>
              <Typography><strong>{complimentsCount}</strong></Typography>
            </Grid>
            <Grid>
              <Typography style={{color:'rgba(39,37,37,35%)', fontWeight: 'bold'}}>COMPLIMENTS</Typography>
            </Grid>
          </Grid>
        </Grid>
        {userServicesPreview ?
          <Grid>
            <Grid style={{display:'flex', alignItems:'center', marginTop: '5vh'}}>
              <Button variant={'contained'} onClick={this.handleShowCommentary} classes={{root: classes.buttonShowMore}}>
                { showCommentary ? 'Cacher les commentaires' : 'Voir les commentaires'}
              </Button>
            </Grid>
          </Grid> : null
        }
        <Grid>
          <Divider style={{height : 2, width: '100%', margin :'5vh 0px'}}/>
        </Grid>
        {
          showCommentary ?
            allComments.map (r => (
              <Grid style={{marginTop: '5%'}}>
                <Commentary key={r._id} review={r._id} user={this.props.user}/>
              </Grid>
            ))
            :
            null
        }
      </Grid>
    );
  }
}

export default WithStyles (styles) (SummaryCommentary)
