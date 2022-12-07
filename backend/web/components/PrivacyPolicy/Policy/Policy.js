import React from 'react'
import {withTranslation} from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/PrivacyPolicy/Preamble/Preamble'

function Policy() {
  return(
    <div>
      <h1>La politique de confidentialité permet d’informer nos visiteurs et membres au regard de notre
        politique de respect de la vie privée. My-Alfred souhaite placer la confiance au coeur de ses
        relations, c’est pourquoi, nous formulons au travers de cette politique de confidentialité un
        engagement de sécuriser et protéger l’ensemble de vos données à caractère personnel.
        La politique de confidentialité décrit les processus de collecte, d’utilisation et de
        communication des informations qui peuvent être renseignées sur la plateforme My-Alfred.<br/>
        Les visiteurs et membres de la plateforme My-Alfred sont tenus de lire notre politique de
        confidentialité avant de l’utiliser. En effet, la navigation, l’utilisation, l’accès implique une
        acceptation de la présente politique de confidentialité, à l’exception de la section -- relative à
        la gestion des cookies, qui se fait par acceptation sur le site web.</h1>
    </div>
  )
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(Policy))
