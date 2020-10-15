import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


class InfoWithPics extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const{data} = this.props;

    return(
      <Grid>
        <Grid style={{display: 'flex', alignItems: 'center', padding: '5%'}}>
          {
            data.IconName ?
              <Grid style={{marginRight: '5%'}}>
                {data.IconName}
              </Grid> :
              data.name_logo && data.logo  ?
              <Grid style={{marginRight: 30}}>
                <img src={`../../../static/equipments/${data.logo.slice(0, -4)}.svg`} height={100} width={100} alt={`${data.name_logo.slice(0, -4)}_Selected.svg`}/>
              </Grid> : null
          }
          {
            data.label || data.summary ?
              <Grid>
                {
                  data.label ?
                    <Grid>
                      <h4 style={{margin: 0}}>{data.label}</h4>
                    </Grid> : null
                }
                {
                  data.summary ?
                    <Grid>
                      <Typography style={{color:'rgba(39,37,37,35%)'}}>{data.summary}</Typography>
                    </Grid> : null
                }
              </Grid> : null
          }
        </Grid>
      </Grid>
    );
  }
}

export default InfoWithPics
