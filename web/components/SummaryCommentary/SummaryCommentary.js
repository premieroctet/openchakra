import React from 'react'
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
      filter:'',
      showCommentary: false
    }
  }

  handleChange = (event) => {
    this.setState({filter : event.target.value});
  };

  handleShowCommentary = () =>{
    this.setState({showCommentary: !this.state.showCommentary})
  };

  render() {
    const{filter, showCommentary} = this.state;
    const {classes} = this.props;

    return(
      <Grid>
        <Grid container style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <Grid item xl={3} style={{display: 'flex', flexDirection: 'column'}}>
            <Grid>
              <Typography><strong>22</strong></Typography>
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
                    onChange={this.handleChange}
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
                <Typography><strong>4.2</strong></Typography>
              </Grid>
              <Grid style={{marginLeft: '3%'}}>
                <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
              </Grid>
            </Grid>
            <Grid>
              <Typography>notes general</Typography>
            </Grid>
            <Grid style={{height: 56, display:'flex', alignItems:'center', marginTop: '4%'}}>
              <Button variant={'contained'} onClick={this.handleShowCommentary} classes={{root: classes.buttonShowMore}}>Voir les commentaires</Button>
            </Grid>
          </Grid>
        </Grid>
        {
          showCommentary ?
            <Grid style={{marginTop: '5%'}}>
              <Commentary/>
            </Grid> : null
        }
      </Grid>
    );
  }
}

export default WithStyles (styles) (SummaryCommentary)
