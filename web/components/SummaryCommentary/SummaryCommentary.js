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
        <Grid style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
          <Grid style={{display: 'flex', flexDirection: 'column', width: '20%'}}>
            <Grid>
              <p>22</p>
            </Grid>
            <Grid>
              commentaires
            </Grid>
            <Grid>
              <FormControl variant="outlined" className={classes.formControl} style={{width: '50%'}}>
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
          <Grid style={{display: 'flex', flexDirection: 'column', width:'15%'}}>
            <Grid style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid>
                <p>4.2</p>
              </Grid>
              <Grid>
                <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
              </Grid>
            </Grid>
            <Grid>
              <Typography>notes general</Typography>
            </Grid>
            <Grid style={{height: 56, display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
              <Button variant={'contained'} onClick={this.handleShowCommentary} classes={{root: classes.buttonShowMore}}>Voir les commentaires</Button>
            </Grid>
          </Grid>
        </Grid>
        {
          showCommentary ?
            <Grid>
              <Commentary/>
            </Grid> : null
        }
      </Grid>
    );
  }
}

export default WithStyles (styles) (SummaryCommentary)
