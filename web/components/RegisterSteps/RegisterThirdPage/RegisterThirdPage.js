import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import styles from '../../../static/css/components/RegisterSteps/RegisterThirdPage/RegisterThirdPage';

class RegisterThirdPage extends React.Component{
  render() {
    const{classes, state} = this.props;

    return(
      <Grid container>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid>
              <h2 className={classes.titleRegister}>Inscription terminée</h2>
            </Grid>
            <Grid className={classes.newContainer}>
              <Grid item style={{display: 'flex', justifyContent: 'center', marginTop: 20, textAlign: 'center'}}>
                <Typography>Inscription réussie ! Vous pouvez maintenant proposer ou rechercher vos services sur My
                  Alfred</Typography>
              </Grid>
              <Grid item className={classes.responsiveButton}>
                <Grid item style={{marginRight: '1%'}}>
                  <Link href={'/search?search=1'}>
                    <a style={{textDecoration: 'none'}}>
                      <Button
                        variant={'contained'}
                        color={'primary'}
                        style={{color: 'white', textTransform: 'initial'}}>
                        Commencez à explorer
                      </Button>
                    </a>
                  </Link>
                </Grid>
                <Grid item className={classes.responsiveSecondaryButton}>
                  <Link href={'/creaShop/creaShop'}>
                    <a style={{textDecoration: 'none'}}>
                      <Button
                        variant={'contained'}
                        color={'secondary'}
                        style={{color: 'white', textTransform: 'initial'}}>
                        Proposer mes services
                      </Button>
                    </a>
                  </Link>
                </Grid>

              </Grid>
              <Grid style={{marginTop: 20}}>
                <hr/>
                <Grid style={{marginTop: 20}}>
                  <Link href={'/needHelp/needHelp'}>
                    <a target="_blank" style={{
                      color: '#2FBCD3',
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      textDecoration: 'none',
                    }}>
                      Besoin d'aide pour proposer vos services ? Prenez rendez-vous avec l'équipe My Alfred ici !
                    </a>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    )
  }

}

export default withStyles(styles)(RegisterThirdPage);
