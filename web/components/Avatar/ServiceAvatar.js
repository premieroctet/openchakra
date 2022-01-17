import {withTranslation} from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'
import React, {useEffect, useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import axios from 'axios'
const {isEditableUser, getLoggedUserId} = require('../../utils/context')
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import Badge from '@material-ui/core/Badge'

const useStyles = makeStyles(theme => ({
  avatarLetterProfil: {
    height: '90%',
    width: '90%',
    margin: 'auto',
    fontSize: 'xx-large',
  },
  avatarLetter: {
    width: 80,
    height: 80,
    [theme.breakpoints.down('sm')]: {
      width: 60,
      height: 60,
    },
  },
  myProfile: {
    width: '100%',
    height: '100%',
  },
  input: {
    display: 'none',
  },
  badge: {
    width: '100%',
    height: '100%',
  },
  buttonCamera: {
    float: 'right',
    zIndex: '2',
    color: '#312b2a',
    position: 'relative',
    border: 'white 0.5px solid',
    borderRadius: '50%',
    backgroundColor: '#BDBDBD',
    bottom: '40%',
    padding: '0.3vh',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
}))

function ServiceAvatar(props) {
  const classes = useStyles()
  const {service} = props

  function avatarWithPics(service, classes) {
    if (!service) {
      return null
    }
    const url=service.picture.match(/^https?:\/\//) ? service.picture : `/${service.picture}`

    return (
      <Avatar
        alt="photo de profil"
        src={url}
        className={classes.avatarLetter}
      />
    )
  }

  function avatarWithoutPics(service, classes) {

    return (
      <Avatar alt="photo de profil" className={classes.avatarLetter}>
        <p>{service.label[0]}</p>
      </Avatar>
    )
  }

  return (
    <Grid style={{width: '100%', height: '100%'}}>
      <Grid style={{
        height: '100%',
        width: '100%',
      }}>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          classes={{root: classes.badge}}
        >
          {
            service.picture ? avatarWithPics(service, classes) : avatarWithoutPics(service, classes)
          }
        </Badge>
      </Grid>
    </Grid>
  )
}

export default withTranslation('custom')(ServiceAvatar)
