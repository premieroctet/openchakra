import React from 'react';
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Link from "../../../components/Link/Link"
import {withStyles} from "@material-ui/core/styles";
import styles from '../../../static/css/pages/homePage/index';
import Typography from "@material-ui/core/Typography";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
        <Grid>
          <Link href={'/footer/apropos'}>
            <Typography style={{float: 'start', paddingTop: '10px'}}>&Agrave; propos de nous</Typography>
          </Link>
        </Grid>
        <Grid>
          <Link href={'/'}>
            <Typography style={{marginTop: '2.5px', paddingRight: '18px'}}>Sécurité</Typography>
          </Link>
          <Link>
            <Typography style={{marginTop: '2.5px', paddingRight: '18px'}}>Informations légales</Typography>
          </Link>
          <Link>
            <Typography style={{marginTop: '2.5px', paddingRight: '18px'}}>Confidentialité</Typography>
          </Link>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Footer)
