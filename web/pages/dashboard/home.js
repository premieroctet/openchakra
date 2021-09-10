import {withTranslation} from 'react-i18next'
const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react'

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Router from 'next/router';
import Layout from '../../hoc/Layout/Layout';
import Link from 'next/link';

const {isLoggedUserAdmin}=require('../../utils/context')

const styles = () => ({
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'top',
    flexDirection: 'column',

  },
  card: {
    padding: '1.5rem 3rem',
    width: 400,
    marginTop: '100px',
  },
  cardContant: {
    flexDirection: 'column',
  },
  linkText: {
    textDecoration: 'none',
    color: 'black',
    fontSize: 12,
    lineHeight: 4.15,
  },
})

class home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    if (!isLoggedUserAdmin()) {
      Router.push('/login')
    }
    setAxiosAuthentication()
  }

  render() {
    const {classes} = this.props

    return (
      <Layout>
        <Grid container className={classes.signupContainer}>
          <Card className={classes.card}>
            <Grid>
              <Grid>
                <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                  <Typography style={{fontSize: 30}}>Maintenance</Typography>
                </Grid>
                <Link href="/dashboard/logAsUser"><a>Connexion en tant qu'autre utilisateur</a></Link><br/>

                <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                  <Typography style={{fontSize: 30}}>Moniteur</Typography>
                </Grid>
                <Link href="/dashboard/statistics"><a>Statistiques</a></Link><br/>
                <Link href="/dashboard/map"><a>Carte des services</a></Link><br/>
                <Link href="/dashboard/bookings"><a>Réservations</a></Link><br/>
                <Link href="/dashboard/prospect"><a>Prospection</a></Link><br/>
                <Link href="http://my-alfred.io:2000/blog/admin"><a>Administration WordPress</a></Link><br/>

                <Grid item style={{display: 'flex', justifyContent: 'center'}}>
                  <Typography style={{fontSize: 30}}>Base de données</Typography>
                </Grid>
                <Link href="/dashboard/uiconfiguration"><a>Configuration UI</a></Link><br/>
                <Link href="/dashboard/users/all"><a>Comptes</a></Link><br/>
                <Link href="/dashboard/serviceusers/all"><a>Services des Alfred</a></Link><br/>
                <Link href="/dashboard/companies/all"><a>Entreprises</a></Link><br/>
                <Link href="/dashboard/category/all"><a>Catégories</a></Link><br/>
                <Link href="/dashboard/billing/all"><a>Méthodes de facturation</a></Link><br/>
                <Link href="/dashboard/filterPresentation/all"><a>Filtres de présentation</a></Link><br/>
                <Link href="/dashboard/job/all"><a>Métiers</a></Link><br/>
                <Link href="/dashboard/tags/all"><a>Tags</a></Link><br/>
                <Link href="/dashboard/equipments/all"><a>Equipements</a></Link><br/>
                <Link href="/dashboard/shopBanner/all"><a>Photos bannière shop</a></Link><br/>
                <Link href="/dashboard/services/all"><a>Services</a></Link><br/>
                <Link href="/dashboard/prestations/all"><a>Prestations</a></Link><br/>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Layout>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(home))
