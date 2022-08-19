import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import {withTranslation} from 'react-i18next'
import Rating from '@material-ui/lab/Rating'
import Chip from '@material-ui/core/Chip'
import RoomIcon from '@material-ui/icons/Room'
import UserAvatar from '../Avatar/UserAvatar'
import {getDataModel} from '../../config/config'
import isEmpty from '../../server/validation/is-empty'
import ListIconsSkills from '../ListIconsSkills/ListIconsSkills'


const Card = ({
  link,
  pictureratio,
  user,
  tagname,
  name,
  picture,
  title,
  description,
  distance,
  city,
  rating,
  reviews,
  isCpf,
  isPro,
  tags,
  Cta,
  editAction,
  deleteAction,
  ...props
}) => {

  
  const isDescription = !isEmpty(description) && !Array.isArray(description) && description

  if (!title) {
    return null
  }

  return(
    <AdaptiveWrapper link={link} {...props}>
      <StyledCard theme={getDataModel()} pictureratio={pictureratio} picture={picture}>

        {user!==undefined &&
        <div className='card_avatar customcardpreviewavatar'>
          <UserAvatar user={user} />
        </div>
        }

        <div className={`card_content customcardpreviewbox`}>
          
          <div className='card_content-imageactions'>
            {picture && <div className='card_content-image'><img src={picture} alt="" /></div>}

            <div className='card_content-imageoverlay'>
              
              <div className='card_content-actions'>
                {editAction && <Edit editAction={editAction} />}
                {deleteAction && <DeleteButton deleteAction={deleteAction} />}
              </div>
              
              <div className='card_content-tags'>
                {isCpf && <Chip label={'CPF'} className={'customcardchipcpf'} />}
                {isPro && <Chip label={'Pro'} className={'customcardchippro'} />}
                {tags && tags.map(tag => <Chip label={tag} className={'customcardchip'} />)}
              </div>

              <div className='card_content-saymyname'>
                {tagname && <Chip label={tagname.firstname} avatar={<ListIconsSkills data={tagname.data} />} className={`customcardchipname`} />}
              </div>

            </div>
          </div>

          <div className='card_content-text'>
            {name !== undefined && <p className={`customcardpreviewname`}>{name}</p>}
            <h2 className={`card_content-title customcardpreviewlabel`}>{title}</h2>

            <Place city={city} distance={distance} />
            {isDescription && <p className='card_content-description'>{description}</p>}

            <Opinions rating={rating} reviews={reviews} />

            {Cta && <Cta />}

          </div>
        </div>
      </StyledCard>
    </AdaptiveWrapper>
  )
}

Card.propTypes = {
  link: PropTypes.string,
  pictureratio: PropTypes.string,
  user: PropTypes.object,
  name: PropTypes.string,
  picture: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  distance: PropTypes.number,
  city: PropTypes.string,
  rating: PropTypes.number,
  reviews: PropTypes.number,
  tags: PropTypes.array,
  isCpf: PropTypes.bool,
  isPro: PropTypes.bool,
  Cta: PropTypes.component,
  editAction: PropTypes.function,
  deleteAction: PropTypes.function,
}

const AdaptiveWrapper = ({link, children}) => (
  link ?
    <Link href={link} passHref><LinkCard>{children}</LinkCard></Link>
    : <div>{children}</div>
)

const LinkCard = styled.a`

  width: 100%; /* Needed even if it's a grid element. Weird */
  height: 100%;  

  &:hover, &:focus {
    .card_content-image::after {
      background-color: transparent;
    }
  }
  text-decoration: none;
`

const Edit = ({editAction}) => (
  <button aria-label='éditer' onClick={e => {
    e.preventDefault()
    editAction()
  }}>
    <EditIcon />
  </button>
)

const DeleteButton = ({deleteAction}) => (
  <button aria-label="supprimer" onClick={e => {
    e.preventDefault()
    deleteAction()
  }}>
    <DeleteForeverIcon />
  </button>
)


const Place = ({city, distance}) => {

  return city ? <div className='card_content-place'>
    <RoomIcon/>
    <p>
      { distance &&
      `À ${distance} km - `
      }
      <span className='customcardpreviewplace'>{city}</span>
    </p>
  </div> : null

}


