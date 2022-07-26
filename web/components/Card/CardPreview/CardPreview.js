import React from 'react'
import Link from 'next/link'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Rating from '@material-ui/lab/Rating'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import {bookingUrl} from '../../../config/config'
import UserAvatar from '../../Avatar/UserAvatar'
import {getDataModel, isMonoProvider} from '../../../config/config'


const CardPreview = ({item}) => {

  if (!item) {
    return null
  }

  const city = item.service_address?.city || ''
  const image = item?.service?.picture


  return(
    <Link href={bookingUrl(item._id)} >
      <StyledCardPreview theme={getDataModel()}>

        <div className='customcardpreviewavatar'>
          <UserAvatar user={item.user} />
        </div>

        <Grid className={`customcardpreviewbox`}>

          {image && <img src={image} alt="" />}

          {isMonoProvider && <Typography className={`customcardpreviewname`}>{item.user.firstname}</Typography>}
          <Typography className={`customcardpreviewlabel`}>{item.service.label}</Typography>
          {city && <Typography className={'customcardpreviewplace'} >{city}</Typography>}

          <Grid className={'customcardpreviewrating'}>
            <Box component="fieldset" mb={item.user.score} borderColor="transparent" >
              <Rating
                name="simple-controlled"
                value={item.user.score}
                max={1}
                readOnly
              />
              <Typography>({item.user.score})</Typography>
            </Box>
          </Grid>
        </Grid>
      </StyledCardPreview>
    </Link>
  )
}

const StyledCardPreview = styled.a`

  position: relative;
  display: flex;
  flex-direction: column;

  row-gap: var(--spc-4);
  height: 100%;
  /* justify-content: center; */
  align-items: center;
  cursor: pointer;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  & > div {
    margin-top: 40px;
    min-height: 300px;
  }

  .customcardpreviewavatar {
    top: -40px;
    position: absolute;
  }

  .customcardpreviewavatar + div {
    padding: 50px 1rem 1rem 1rem;
    border-radius: 1rem;
    border: 1px solid #111;
  }

  ${props => {
  if (props.theme === 'aftral') {
    return `

      p {
        font-weight: bold;
      }

      img {
        margin-bottom: var(--spc-4);
      }
  
      `
  }

  return `
    
  `
}
 }

`

export default withTranslation('custom', {withRef: true})(CardPreview)
