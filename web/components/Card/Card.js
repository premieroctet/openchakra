import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import {withTranslation} from 'react-i18next'
import Rating from '@material-ui/lab/Rating'
import Chip from '@material-ui/core/Chip'
import {getDataModel} from '../../config/config'
import UserAvatar from '../Avatar/UserAvatar'

const Wrapper = ({link, children}) => (
  link ?
    <Link href={link}>{children}</Link>
    : <div>{children}</div>
)


const Card = ({
  link,
  user,
  name,
  picture,
  title,
  description,
  city,
  rating,
  isCpf,
  isPro,
  tags,
  Cta,
}) => {

  if (!title) {
    return null
  }

  return(
    <Wrapper link={link}>
      <StyledCard theme={getDataModel()}>

        <div className='card_avatar customcardpreviewavatar'>
          {user!==undefined && <UserAvatar user={user} />}
        </div>

        <div className={`card_content customcardpreviewbox`}>
          
          <div className='card_content-image'>
            {picture && <img src={picture} alt="" />}
            <div className='card_content-tags'>
              {isCpf && <Chip label={'CPF'} className={'customcardchipcpf'} />}
              {isPro && <Chip label={'PRO'} className={'customcardchippro'} />}
              {tags && tags.map(tag => <Chip label={tag} className={'customcardchip'} />)}
            </div>
          </div>

          <div className='card_content-text'>
          
            {name !== undefined && <p className={`customcardpreviewname`}>{name}</p>}
            <p className={`customcardpreviewlabel`}>{title}</p>
            {description !==undefined && <p>{description}</p>}
            {city !==undefined && <p className={'customcardpreviewplace'} >{city}</p>}

            {Cta && <Cta />}

            {rating !==undefined && <div className={'card_content_rating customcardpreviewrating'}>
              <Rating
                name="simple-controlled"
                value={rating}
                max={1}
                readOnly
              />
              <p>({rating})</p>
            </div>
            }
          </div>
        </div>
      </StyledCard>
    </Wrapper>
  )
}

Card.propTypes = {
  link: PropTypes.string,
  user: PropTypes.object,
  name: PropTypes.string,
  picture: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  city: PropTypes.string,
  rating: PropTypes.number,
  tags: PropTypes.array,
  isCpf: PropTypes.bool,
  isPro: PropTypes.bool,
  Cta: PropTypes.component,
}


const StyledCard = styled.a`

  --card-padding: var(--spc-4);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px auto;
  grid-template-areas:  'card_avatar'
                        'card_content';
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
    grid-area: card_content;
    display: grid;
    grid-template-areas: 'card_content-image' 'card_content-text';
    grid-template-rows: minmax(0,1fr) minmax(0,1fr);
    overflow: hidden;
    border-radius: 1rem;
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
      margin: 0;
      margin-bottom: var(--spc-1);
    }

    &> * {
      transition: var(--delayIn) ease-in;
    }
  }

  .card_content-tags {
    position: absolute;
    top: var(--spc-3);
    right: var(--spc-3);
    z-index: 1;
    display: flex;
    column-gap: var(--spc-1);

    &> * {
      background-color: var(--secondary-bgcolor);
      color: var(--secondary-color);
    }
  }

  .card_content-image {
    grid-area: card_content-image;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .card_content-image::after {
    transition: background-color var(--delayIn) ease-in-out;
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    inset: 0;
    background-color: var(--secondary-color);
    filter: opacity(0.4);
    position: absolute;
  }

  .card_content-text {
    grid-area: card_content-text;
    align-self: flex-start;
    color: var(--black);
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .card_content_rating {
    display: flex;
    align-items: last baseline;
    justify-content: end;
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

export default withTranslation(null, {withRef: true})(Card)