const Opinions = ({rating, reviews}) => {

  return rating ? <div className='card_content-rating customcardpreviewrating'>
    <Rating
      name="simple-controlled"
      value={rating}
      max={1}
      readOnly
    />
    <p>{rating} {reviews ? ({reviews}) : null}</p>
  </div> : null

}


const StyledCard = styled.div`

  --card-padding: var(--spc-4);

  display: grid;
  width: 100%;
  height: 100%;  
  grid-template-columns: 1fr;
  grid-template-rows: 80px auto;
  grid-template-areas:  'card_avatar'
                        'card_content';
  cursor: pointer;
  transition: transform var(--delayIn) ease-out;

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
    grid-template-areas: 'card_content-imageactions' 'card_content-text';
    grid-template-rows: ${props => {
  if (!props.picture) {
    return 'auto minmax(0,1fr)'
  }
  return 'minmax(0,1fr) minmax(0,1fr)'
}} ;
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
    grid-row: 1 / -1;
    grid-column: 1 / -1;

    &> :is(p, div, ):not(.card_content-imageactions) {
      padding: var(--card-padding);
    }

    p {
      font-size: var(--text-base);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &> * {
      transition: var(--delayIn) ease-in;
    }
  }

  .card_content-imageoverlay {
    ${props => {
  if (!props.picture) {
    return `
        padding: var(--spc-3);
      `
  }
  return `
        position: absolute;
        inset: 0;
        z-index: 1;`
}}
    
    display: grid;
    grid-template-areas: 'actionsarea tagsarea' 'namearea .';
    grid-template-columns: auto auto;
    grid-template-rows: repeat(2, 1fr);
    column-gap: var(--spc-2);
    justify-content: space-between;
  }

  .card_content-actions, .card_content-tags {
    display: flex;
    column-gap: var(--spc-1);
    row-gap: var(--spc-2);
    margin: var(--spc-2);
  }

  .card_content-actions {
    grid-area: actionsarea;
    row-gap: var(--spc-2);
    flex-direction: column;

    a, button {
      border: 0;
      cursor: pointer;
      padding: var(--spc-1);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0,0,0,0.7);
      color: var(--white);
      border-radius: var(--rounded-full);
    }
    
  }

  .card_content-tags {
    grid-area: tagsarea;
    flex-wrap: wrap;
    justify-content: end;
    
    &> * {
      background-color: var(--primary-color);
      font-weight: bold;
      color: var(--white);
      width: min-content;
    }
  }
  
  .card_content-saymyname {
    grid-area: namearea;
    display: flex;
    align-items: end;

    &> * {
      flex-direction: row-reverse;
      margin-block-end: -5px;
      margin-inline-start: -5px;
      background-color: var(--secondary-bgcolor);
    }
  }

  .card_content-imageactions {
    grid-area: card_content-imageactions;
    position: relative;
  }

  .card_content-image {
    height: 100%;

    img {
      aspect-ratio: ${props => (props?.pictureratio ? props.pictureratio : '16 / 10')} ;
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
    background-color: #11111144;
    position: absolute;
  }

  .card_content-text {
    grid-area: card_content-text;
    align-self: flex-start;
    color: var(--black);
    z-index: 1;
    min-height: 100%;
    display: grid;
    grid-template-rows: minmax(2rem, max-content);
    row-gap: var(--spc-3);
    
    h2, div, p {
      margin: 0;
    } 
    

    button {
      color: var(--white);
      background-color: var(--secondary-color);
      padding-inline: var(--spc-8);
      justify-self: end;
      align-self: end;
      width: min-content;
      height: min-content;
      margin-block-start: var(--spc-2);
      margin-inline-end: var(--spc-1);
      border-radius: var(--rounded-3xl);
      text-transform: unset;
    }
  }

  .card_content-title {
    font-size: var(--text-base);
    color: var(--black);
  }

  .card_content-place {
    font-size: var(--text-base);
    display: flex;
    column-gap: var(--spc-1);
    align-items: center;
    
    p {
      -webkit-line-clamp: 1
    }
    
  }
  
  .card_content-description {
    flex: 2;
    color: rgb(128, 128, 128);
    min-height: 4rem;
  }

  .card_content-rating {
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

      .card_content-saymyname {
        display: none;
      }

      `
  }

}
 }

`

export default withTranslation(null, {withRef: true})(Card)
