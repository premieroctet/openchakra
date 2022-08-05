import React from 'react'
import Link from 'next/link'
import {withTranslation} from 'react-i18next'
import Grid from '@material-ui/core/Grid'
import Rating from '@material-ui/lab/Rating'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import {bookingUrl} from '../../../config/config'
import UserAvatar from '../../Avatar/UserAvatar'
import {getDataModel, isMonoProvider} from '../../../config/config'
import AllInclusiveCardPreview from './AllInclusiveCardPreview'


const CardPreview = ({item}) => {

  if (!item) {
    return null
  }

  const city = item.service_address?.city || ''
  const image = item?.service?.picture

  // TODO rustine all-E
  if (getDataModel()=='all-inclusive') {
    return (
      <AllInclusiveCardPreview item={item}/>
    )
  }

  return(
    <Link href={bookingUrl(item._id)} >
      <StyledCardPreview theme={getDataModel()}>

        <div className='card_avatar customcardpreviewavatar'>
          <UserAvatar user={item.user} />
        </div>

        <div className={`card_content customcardpreviewbox`}>
          
          {image && <div className='card_content-image'><img src={image} alt="" /></div>}

          <div className='card_content-text'>
          
            {!isMonoProvider() && <Typography className={`customcardpreviewname`}>{item.user.firstname}</Typography>}
            <Typography className={`customcardpreviewlabel`}>{item.service.label}</Typography>
            {city && <Typography className={'customcardpreviewplace'} >{city}</Typography>}

            <Grid className={'customcardpreviewrating'}>
              <Rating
                name="simple-controlled"
                value={item.user.score}
                max={1}
                readOnly
              />
              <Typography>({item.user.score})</Typography>
            </Grid>
          </div>
        </div>
      </StyledCardPreview>
    </Link>
  )
}

const StyledCardPreview = styled.a`

  --card-padding: var(--spc-4);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas:  'card_avatar'
                        'card_content';
  height: 100%;
  min-width: 250px;
  aspect-ratio: 4 / 5;
  cursor: pointer;
  transition: transform var(--delayIn) ease-out;

  &:hover {

    .card_content-image::after {
      background-color: transparent;
    }
  }

  .card_avatar {
    justify-self: center;
    grid-area: card_avatar;
    z-index: 2;
  }
  
  .card_avatar + * {
    margin-top: 40px;
  }

  
  .card_content {
    display: grid;
    grid-template-rows: 3fr 2fr;
    overflow: hidden;
    border-radius: 1rem;
    grid-area: card_content;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
    grid-row: 1 / -1;
    grid-column: 1 / -1;
    margin-bottom: var(--spc-4);

    &> :is(p, div, ):not(.card_content-image) {
      padding: var(--card-padding);
    }

    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .card_content > * {
    transition: var(--delayIn) ease-in;
  }

  .card_content-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .card_content-image {
    position: relative;
  }

  .card_content-image::after {
    transition: background-color var(--delayIn) ease-in-out;
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    inset: 0;
    background-color: var(--secondary-color);
    filter: opacity(0.4) ;
    position: absolute;
  }

  .card_content-text {
    align-self: flex-start;
    color: var(--black);
    z-index: 1;
    height: 100%;
  }


  ${props => {
  if (props.theme === 'aftral') {
    return `

      p {
        font-weight: bold;
      }

      `
  }

  return `

  `
}
 }

`

export default withTranslation(null, {withRef: true})(CardPreview)
