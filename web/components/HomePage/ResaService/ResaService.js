import React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {RESA_SERVICE} from '../../../utils/i18n';
import Link from '../../Link/Link';
import styles from '../../../static/css/components/ResaService/ResaService';
import withStyles from "@material-ui/core/styles/withStyles";
import Router from 'next/router';


class ResaService extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      homePage: false
    }
  }

  componentDidMount() {
    if(Router.pathname=== '/'){
      this.setState({homePage: true})
    }
  }

  render() {
    const {classes} = this.props;
    const {homePage} = this.state;

    return (
      <Grid className={classes.ResaServiceMainContainer}>
        <Grid className={classes.becomeAlfredContainer}>
          <Grid>
            <h2 className={classes.becomeAlfredTitle}>{RESA_SERVICE.title}</h2>
          </Grid>
          <Grid>
            <p className={classes.becomeAlfredText}>{RESA_SERVICE.text}</p>
          </Grid>
          <Grid>
            <Link href={'/creaShop/creaShop'}>
              <Button
                variant={'contained'}
                className={classes.resaServiceButton}
                style={{
                  color: homePage ? 'rgba(178,204,251,1)' : '#F8CF61',
                }}
              >{RESA_SERVICE.button}</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid/>
      </Grid>
    );
  }
}

export default withStyles (styles) (ResaService);
