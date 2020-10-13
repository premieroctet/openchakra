import React from "react";
import Grid from "@material-ui/core/Grid";


class InfoWithPics extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const{data} = this.props;
    
    return(
      <Grid>
        <Grid style={{display: 'flex', alignItems: 'center'}}>
          {
            data.IconName ?
              <Grid>
                {data.IconName}
              </Grid> :
              data.name_logo && data.logo  ?
              <Grid>
                <img src={`../../../static/equipments/${data.logo.slice(0, -4)}_Selected.svg`} height={100} width={100} alt={`${data.name_logo.slice(0, -4)}_Selected.svg`}/>
              </Grid> : null
          }
          {
            data.label || data.summary ?
              <Grid>
                {
                  data.label ?
                    <Grid>
                      <h4>{data.label}</h4>
                    </Grid> : null
                }
                {
                  data.summary ?
                    <Grid>
                      <p>{data.summary}</p>
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
