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

class SummaryCommentary extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      customerReviews: [],
      alfredReviews: [],
      filter:'',
      showCommentary: false
    }
  }

  componentDidMount() {
    const userId = this.props.user
    if (!userId) {
      return
    }
    console.log(userId)
    axios.get(`/myAlfred/api/reviews/profile/customerReviewsCurrent/${userId}`)
      .then( res => {
        console.log(`Got ${res.data.length} customer reviews`)
        this.setState( { customerReviews: res.data})
      })
    axios.get(`/myAlfred/api/reviews/profile/alfredReviewsCurrent/${userId}`)
      .then( res => {
        this.setState( { alfredReviews: res.data})
      })
  }

  filterChange = (event) => {
    this.setState({filter : event.target.value});
  };

  handleShowCommentary = () =>{
    this.setState({showCommentary: !this.state.showCommentary})
  };

  render() {
    const{filter, showCommentary, alfredReviews, customerReviews} = this.state;
    const {classes} = this.props;

    const commentsCount=alfredReviews.length + customerReviews.length
    const allComments=alfredReviews.concat(customerReviews)
    var average = allComments.length ? allComments.map( r => r.note_alfred ? r.note_alfred.global : r.note_client.global ).reduce ((a,b) => a+b)/allComments.length : 0

    return(
      <Grid>
        <Grid container style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <Grid item xl={3} style={{display: 'flex', flexDirection: 'column'}}>
            <Grid>
              <Typography><strong>{commentsCount}</strong></Typography>
            </Grid>
            <Grid style={{marginTop: '2%'}}>
              <Typography>commentaires</Typography>
            </Grid>
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
          </Grid>
          <Grid item xl={4} style={{display: 'flex', flexDirection: 'column'}}>
            <Grid style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid>
                <Typography><strong>{average.toFixed(1)}</strong></Typography>
              </Grid>
              <Grid style={{marginLeft: '3%'}}>
                <Rating name="half-rating-read" value={Math.floor(average)} precision={0.5} readOnly />
              </Grid>
            </Grid>
            <Grid>
              <Typography>NOTE GENERALE</Typography>
            </Grid>
            <Grid style={{height: 56, display:'flex', alignItems:'center', marginTop: '4%'}}>
              <Button variant={'contained'} onClick={this.handleShowCommentary} classes={{root: classes.buttonShowMore}}>Voir les commentaires</Button>
            </Grid>
          </Grid>
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
