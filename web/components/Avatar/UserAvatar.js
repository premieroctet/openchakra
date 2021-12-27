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

function UserAvatar(props) {
  const classes = useStyles()
  const {user, animateStartup, fireRefresh} = props
  const [owner, setOwner] = useState(false)
  const [isAbout, setAbout] = useState(false)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const profileUrl = ['services', 'about', 'reviews', 'calendar', 'statistics', 'myProfile']
    const currentUrl = Router.pathname

    if (getLoggedUserId() === user._id) {
      setOwner(true)
    }
    else{
      setOwner(false)
    }

    if(profileUrl.includes(currentUrl.substring(currentUrl.lastIndexOf('/') + 1))) {
      setAbout(true)
    }
    else{
      setAbout(false)
    }
  }, [])

  const selectPicture = e => {
    e.preventDefault()
    if (isEditableUser(user)) {
      document.getElementById('input-button-file').click()
    }
  }

  function onMouseEnter() {
    setAnimated(true)
  }

  function onMouseLeave() {
    setAnimated(false)
  }

  avatarWithPics = (user, classes) => {
    const{isAbout, animated} = this.state
    const {animateStartup} = this.props
    console.log(`Animated:${animated}`)
    if (!user) {
      return null
    }
    let url
    if (animated || !user.picture.toLowerCase().endsWith('.gif') || animateStartup) {
      url=user.picture.match(/^https?:\/\//) ? user.picture : `/${ user.picture}`
    }
    else {
      const filename = user.picture.split('/').slice(-1).pop()
      url=`/myAlfred/api/users/still_profile/${filename}`
    }

    return (
      <Avatar
        alt="photo de profil"
        src={url}
        className={isAbout ? classes.avatarLetterProfil : classes.avatarLetter}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    )
  }

  function avatarWithoutPics(user, classes) {

    return (
      <Avatar alt="photo de profil" className={isAbout ? classes.avatarLetterProfil : classes.avatarLetter}>
        <p>{user.avatar_letters}</p>
      </Avatar>
    )
  }

  function onChange(event) {
    const newPicture = event.target.files[0]
    const formData = new FormData()
    formData.append('myImage', newPicture)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    axios.post('/myAlfred/api/users/profile/picture', formData, config)
      .then(() => {
        fireRefresh()
      }).catch(err => {
        console.error(err)
      })
  }

  return (
    <Grid style={{width: '100%', height: '100%'}}>
      <Grid style={{
        height: '100%',
        width: '100%',
      }}>
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          classes={{root: classes.badge}}
          badgeContent={ owner && <Grid>
            <input
              accept="image/*"
              className={classes.input}
              id="input-button-file"
              type="file"
              onChange={onChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton onClick={selectPicture} className={classes.buttonCamera} aria-label="upload picture" component="span">
                <PhotoCameraIcon/>
              </IconButton>
            </label>
          </Grid>}
        >
          {
            user.picture ? avatarWithPics(user, classes) : avatarWithoutPics(user, classes)
          }
        </Badge>
      </Grid>
    </Grid>
  )
}

export default withTranslation('custom')(UserAvatar)
