import React from 'react'
import Link from 'next/link'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Rating from '@material-ui/lab/Rating'
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import UserAvatar from '../../Avatar/UserAvatar'


const CardPreview = ({item}) => {

  if (!item) {
    return null
  }

  const city = item.service_address?.city


  return(
    <Link href={`/userServicePreview?id=${item._id}`} >
      <StyledCardPreview>

        <div className='badge'>
          <UserAvatar user={item.user} />
        </div>

        <Grid className={`customcardpreviewbox`}>

          <Typography className={`customcardpreviewname`}>{item.user.firstname}</Typography>
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

  display: grid;
  grid-template-areas: 'badge badge badge'
                        'service service service';
  row-gap: var(--spc-2);
  width: min(calc(100% - 2rem), 300px);
  grid-template-rows: 40px 150px;
  height: 100%;
  justify-items: center;
  cursor: pointer;

  .badge {
    grid-area: badge;
    text-align: center;
  }

  .badge + div {
    padding: 40px 1rem 1rem 1rem;
    grid-area: service;
    overflow: clip;
    text-overflow: ellipsis;
    border-radius: 1rem;
    border: 1px solid #111;
  }

  p {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

`

export default withTranslation('custom', {withRef: true})(CardPreview)
